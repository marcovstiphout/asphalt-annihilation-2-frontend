export class Vehicle {

    //Visual Data
    private carSprites: { [name: string]: HTMLImageElement } = {};
    private currentSprite: HTMLImageElement = new Image();
    //Location Data
    private xAxisLocation = 0;
    private yAxisLocation = 0;
    public dist = 0;

    public currentRoadPart = "middle";

    //Game Statistics
    public stats: { [name: string]: number} = {};

    constructor(private ctx: CanvasRenderingContext2D) 
    { 
        this.carSprites["left"] = new Image();
        this.carSprites["left"].src = "../../assets/karambamanCarTurnLeft.png"

        this.carSprites["straight"] = new Image();
        this.carSprites["straight"].src = "../../assets/karambamanCar.png"

        this.carSprites["right"] = new Image();
        this.carSprites["right"].src = "../../assets/karambamanCarTurnRight.png"

        this.xAxisLocation = (this.ctx.canvas.width/2) - 150;
        this.yAxisLocation = this.ctx.canvas.height - 250;

        this.currentSprite = this.carSprites["straight"];

        this.stats["accel"] = 2;
        this.stats["maxSpeed"] = 10;
        this.stats["currentSpeed"] = 0;
        this.stats["hp"] = 100;
    }

    public draw() {
      this.dist += this.stats["currentSpeed"];
      this.ctx.drawImage(this.currentSprite, this.xAxisLocation,this.yAxisLocation,300,250);
    }
    moveRight() {
        if(this.currentRoadPart != "right")
        {
          switch(this.currentRoadPart)
          {
            case "left":
              this.xAxisLocation += this.carSprites["straight"].width / 2;
              this.currentRoadPart = "middle";
              break; 
            
            case "middle":
              this.xAxisLocation += this.carSprites["straight"].width / 2;
              this.currentRoadPart = "right";
              break; 
            default:
              //statements; 
              break; 
          }
        }
        //this.xAxisLocation += 1 * this.stats["currentSpeed"];
        this.currentSprite = this.carSprites["right"];
      }
    moveLeft() {
      if(this.currentRoadPart != "left")
      {
        switch(this.currentRoadPart)
        {
          case "right":
            this.xAxisLocation -= this.carSprites["straight"].width / 2;
            this.currentRoadPart = "middle";
            break; 
          
          case "middle":
            this.xAxisLocation -= this.carSprites["straight"].width / 2;
            this.currentRoadPart = "left";
            break; 
          default:
            //statements; 
            break; 
        }
      }
      //  this.xAxisLocation -= 1 * this.stats["currentSpeed"];
        this.currentSprite = this.carSprites["left"];
      }
    moveForward() {
      if(this.stats["currentSpeed"] != this.stats["maxSpeed"])
      {
          this.stats["currentSpeed"] += this.stats["accel"] / 100;
      }

     // this.dist += this.stats["currentSpeed"];
      }
    break() {
      this.stats["currentSpeed"] -= 0.04;
      if(this.stats["currentSpeed"] < 0)
      {
        this.stats["currentSpeed"] = 0;
      }
      //this.dist -= 5;
      }
    naturalSlowdown()
    {
      this.stats["currentSpeed"] -= 0.01;
      if(this.stats["currentSpeed"] < 0)
      {
        this.stats["currentSpeed"] = 0;
      }
    }
    straightenCar()
    {
      this.currentSprite = this.carSprites["straight"];
    }  
}