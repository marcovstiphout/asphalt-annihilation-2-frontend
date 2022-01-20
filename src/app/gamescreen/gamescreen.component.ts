import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import {Road} from '../gamescreen/models/Road';
import {Vehicle} from '../gamescreen/models/Vehicle'
import { HostListener } from '@angular/core';
import { Obstacle } from './models/Obstacle';
import { TimeoutError } from 'rxjs';

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
  private objects: Obstacle[] = [];
  private keys: { [key: string]: boolean } = {};

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
    this.vehicle.stats["currentSpeed"] = 0.5;
    this.road = new Road(this.ctx);


    this.objects.push(new Obstacle(this.ctx, "../assets/rock.png",500,"right"));
    this.ngZone.runOutsideAngular(() => this.animate());
    this.animate();
    var yeet = setInterval(() => {this.vehicle.stats["currentSpeed"] += 0.5},3000);
    var skeet = setInterval(() => {this.generateRandomObject(this.vehicle.dist);},5000);
  }

  //Handling the game's animations
    animate() {
      //Ensure any changes to the player are completed
      this.handleKeyEvents();

      //Optimize this later by only clearing the space that is updating
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      
      //Text UI Things
      this.ctx.font = '48px serif';
      this.ctx.fillText("Current HP: " + this.vehicle.stats["hp"], 10, 50);
      this.ctx.fillText("Current Speed: " + this.vehicle.stats["currentSpeed"], 10, 100);

      //this.environment.draw();
      this.road.draw();

      //Draw all Obstacles that would be in the player's view
      this.objects.forEach(element => {
        if(element.dist - this.vehicle.dist > -250 && element.dist - this.vehicle.dist <= 500)
        {
          if(element.dist - this.vehicle.dist < 250 && element.lane == this.vehicle.currentRoadPart)
          {
             this.vehicle.stats["hp"] -= 10;
             const index = this.objects.indexOf(element, 0);
             this.objects.splice(index, 1);
          }
          else
          {
            element.draw(this.vehicle.dist);
          }
        }
      });

      this.vehicle.draw();
      requestAnimationFrame(()=> this.animate());
    }
    //Ensures any running timers and animations are cancelled when the game is exited
    ngOnDestroy() {
      cancelAnimationFrame(this.requestId);
    }

    //Listen for Keypress Events in order to steer the vehicle
    @HostListener('document:keydown', ['$event'])
    handleKeyDownEvent(event: KeyboardEvent)
    {
        this.keys[event.key] = true;
        console.log(this.keys);
    }
    @HostListener('document:keyup', ['$event'])
    handleKeyUpEvent(event: KeyboardEvent)
    {
        this.keys[event.key] = false;
    }

    private generateRandomObject(playerDist: number)
    {
       var directions = ["left", "middle", "right"];
       var sprite = ["manhole", "rock"]

      this.objects.push(new Obstacle(this.ctx, "../assets/" + sprite[Math.floor(Math.random() * sprite.length)] + ".png",playerDist + 1000, directions[Math.floor(Math.random() * directions.length)]));
    }

    private handleKeyEvents()
    {
      //Speed
      /*
        if(this.keys["w"] || this.keys["ArrowUp"])
        {
          this.vehicle.moveForward();
        }
        if(this.keys["s"] || this.keys["ArrowDown"])
        {
          this.vehicle.break();
        }

        if(!this.keys["s"] && !this.keys["ArrowDown"] && !this.keys["w"] && !this.keys["ArrowUp"])
        {
          this.vehicle.naturalSlowdown();
        }*/
      //Direction
        if(this.keys["a"] || this.keys["ArrowLeft"])
        {
          this.vehicle.moveLeft();
          this.keys["a"] = false;
          this.keys["ArrowLeft"] = false;
        }
        if(this.keys["d"] || this.keys["ArrowRight"])
        {
          this.vehicle.moveRight();
          this.keys["d"] = false;
          this.keys["ArrowRight"] = false;
        }
        if(!this.keys["a"] && !this.keys["ArrowLeft"] && !this.keys["d"] && !this.keys["ArrowRight"] && this.vehicle.stats["currentSpeed"] != 0)
        {
          this.vehicle.straightenCar();
        }
    }
}
