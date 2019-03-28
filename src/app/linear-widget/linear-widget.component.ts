import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'linear-widget',
  templateUrl: './linear-widget.component.html',
  styleUrls: ['./linear-widget.component.css']
})
export class LinearWidgetComponent implements OnInit {

  @Input() linearCard: any;
  @Input() linearLid: any;  
   sourcetext;
   targettext;
   englishword;
   englishSourceArray = new Array();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.linearLid.currentValue)
    

    this.sourcetext =  this.linearCard.targetContent[this.linearCard.LidList[this.linearCard.bcvList.indexOf(String(changes.linearLid.currentValue))]].strongs;
    //this.targettext = this.linearCard.sourceContent[this.linearCard.lid].hin_text;
    this.targettext =  Object.values(this.linearCard.sourceContent[this.linearCard.lid])[0];
    this.englishword = this.linearCard.targetContent[this.linearCard.LidList[this.linearCard.bcvList.indexOf(String(changes.linearLid.currentValue))]].english;
    //this.englishword = this.linearCard.targetContent[this.linearCard.lid].english;

    if(this.sourcetext.length ==  this.englishword.length){
      this.englishSourceArray = [];
      for(let i = 0 ; i < this.sourcetext.length; i ++){
              this.englishSourceArray.push(this.englishword[i] + '<' + this.sourcetext[i] + '>');
      }
    }

}

}
