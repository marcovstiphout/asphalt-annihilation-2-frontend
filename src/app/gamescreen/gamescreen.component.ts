import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import {Square} from '../gamescreen/models/Square';
import {Road} from '../gamescreen/models/Road';
import {Vehicle} from '../gamescreen/models/Vehicle'

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
    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick()
    },200);
  }
  
    tick() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.squares.forEach((square: Square) => {
        square.moveRight();
      });
      const road = new Road(this.ctx);
      road.draw();

      const vehicle = new Vehicle(this.ctx);
      vehicle.draw();
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

}
