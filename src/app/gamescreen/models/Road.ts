export class Road {
    private color = 'bright';

    private blockHeight:number;

    private dull_road_image = new Image();
    private dull_road_striped_image = new Image();
    private bright_road_image = new Image();
    private bright_road_striped_image = new Image();

    private isBright = true;
    private isStriped = true;

    constructor(private ctx: CanvasRenderingContext2D) 
    { 
        this.dull_road_image.src = '../../assets/road_dull.jpg';
        this.dull_road_striped_image.src = '../../assets/road_dull_striped.jpg';

        this.bright_road_image.src = '../../assets/road_bright.jpg';
        this.bright_road_striped_image.src = '../../assets/road_bright_striped.jpg';

        this.blockHeight = Math.floor((this.ctx.canvas.height / 1.6) / 3);
    }
    public draw()
    {
        //Determine Starting Dimension
        var initialWidth = this.ctx.canvas.width * 0.75; //Makes the road width 75% of the Screen's Width. <== Does not get updated
        var currentWidth = initialWidth; //Tracks the current width of a road piece. <== This one gets updated

        var currentBlockHeight = this.blockHeight; //Height of the current block. <== Decreases after each block, and resets next loop.

        var iterationsSinceLastSwitch = 0;
        
        var x = (this.ctx.canvas.width/2) - (currentWidth/2);//Start position on the x-axis
        var y = this.ctx.canvas.height - 1; //Start position on the y-axis

        this.ctx.beginPath();
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(0, this.ctx.canvas.height - this.blockHeight, this.ctx.canvas.width, this.blockHeight);
        //[Loop Start]
        for(var i = 0; i < (this.ctx.canvas.height / 1.6); i++) //Ensures the road draws up to about the center of the screen.
        {
            iterationsSinceLastSwitch += 1;
        //Determine whether Bright or Dull
            if(iterationsSinceLastSwitch == currentBlockHeight) 
            {
                currentBlockHeight = Math.floor(currentBlockHeight * 0.68);
                this.isBright = !this.isBright;
                iterationsSinceLastSwitch = 0;

                //Trying to render the environment 'underneath' the road
                this.ctx.beginPath();
                this.ctx.fillStyle = 'blue';
                this.ctx.fillRect(0, (y - i) - currentBlockHeight, this.ctx.canvas.width, currentBlockHeight);
                this.ctx.fillStyle = 'purple';
                this.ctx.fillRect(0, (y - i) - currentBlockHeight, this.ctx.canvas.width, 1);
            }
        //Determine whether Striped or Not
            if(iterationsSinceLastSwitch == (Math.floor(currentBlockHeight * 0.75)) || iterationsSinceLastSwitch == (Math.floor(currentBlockHeight * 0.25)))
            {
                this.isStriped = !this.isStriped;
            }
            //if(i % (currentBlockHeight/2) === 0 && i % currentBlockHeight !== 0) this.isStriped = !this.isStriped;
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
            this.ctx.drawImage(chosenImage, x + i,y - i, currentWidth - i*2,1);
        }
        //[Loop End]
    }
  }