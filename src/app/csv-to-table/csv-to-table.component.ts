import { Component, OnInit } from '@angular/core';
import { Http , Response } from '@angular/http';
import {GlobalUrl} from '../globalUrl';

@Component({
  selector: 'csv-to-table',
  templateUrl: './csv-to-table.component.html',
  styleUrls: ['./csv-to-table.component.css']
})
export class CsvToTableComponent implements OnInit {

  constructor(private _http:Http,private ApiUrl:GlobalUrl) { }

   alignmentData;
   cell_data;
   display = false;

  getData(){
    this.display = true;
    this._http.get(this.ApiUrl.csvFile)
    .subscribe(data => {
      this.alignmentData = data.text().split(/\r?\n|\r/);
      this.display = false;
    },(error:Response) =>{
      if(error.status === 404){
        this.display = false;
      }
      else{
        this.display = false;
      }
      
    })
  }

  ngOnInit() {
  }

}
