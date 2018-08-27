import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalUrl } from '../globalUrl';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import 'hammerjs';

export interface PeriodicElement {
  position: any;
  English: any;
  Hindi: any;
  Definition: any;
  StrongNumber: any;
  References: any;
  AlignedStrongs: any;
  HindiAlignedWords: any;
}

@Component({
  selector: 'csv-to-table',
  templateUrl: './csv-to-table.component.html',
  styleUrls: ['./csv-to-table.component.css']
})
export class CsvToTableComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  csvData: any;
  transData: any;

  displayedColumns: string[] = ['S.No', 'English Word forms', 'Hindi Translation', 'Definition/Facts/Description', 'Strong Number', 'References', 'AlignedStrongs', 'HindiAlignedWords'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    localStorage.setItem("language", "");
    this.getSampeTranslationData();
    this.getData();
  }

  constructor(private _http: Http, private ApiUrl: GlobalUrl) { }

  display = false;
  showAll(id) {
    if (document.getElementById(id).innerHTML == this.ELEMENT_DATA[id.split('-')[1] - 1].Definition) {
      document.getElementById(id).innerHTML = this.ELEMENT_DATA[id.split('-')[1] - 1].Definition.substring(0, 150) + "......";
    }
    else
      document.getElementById(id).innerHTML = this.ELEMENT_DATA[id.split('-')[1] - 1].Definition;
  }

  getData() {
    this.display = true;
    this._http.get(this.ApiUrl.csvFile)
      .subscribe(data => {
        let transValue: any;
        let transKey: any = "";
        this.csvData = data.text().split(/\r?\n|\r/);

        for (let i = 1; i < this.csvData.length - 1; i++) {

          let value = this.csvData[i].split('	');
          let refVal = value[5];
          var foo = new Array(refVal.toString().split(',').length);
          var loo = new Array(refVal.toString().split(',').length);
          for (let v = 0; v < refVal.toString().split(',').length; v++) {
            foo[v] = "NA";
            loo[v] = "NA";
            if (Object.values(this.transData)[i - 1] != undefined && Object.values(this.transData)[i - 1] != null && Object.values(Object.values(this.transData)[i - 1]) != undefined && Object.values(Object.values(this.transData)[i - 1]) != null) {
              transValue = Object.keys(Object.values(this.transData)[i - 1]);
              transKey = Object.values(Object.values(this.transData)[i - 1]);

              for (let y = 0; y < transValue.length; y++) {

                if (refVal.toString().replace(/\ /g, "").split(',').indexOf(transValue[y].toString()) > -1) {

                  let ind = refVal.toString().replace(/\ /g, "").split(',').indexOf(transValue[y].toString());
                  foo[ind] = (transKey[y].toString().split(',')[0].replace(/\(/g, "")).replace(/\'/g, "").replace(/\./g, "");
                  loo[ind] = (transKey[y].toString().split(',')[1].replace(/\)/g, "")).replace(/\'/g, "").replace(/\./g, "");
                }

              }


            }

          }


          // let hindiAligned: any = "";
          // let strongAligned: any = "";
          // if (Object.values(this.transData)[i - 1] != undefined && Object.values(this.transData)[i - 1] != null && Object.values(Object.values(this.transData)[i - 1]) != undefined && Object.values(Object.values(this.transData)[i - 1]) != null) {
          //   transKey = Object.values(Object.values(this.transData)[i - 1]);

          //   for (let y = 0; y < transKey.length; y++) {
          //     if (transKey[y].toString().indexOf(',') > -1) {
          //       hindiAligned = hindiAligned + "," + (transKey[y].toString().split(',')[1].replace(/\)/g, "")).replace(/\'/g, "").replace(/\./g, "");

          //       strongAligned = strongAligned + "," + (transKey[y].toString().split(',')[0].replace(/\(/g, "")).replace(/\'/g, "").replace(/\./g, "") + "  ";
          //     }
          //   }
          // }

          this.ELEMENT_DATA.push({ position: value[0], English: value[1], Hindi: value[2], Definition: value[3], StrongNumber: value[4], References: value[5], AlignedStrongs: foo, HindiAlignedWords: loo })

          // console.log(value[0]);
        }
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        this.display = false;
      }, (error: Response) => {
        if (error.status === 404) {
          this.display = false;
        }
        else {
          this.display = false;
        }

      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


  getSampeTranslationData() {
    this._http.get(this.ApiUrl.sampleFile)
      .subscribe(data => {
        this.transData = data.json();
        // console.log(data.json())
        // console.log(Object.keys(data.json()).length);
        // for(let i =1; i <= Object.keys(data.json()).length; i++){
        //   //console.log(data.json()[i]);     
        // }


      }, (error: Response) => {
        if (error.status === 404) {
          this.display = false;
        }
        else {
          this.display = false;
        }

      })
  }

}
