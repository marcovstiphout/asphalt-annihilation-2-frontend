import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import {Square} from '../gamescreen/models/Square';
import {Road} from '../gamescreen/models/Road';
import {Vehicle} from '../gamescreen/models/Vehicle'
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {
  constructor(private ngZone: NgZone) { }

  @ViewChild('canvas',{static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  public vehicle: Vehicle;

  requestId: number;
  interval: number;
  squares: Square[] = [];


  ngOnInit(): void {
    const res = this.canvas.nativeElement.getContext('2d');
    if (!res || !(res instanceof CanvasRenderingContext2D))
    {
      throw new Error ('Failed to get 2D Context');
    }
    this.ctx = res;
    this.ctx.fillStyle = 'red';

    this.vehicle = new Vehicle(this.ctx);

    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick()
    },50);
  }
  
    tick() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.squares.forEach((square: Square) => {
        square.moveRight();
      });
      const road = new Road(this.ctx);
      road.draw();
    
      this.vehicle.draw();
      this.requestId = requestAnimationFrame(() => this.tick);
    }

    play() {
      const square = new Square(this.ctx);
      this.squares = this.squares.concat(square);
    }

    ngOnDestroy() {
      clearInterval(this.interval);
      cancelAnimationFrame(this.requestId);
    }
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) { 
      switch(event.key)
      {
        case "w": {this.vehicle.moveForward(); break;}
        case "a": {this.vehicle.moveLeft(); break;}
        case "s": {this.vehicle.break(); break;}
        case "d": {this.vehicle.moveRight(); break;}
      }
    }

}
