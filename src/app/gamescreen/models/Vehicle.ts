export class Vehicle {

    //Visual Data
    private carSprites: { [name: string]: HTMLImageElement } = {};
    private currentSprite: HTMLImageElement = new Image();
    //Location Data
    private xAxisLocation = 0;
    private yAxisLocation = 0;
    public dist = 0;

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
    }

    public draw() {
      this.ctx.drawImage(this.currentSprite, this.xAxisLocation,this.yAxisLocation,300,250);
    }
    moveRight() {
        this.xAxisLocation += 5;
        this.currentSprite = this.carSprites["right"];
      }
    moveLeft() {
        this.xAxisLocation -= 5;
        this.currentSprite = this.carSprites["left"];
      }
    moveForward() {
      this.dist += 5;
      }
    break() {
      this.dist -= 5;
      }
}