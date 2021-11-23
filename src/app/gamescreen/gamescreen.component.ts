import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
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
  public road: Road;

  requestId: number;
  interval: number;


  ngOnInit(): void {
    const res = this.canvas.nativeElement.getContext('2d');
    if (!res || !(res instanceof CanvasRenderingContext2D))
    {
      throw new Error ('Failed to get 2D Context');
    }
    this.ctx = res;
    this.ctx.fillStyle = 'red';

    this.vehicle = new Vehicle(this.ctx);
    this.road = new Road(this.ctx);

    this.ngZone.runOutsideAngular(() => this.animate());
    this.animate();
  }

  //Handling the game's animations
    animate() {
      //Optimize this later by only clearing the space that is updating
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      
      //this.environment.draw();
      this.road.draw();
      this.vehicle.draw();
      requestAnimationFrame(()=> this.animate());
      //var yeet = setInterval(() => {this.animate();},1000);
    }
    //Ensures any running timers and animations are cancelled when the game is exited
    ngOnDestroy() {
      cancelAnimationFrame(this.requestId);
    }

    //Listen for Keypress Events in order to steer the vehicle
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) { 
      switch(event.key)
      {
        case "w":
        case "ArrowUp": {this.vehicle.moveForward(); break;}
        case "a": 
        case "ArrowLeft": {this.vehicle.moveLeft(); break;}
        case "s": 
        case "ArrowDown": {this.vehicle.break(); break;}
        case "d": 
        case "ArrowRight": {this.vehicle.moveRight(); break;}
      }
    }

}
