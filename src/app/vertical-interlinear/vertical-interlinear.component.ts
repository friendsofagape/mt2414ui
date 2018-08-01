import { Component, OnInit, Input } from '@angular/core';
import {Http}  from '@angular/http';

@Component({
  selector: 'vertical-interlinear',
  templateUrl: './vertical-interlinear.component.html',
  styleUrls: ['./vertical-interlinear.component.css']
})
export class VerticalInterlinearComponent {

  private hindiLabels;
  private greekLabels;
  private englishword;
  private canvasLength;
  @Input() bilinearData: any;

  constructor(private _http:Http) { }


  ngOnChanges() { 
       //console.log(this.bilinearData)
       this.hindiLabels = this.bilinearData.targettext;
       this.greekLabels = this.bilinearData.sourcetext;
       this.englishword = this.bilinearData.englishword;

       this.hindiLabels.length > this.greekLabels.length ? this.canvasLength = this.hindiLabels.length * 23 : this.canvasLength = this.greekLabels.length * 23;
      
     
     var c:any = document.getElementById("myCanvas");
     //console.log(this.canvasLength)
     c.height = this.canvasLength;
     c.width = 120;
     var ctx = c.getContext("2d");
 
     for(var i=0;i < this.bilinearData.positionalpairs.length; i++){
          
         if((this.bilinearData.positionalpairs[i].split('-')[0] !== '255') && (this.bilinearData.positionalpairs[i].split('-')[0] !== '0') && (this.bilinearData.positionalpairs[i].split('-')[1] !== '255') && (this.bilinearData.positionalpairs[i].split('-')[1] !== '0') ){
          var xMoveAxis = 0;
          var yMoveAxis = ((this.bilinearData.positionalpairs[i].split('-')[0] - 1)  * 23) + 10;

          var xLineAxis = 120;
          var yLineAxis = ((this.bilinearData.positionalpairs[i].split('-')[1] - 1)  * 23) + 10;

          ctx.beginPath();
          //console.log("(" +xMoveAxis, yMoveAxis + ")" + "     "+ "(" +xLineAxis, yLineAxis + ")")
          ctx.moveTo(xMoveAxis, yMoveAxis);
          ctx.lineTo(xLineAxis, yLineAxis);
          ctx.lineWidth = 3;

          if(this.bilinearData.colorcode[i] == '0'){
            ctx.strokeStyle = "#007C80"
        }
        else if(this.bilinearData.colorcode[i] == '1'){
          ctx.strokeStyle =  '#023659'
        }
        else if(this.bilinearData.colorcode[i] == '2')
        {
          ctx.strokeStyle =  '#4695c9'
        }
          

          ctx.stroke();
        }
    }
}

}
