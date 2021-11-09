export class Vehicle {

    //Visual Data
    private carSprites: { [name: string]: HTMLImageElement } = {};

    //Location Data
    private xAxisLocation = 0;
    private yAxisLocation = 0;
    private dist = 0;

    constructor(private ctx: CanvasRenderingContext2D) 
    { 
        this.carSprites["left"] = new Image();
        this.carSprites["straight"] = new Image();
        this.carSprites["straight"].src = "../../assets/karambamanCar.png"
        this.carSprites["right"] = new Image();

        this.xAxisLocation = (this.ctx.canvas.width/2) - 150;
        this.yAxisLocation = this.ctx.canvas.height - 250;

    }

    public draw() {
        this.ctx.drawImage(this.carSprites["straight"], this.xAxisLocation,this.yAxisLocation,300,250);
    }
    moveRight() {
        this.xAxisLocation += 5;
        console.log(this.xAxisLocation);
        //this.draw();
      }
    moveLeft() {
        this.xAxisLocation -= 5;
        //this.draw();
      }
    moveForward() {
       // this.yAxisLocation -= 5;
        //this.draw();
      }
    break() {
        //this.yAxisLocation += 5;
       // this.draw();
      }
}