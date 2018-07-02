import { Component, ElementRef, NgZone, OnDestroy, OnInit,Input,  OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { AlignerService } from '../aligner.service';
import { promise } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import {GlobalUrl} from '../globalUrl';
import { getHostElement } from '@angular/core/src/render3';

@Component({
  selector: 'app-d3-matrix',
  templateUrl: './d3-matrix.component.html',
  styleUrls: ['./d3-matrix.component.css']
})
export class D3MatrixComponent implements OnInit,OnChanges {

  private d3: D3;
  private serviceResult:any;
  private positionalPairOfApi:any;
  private rawPos:any;
  private indPair = new Array();
  private saveButtonFlag:boolean = true;
  private lexiconData:string;
  private greekPopUp:string[];
  @Input() BCV:any;

  constructor(private ApiUrl:GlobalUrl, private toastr: ToastrService,element: ElementRef, private ngZone: NgZone, d3Service: D3Service,private service: AlignerService,private _http:Http) {
       this.d3 = d3Service.getD3();
       this.toastr.toastrConfig.positionClass = "toast-top-center"
       this.toastr.toastrConfig.closeButton = true;
       this.toastr.toastrConfig.progressBar =true;
       
  }     


  gridData(d:any,rawPoss:any){
    var xpos =100;
    var ypos =100;
    var width = 30;
    var height= 30;
    var filled;

    var rawpossCount = rawPoss.length;
    for(let index = 0; index < rawpossCount; index ++)
    {
        let rowPossseparatedPair =rawPoss[index].split('-');
          if(rowPossseparatedPair.length === 2)
          {

              if(Number(rowPossseparatedPair[0]) === 255)
              {
                rowPossseparatedPair[0] = 0;
              }

              if(Number(rowPossseparatedPair[1]) === 255)
              {
                rowPossseparatedPair[1] = 0;
              }
          }
          rawPoss[index] = rowPossseparatedPair[0] + "-" + rowPossseparatedPair[1];
    }
    
    this.positionalPairOfApi = d.positionalpairs;
    var positionalPairCount = d.positionalpairs.length;
    let positionalPairOfApiDemo = d.positionalpairs;
    for(let index = 0; index < positionalPairCount; index ++)
    {
        let separatedPair =positionalPairOfApiDemo[index].split('-');
          if(separatedPair.length === 2)
          {

              if(Number(separatedPair[0]) === 255)
              {
                separatedPair[0] = 0;
              }

              if(Number(separatedPair[1]) === 255)
              {
                separatedPair[1] = 0;
              }
          }
          positionalPairOfApiDemo[index] = separatedPair[0] + "-" + separatedPair[1];
    }

    d.greek.unshift('NULL');
    let greekHorizontalWords = d.greek;

    d.hinditext.unshift('NULL');
    let hindiVerticalWords  = d.hinditext;    

    var data = new Array();
    var rowcount = hindiVerticalWords.length;
    var columncount = greekHorizontalWords.length;
    for(var row =0;row < rowcount; row++)
        {
        data.push(new Array());
        for(var column=0;column < columncount;column++)
            {
            data[row].push({
                x:xpos,
                y:ypos,
                width:width,
                height:height,
                filled:filled,
                positionalPair: row + "-" + column ,// column + "-" + row ,
                positionalPairOfApi : this.positionalPairOfApi,
                greekHorizontalWords: greekHorizontalWords,
                hindiVerticalWords: hindiVerticalWords,
                greekIndexWise: greekHorizontalWords[column] + column + 'column',
                hindiIndexWise: hindiVerticalWords[row] + row + 'row',
                rawPosss:rawPoss,
                saveButtonFlag:this.saveButtonFlag
            })
            xpos += width;

            }
        xpos = 100;
        ypos += height;

        }

  return data;
}

saveOnClick(){

                  var x:any = this.BCV;
                  var y:any = this.positionalPairOfApi;

                  var z:number = y.length;

                 for(let index = 0; index < z; index ++)
                 {
                     let separatedPair =y[index].split('-');
                       if(separatedPair.length === 2)
                       {
             
                           if(Number(separatedPair[0]) === 0)
                           {
                             separatedPair[0] = 255;
                           }
             
                           if(Number(separatedPair[1]) === 0)
                           {
                             separatedPair[1] = 255;
                           }
                       }
                       y[index] = separatedPair[0] + "-" + separatedPair[1];
                 }
                var data = {"bcv":x,"positional_pairs":y};
          
                   this._http.post(this.ApiUrl.getnUpdateBCV,data)
                 .subscribe(data=> {  
                     let response:any = data;
                     //console.log(response._body);
                    if(response._body === 'Saved'){
                        this.toastr.success('Updation has been done successfully.');
                    }
                 },(error:Response) =>{
                    if(error.status === 400){
                      this.toastr.warning("Bad Request Error.")
                    }
                    else{
                      this.toastr.error("An Unexpected Error Occured.")
                    }
                    
                  })            

                 document.getElementById('saveButton').style.display='none';
                 document.getElementById("appButton").style.display = "";
                 document.getElementById('discardButton').style.display='none';
                 
}

approveOnClick(){
    
    var x:any = this.BCV;
    var y:any = this.indPair;
    //console.log(x,y)

    var data = {"bcv":x,"positional_pairs":y};
          
    this._http.post(this.ApiUrl.approveAlignments,data)
  .subscribe(data=> {  
      let response:any = data;
      //console.log(response._body);
     if(response._body === 'Saved'){
         this.toastr.success('New alignments have been approved successfully.');
     }
  },(error:Response) =>{
     if(error.status === 400){
       this.toastr.warning("Bad Request Error.")
     }
     else{
       this.toastr.error("An Unexpected Error Occured.")
     }
     
   }) 
   
   document.getElementById("appButton").style.display = 'none';

}

fixOnClick(){

    var x:any = this.BCV;
    //console.log(x)

    var data = {"bcv":x};
          
    this._http.post(this.ApiUrl.fixAlignments,data)
  .subscribe(data=> {  
      let response:any = data;
      //console.log(response._body);
     if(response._body === 'Saved'){
         this.toastr.success('Feedback alignment have been updated successfully.');
         this.gridBind();
         document.getElementById('discardButton').style.display='none';
         document.getElementById("saveButton").style.display = "none";
     }
  },(error:Response) =>{
     if(error.status === 400){
       this.toastr.warning("Bad Request Error.")
     }
     else{
       this.toastr.error("An Unexpected Error Occured.")
     }
     
   }) 

   

}

discardOnClick(){
    this.gridBind();
    document.getElementById('discardButton').style.display='none';
    document.getElementById("saveButton").style.display = "none";
}

ngOnInit() {}

ngOnChanges(changes: SimpleChanges){
    const bookChapterVerse: SimpleChange = changes.BCV;
    this.BCV = bookChapterVerse.currentValue;
    this.gridBind();
}


gridBind(){
      let bcv:any = this.BCV; //40001010;
    //   var data = new FormData();
    //   data.append("bcv",bcv);
      this._http.get(this.ApiUrl.getnUpdateBCV + '/' + bcv )
      .subscribe(data => {  
          //console.log(data.json())
        this.rawPos = data.json().positionalpairs;    
      var that = this;
      let self = this;
       let d3 = this.d3;

       document.getElementById("grid").innerHTML = "";
       var content = document.getElementById('grid');
      
    var gridData = this.gridData(data.json(),this.rawPos);

    var hindiLexiconText = '';
    for(var m=0;m<data.json().hinditext.length;m++)
    {
       hindiLexiconText = hindiLexiconText + ' ' + data.json().hinditext[m];
       
    }

    var greekLexiconText = '';
    var greekArray = new Array();
    for(var l=0;l<data.json().greek.length;l++)
    {       
       self._http.get(self.ApiUrl.getLexicon + '/' + data.json().greek[l])
       .subscribe(data => {  
          // console.log(data.json())
          greekArray.push("<b>English Word</b>:- " + data.json().englishword +"<br/><br/>" + "<b>Definition</b>:- "+data.json().definition + "<br/><br/>" +"<b>greek_word</b>:- " + data.json().greek_word + "<br/><br/>"  + "<b>pronunciation</b>:- " + data.json().pronunciation + "<br/><br/>" +"strongs:- " + data.json().strongs +" " + "<br/><br/>" +"<b>transliteration</b>:- " + data.json().transliteration); 
       });      
       greekLexiconText = greekLexiconText + ' ' + data.json().greek[l];
    //    console.log(greekArray)       
    }

    document.getElementById('sourceId').innerHTML=hindiLexiconText;
    document.getElementById('targetId').innerHTML=greekLexiconText;
  
    var grid = d3.select("#grid")
    .append("svg")
    .style("overflow","auto")
    
   var row = grid.selectAll(".row")
   .data(gridData)
   .enter().append("g")
   .attr("class","row"); 
 
  
   var column = row.selectAll(".square")
   .data(function(d:any){return d;})
   .enter().append("rect")
   .attr("id",function(d:any,i){return "rect-"+ d.y + i})
  
   var columnAttributes = column
   .attr("x",function(d:any){return d.x;})
   .attr("y",function(d:any){return d.y;})
   .attr("rx","5")
   .attr("ry","5")
   .attr("width",function(d:any){return d.width})
   .attr("height",function(d:any){return d.height})
   .attr("stroke","pink")
   .attr("fill",
   function(d:any){
      if(d.positionalPairOfApi.includes(d.positionalPair)) {
          d.filled = true;
       return "pink"
     }
     else
     {
         d.filled = false;
         return "#fff"
     }
   }
   )
   .attr("class",function(d:any){
       if(d.positionalPairOfApi.includes(d.positionalPair)){
           return "filledsquare"
       }
       else{
           return "square"
       }
   })
   .on('click',function(d:any,i){
       if(!d.filled)
       {           
       d3.select(this)
       .style("fill","pink")
       .attr('class',"filledsquare");

       //console.log(d.positionalPairOfApi)
       if(!self.indPair.includes(d.positionalPair)){
       self.indPair.push(d.positionalPair);
    }
       
       //document.getElementById('rect-'+d.y+0).style.fill = "#fff";
       
       var splilttedWord = d.positionalPair.split('-');
       if(d.positionalPairOfApi.includes(splilttedWord[0] + "-0"))
          {
            const index: number = d.positionalPairOfApi.indexOf(splilttedWord[0] + "-0");
            if (index !== -1) {
                d.positionalPairOfApi.splice(index, 1);
            }  
            document.getElementById('rect-'+d.y+0).style.fill = "#fff";
           //console.log(splilttedWord[0]);
          }

          d.filled = true;
          d.positionalPairOfApi.push(d.positionalPair);  

        //console.log(d.positionalPairOfApi)
        if(d.rawPosss != d.positionalPairOfApi)
        {
            document.getElementById("saveButton").style.display = "";
            document.getElementById("discardButton").style.display="";
        }
        else
        {
            document.getElementById("saveButton").style.display = "none";
            document.getElementById("discardButton").style.display="none";
        }
      }
      else
      {
          d3.select(this)
          .style("fill","#fff")
          .attr('class',"square")
          d.filled = false;
          var index = d.positionalPairOfApi.indexOf(d.positionalPair);
          if (index > -1) {
              d.positionalPairOfApi.splice(index, 1);
              if(d.rawPosss != d.positionalPairOfApi)
              {
                  //console.log('not matching')
                  document.getElementById("saveButton").style.display = "";
                  document.getElementById("discardButton").style.display="";
              }
              else
              {
                  //console.log('matching')
                  document.getElementById("saveButton").style.display = "none";
                  document.getElementById("discardButton").style.display="none";
              }
        
          }
      }
      //console.log(d.positionalPairOfApi)
       //console.log(self.indPair)
   })
  
   .on("mouseover", function(d:any,i){
      var x = document.getElementById(d.greekIndexWise);
      var y = document.getElementById(d.hindiIndexWise);
      x.style.fontSize = "20px";
      x.style.fill="#008000";
      y.style.fontSize = "20px";
      y.style.fill="#008000";      

      div.style("left", d3.event.pageX+10+"px");
      div.style("top", d3.event.pageY-25+"px");
      div.style("display", "inline-block");
      div.style("text-align","left")
      div.style("width","400px")
      div.html(function() {

       if (d.greekHorizontalWords[i] != 'NULL')
      {
         // console.log(Number(d.greekHorizontalWords[i].substring(1,d.greekHorizontalWords[i].length)));
          let removeZero = Number(d.greekHorizontalWords[i].substring(1,d.greekHorizontalWords[i].length)).toString();
          if (removeZero.endsWith('0'))
          {
             removeZero = removeZero.substring(0,removeZero.length - 1)
          }
         // console.log(removeZero)
          for(let count=0; count < greekArray.length; count++){
              //console.log(greekArray[count])
              if(greekArray[count].includes("strongs:- " + removeZero + " ")){ 
                  //console.log(greekArray[count])
                  return  "<b>" +  y.innerHTML + "</b>" + " => " + "<b>" + x.innerHTML + "</b>" +"<br/><br/>" + greekArray[count];
          }
          

          }
      }
      else{
        return y.innerHTML + " => " + x.innerHTML;
      }
      });





   })
  
   .on("mouseout", function(d:any){
      var x = document.getElementById(d.greekIndexWise);
      var y = document.getElementById(d.hindiIndexWise);
      x.style.fontSize = "16px";
      x.style.fill="black";
      y.style.fontSize = "16px";
      y.style.fill="black";      
      div.style("display", "none");
  })

  var upperColumn = row.selectAll(".upperColumn")
  .data(function(d:any){ 
    return d;})
  .enter().append("text")
  

// For making the svg matrix scrollable
      d3.selectAll("svg")
      .data(gridData)
      .attr("width",function(d,i){          
          let len = d.length;
          len = (len * 35) + 120;
       return len;
      })
      .attr("height",function(d,i){
        let len = d[0].hindiVerticalWords.length;
        len = (len * 35) + 120;
        return len;
        })
 // Ended Here   
 
 var labell = d3.selectAll(".row")
 .data(gridData)

 var label = labell.append("text")
     .attr("x", "30")
     .attr("y", function (d,i) {
             return d[0].y + 25;
         })
         .style("font-size", "16px")
         .attr("id",function(d,i){
             return d[0].hindiIndexWise;
         })
     .text(function(d,i){
         return d[0].hindiVerticalWords[i];
     })

    //  content.addEventListener('scroll', function(evt) {
    //    //console.log(  label.nodes()[1]);
    //    for(var i =0; i<label.nodes().length; i++){
    //     label.nodes()[i].setAttribute('x', 30 + this.scrollLeft);
    // }
    //   }, false)


    var labellll =  grid.selectAll("svg")
    .data(gridData[0])
     var labelll =   labellll.enter().append("g")
    var div = d3.select("body")
    .append("div")
    .attr("class", "toolTip")
    .attr("word-wrap","break-word")
    ;  
     
      var labelGreek  = labelll.append("text")
      
          .attr("transform", function (d:any,i) {
                 var xAxis = d.x + 25;
                      return "translate(" + xAxis + ",85)rotate(300)" ;
                  })    
          .style("font-size", "16px")
          .attr("id",function(d:any,i){
              return d.greekIndexWise;
          })
          .text(function(d:any,i){
               return d.greekHorizontalWords[i];
          })

    
         .on("mouseout", function(d){
             div.style("display", "none");
        })
        .on('mouseover', function(d:any,i){
             div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.style("text-align","left")
            div.style("width","400px")
            div.html(function() {

             if (d.greekHorizontalWords[i] != 'NULL')
            {
               // console.log(Number(d.greekHorizontalWords[i].substring(1,d.greekHorizontalWords[i].length)));
                let removeZero = Number(d.greekHorizontalWords[i].substring(1,d.greekHorizontalWords[i].length)).toString();
                if (removeZero.endsWith('0'))
                {
                   removeZero = removeZero.substring(0,removeZero.length - 1)
                }
               // console.log(removeZero)
                for(let count=0; count < greekArray.length; count++){
                    //console.log(greekArray[count])
                    if(greekArray[count].includes("strongs:- " + removeZero + " ")){ 
                        //console.log(greekArray[count])
                        return greekArray[count];
                }
                

                }
            }
            else{
              return 'N/A';
            }
                
                //return  (d.greekHorizontalWords[i] == 'NULL') ? 'N/A':d.greekHorizontalWords[i]
            });
        })

             content.addEventListener('scroll', function(evt) {

                // var elms:any = document.querySelectorAll("[id='rect-100']");

                // for(var i = 0; i < elms.length; i++) 
                //     elms[i].style.display='none'; 
            
                for(var i =0; i<labelGreek.nodes().length; i++){
                    let labelGreekData:any = gridData[0][i];
                        var xi:any = labelGreekData.x + 25;                     
                    (labelGreek.nodes()[i] as  any).setAttribute("transform", "translate(" + xi + "," + (85 + this.scrollTop) +")rotate(300)")
                    //labelGreek.nodes()[i].setAttribute("style","font-size:20px")
                                                           

                    // document.getElementById('rect-100').style.display = "none";
                    // console.log (85 + this.scrollTop)


             }
               }, false)

 
    },(error:Response) =>{
        if(error.status === 404){
          this.toastr.warning("Data not available")
        }
        else{
          this.toastr.error("An Unexpected Error Occured.")
        }
        
      });
   
  }

}
