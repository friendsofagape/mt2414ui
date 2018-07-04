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
  }

}
