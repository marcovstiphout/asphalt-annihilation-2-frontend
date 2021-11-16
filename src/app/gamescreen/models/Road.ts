export class Road {
    private color = 'bright';

    private blockHeight:number;

    private dull_road_image = new Image();
    private dull_road_striped_image = new Image();
    private bright_road_image = new Image();
    private bright_road_striped_image = new Image();

    private isBright = true;
    private isStriped = false;

    constructor(private ctx: CanvasRenderingContext2D) 
    { 
        this.dull_road_image.src = '../../assets/road_dull.jpg';
        this.dull_road_striped_image.src = '../../assets/road_dull_striped.jpg';

        this.bright_road_image.src = '../../assets/road_bright.jpg';
        this.bright_road_striped_image.src = '../../assets/road_bright_striped.jpg';

        this.blockHeight = 150;
    }
    public draw()
    {
        //Determine Starting Dimension
        var initialWidth = (this.ctx.canvas.width / 4) * 3; //Makes the road width 75% of the Screen's Width. <== Does not get updated
        var currentWidth = initialWidth; //Tracks the current width of a road piece. <== This one gets updated

        var currentBlockHeight = this.blockHeight; //Height of the current block. <== Decreases after each block, and resets next loop.

        
      var x = (this.ctx.canvas.width/2) - (currentWidth/2);//Start position on the x-axis
      var y = this.ctx.canvas.height - 1; //Start position on the y-axis
        //[Loop Start]
        for(var i = 0; i < (innerHeight/2); i++) //Ensures the road draws up to about the center of the screen.
        {
        //Determine whether Bright or Dull
            if(i % currentBlockHeight === 0) 
            {
                currentBlockHeight -= 10;
                this.isBright = !this.isBright;
            }
        //Determine whether Striped or Not
            if(i % (currentBlockHeight/2) === 0 && i % currentBlockHeight !== 0) this.isStriped = !this.isStriped;
        //Draw
            var chosenImage:HTMLImageElement;
            switch(this.isBright)
            {
                case true:
                    if(this.isStriped) chosenImage = this.bright_road_striped_image
                    else chosenImage = this.bright_road_image
                    break;
                case false:
                    if(this.isStriped) chosenImage = this.dull_road_striped_image
                    else chosenImage = this.dull_road_image
                    break;
            }
            this.ctx.drawImage(chosenImage, x + i/2,y - i, currentWidth - i,1);
        }
        //[Loop End]
    }
  }