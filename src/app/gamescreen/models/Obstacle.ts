export class Obstacle {

    //Visual Data
    private sprite: HTMLImageElement  = new Image();

    //Location Data
    private xAxisLocation = 0;
    private yAxisLocation = 0;
    public dist = 0;
    

    constructor(private ctx: CanvasRenderingContext2D, private _sprite: string, private _dist: number) 
    { 
        this.sprite.src = _sprite;
        this.dist = _dist;

        this.xAxisLocation = (this.ctx.canvas.width/2);
        this.yAxisLocation = this.ctx.canvas.height / 3 + 30;
    }

    public draw(playerDistance: number) {
        var distanceFromPlayer = this.dist - playerDistance;
        var sizeScaler = 25 / (this.ctx.canvas.height / 1.6) * (this.ctx.canvas.height / 1.6 - distanceFromPlayer); //Step size

        var drawWidth = this.sprite.width / 100 * (1 + sizeScaler);
        var drawHeight = this.sprite.height / 100 * (1 + sizeScaler);
        console.log(distanceFromPlayer + this.sprite.src);

        this.ctx.drawImage(this.sprite, this.xAxisLocation - (drawWidth / 2),this.yAxisLocation + (this.dist - distanceFromPlayer),drawWidth, drawHeight);
    }

}