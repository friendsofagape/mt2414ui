import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'horizontal-card',
  templateUrl: './horizontal-card.component.html',
  styleUrls: ['./horizontal-card.component.css']
})
export class HorizontalCardComponent implements OnInit {

  @Input() horizontalCard: any;

  constructor() { }

  ngOnInit() {
    for(let i=1; i < this.horizontalCard.greekWords.length; i++){
          let firstIndex = this.horizontalCard.greekWords[i].indexOf("(");
          this.horizontalCard.greekWords[i] = this.horizontalCard.greekWords[i];//.substring(firstIndex);
          //console.log( this.horizontalCard.greekWords[i].substring(firstIndex));
    }
  }

}
