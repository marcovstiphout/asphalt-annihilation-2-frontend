export class Road {
    private color = 'red';

    private blockHeight:number;

    private white_road_image = new Image();
    private red_road_image = new Image();
    private isRed = true;
  
    constructor(private ctx: CanvasRenderingContext2D) 
    { 
        this.white_road_image.src = '../../assets/road_w.png';
        this.red_road_image.src = '../../assets/road_r.png';
        this.blockHeight = 30;
    }
  
    public draw() {
      this.ctx.fillStyle = this.color;

      var startWidth = (this.ctx.canvas.width/6)*3;//Initial road width
      var currentWidth = startWidth;//Current width of the road pieces

      var x = (this.ctx.canvas.width/2) - (currentWidth/2);//Start position on the x-axis
      var y = this.ctx.canvas.height - 1; //Start position on the y-axis

      for (var i = 0; i < (innerHeight/2); i++)
      {
         if(this.isRed)
         {
            this.ctx.drawImage(this.red_road_image, x + i/2,y - i, currentWidth - i,1);
            if(i % this.blockHeight === 0)
            {
                this.isRed = false;
            }    
         }
        else{
            this.ctx.drawImage(this.white_road_image, x + i/2,y - i, currentWidth - i,1);
            if(i % this.blockHeight === 0)
            {
                this.isRed = true;
            }  
        }
      }
    }
  }