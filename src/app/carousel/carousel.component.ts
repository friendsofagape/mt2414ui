import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mySlideImages = [1,2,3].map((i)=> `https://picsum.photos/640/480?image=${i}`);
  
  mySlideOptions={items: 1, dots: true, nav: true};

  myCarouselOptions={items: 3, dots: true, nav: true};
  
}
