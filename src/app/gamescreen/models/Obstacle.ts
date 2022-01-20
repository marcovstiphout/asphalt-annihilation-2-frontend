export class Obstacle {

    //Visual Data
    private sprite: HTMLImageElement  = new Image();

    //Location Data
    private xAxisLocation = 0;
    private yAxisLocation = 0;
    public dist = 0;

    public lane = "";
    private laneOffset = 0;
    

    constructor(private ctx: CanvasRenderingContext2D, private _sprite: string, private _dist: number,private _lane: string) 
    { 
        this.sprite.src = _sprite;
        this.dist = _dist;

        this.xAxisLocation = (this.ctx.canvas.width/2);
        this.yAxisLocation = this.ctx.canvas.height - this.ctx.canvas.height / 1.6;

        this.lane = _lane;
    }

    public draw(playerDistance: number) {
        var distanceFromPlayer = this.dist - playerDistance;
        var sizeScaler = 25 / (this.ctx.canvas.height / 1.6) * (this.ctx.canvas.height / 1.6 - distanceFromPlayer); //Step size

        var drawWidth = this.sprite.width / 100 * (1 + sizeScaler);
        var drawHeight = this.sprite.height / 100 * (1 + sizeScaler);

        if(this.lane == "left")
        {
           this.laneOffset -= 0.5;
        }
        if(this.lane == "right")
        {
            this.laneOffset += 0.5;
        }

        this.ctx.drawImage(this.sprite, this.xAxisLocation - (drawWidth / 2) + (this.laneOffset + (distanceFromPlayer / 100)),this.yAxisLocation + (this.ctx.canvas.height / 1.6 - distanceFromPlayer),drawWidth, drawHeight);
    }

}