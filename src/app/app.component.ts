import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  componame:any = "csv-to-table";
  linkName:string = "Translation Page"

  compchange(){
    if(this.componame == "csv-to-table")
    {
     this.componame = "app-bcv-search";
     this.linkName = "Home";
  }
  else{
    this.componame = "csv-to-table"
    this.linkName = "Translation Page";
  }
}
}
