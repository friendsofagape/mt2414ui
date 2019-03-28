import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GlobalUrl } from '../globalUrl';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import 'hammerjs';
import { parse } from 'url';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  from: number = 1;
  to: number = 10;
  // headers = new Headers();
  // guestUser = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZXJva3VAeW9wbWFpbC5jb20iLCJleHAiOjE1MzgxNjIwMTgsInJvbGUiOiJtZW1iZXIifQ.diVbmG_9TqRvgNIWKsnfrbgWUoqJxtWCc_HVVoFjMac";

  displayedColumns: string[] = ['S.No', 'English Word forms', 'Hindi Translation', 'Definition/Facts/Description', 'Strong Number', 'References', 'AlignedStrongs', 'HindiAlignedWords'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  ngOnInit() {
    localStorage.setItem("language", "");
    localStorage.setItem('Targetlanguage', "");
    this.getSampeTranslationData('');
  }

  constructor(public router: Router, private toastr: ToastrService, private _http: Http, private ApiUrl: GlobalUrl, private changeDetectorRefs: ChangeDetectorRef) {

    // if (!localStorage.getItem('access-token')) {
    //   this.toastr.error('You are not logged in');
    //   this.router.navigate(['../app-login']);
    // }

    // this.createAuthorizationHeader(this.headers);
  }


  // createAuthorizationHeader(headers: Headers) {
  //     if(localStorage.getItem("access-token")){
  //       headers.append('Authorization', 'bearer ' +
  //         localStorage.getItem("access-token")); 
  //       }
  //       else{
  //         headers.append('Authorization', 'bearer ' + this.guestUser);
  //       }
  // }

  display = false;
  showAll(id) {
    let defId;
    if (id.split('-')[1] > 10) {
      let mode = ((id.split('-')[1] % 10) == 0) ? 10 : (id.split('-')[1] % 10);
      ////console.log(mode)
      defId = (id.split('-')[0]) + '-' + mode;
      ////console.log(defId)
    }
    else {
      defId = id;
    }
    ////console.log(this.ELEMENT_DATA)
    if (document.getElementById(id).innerHTML == this.ELEMENT_DATA[defId.split('-')[1] - 1].Definition) {
      document.getElementById(id).innerHTML = this.ELEMENT_DATA[defId.split('-')[1] - 1].Definition.substring(0, 150) + "......";
    }
    else
      document.getElementById(id).innerHTML = this.ELEMENT_DATA[defId.split('-')[1] - 1].Definition;
  }


  getData(a, b) {
    this._http.get(this.ApiUrl.csvFile)
      .subscribe(data => {
        let transValue: any;
        let transKey: any = "";
        this.csvData = data.text().split(/\r?\n|\r/);
        this.ELEMENT_DATA = [];

        let c = 1;
        //let d = 10;

        for (let i = a; i < b + 1; i++) {

          let value = this.csvData[i].split('	');
          let refVal = value[5];
          var foo = new Array(refVal.toString().split(',').length);
          var loo = new Array(refVal.toString().split(',').length);
          for (let v = 0; v < refVal.toString().split(',').length; v++) {
            foo[v] = "NA";
            loo[v] = "NA";
            if (Object.values(this.transData)[c - 1] != undefined && Object.values(this.transData)[c - 1] != null && Object.values(Object.values(this.transData)[c - 1]) != undefined && Object.values(Object.values(this.transData)[c - 1]) != null) {
              transValue = Object.keys(Object.values(this.transData)[c - 1]);
              transKey = Object.values(Object.values(this.transData)[c - 1]);

              for (let y = 0; y < transValue.length; y++) {

                if (refVal.toString().replace(/\ /g, "").split(',').indexOf(transValue[y].toString()) > -1) {

                  let ind = refVal.toString().replace(/\ /g, "").split(',').indexOf(transValue[y].toString());
                  foo[ind] = (transKey[y]['words'].toString().split(',')[0].replace(/\(/g, "")).replace(/\'/g, "").replace(/\./g, "");
                  loo[ind] = (transKey[y]['words'].toString().split(',')[1].replace(/\)/g, "")).replace(/\'/g, "").replace(/\./g, "") + '-' + refVal.toString().replace(/\ /g, "").split(',')[ind] + '-' + foo[ind];

                }

              }


            }

          }
          //console.log(transKey)
          this.ELEMENT_DATA.push({ position: value[0], English: value[1], Hindi: value[2], Definition: value[3], StrongNumber: value[4], References: value[5], AlignedStrongs: foo, HindiAlignedWords: loo })
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
          ++c;
          // ////console.log(value[0]);
        }
        // //console.log(this.ELEMENT_DATA)
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
  }


  getSampeTranslationData(btn) {
    if (!(this.from == 1 && btn == 'prev')) {
      this.display = true;
      if (btn == 'next') {
        this.from = this.from + 10;
        this.to = this.to + 10;
      }
      if (btn == 'prev') {
        this.from = this.from - 10;
        this.to = this.to - 10;
      }
      if (document.getElementById('pageInd') != null) {
        document.getElementById('pageInd').innerHTML = this.from + '-' + this.to;
      }
      // this._http.get('http://127.0.0.1:8000/v2/alignments/translationwords/grkhin/' + this.from + '-' + this.to,{
      this._http.get(this.ApiUrl.translationwords + '/hin-4/grk-ugnt/' + this.from + '-' + this.to)
        .subscribe(data => {
          this.transData = JSON.parse(data.json());
          ////console.log(Object.values(Object.keys(this.transData)[3]))
          // //console.log(this.transData)
          //console.log( Object.values(Object.values(this.transData)[1]))
          ////console.log(this.from + '   ' + this.to)
          this.getData(this.from, this.to);
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
  }

}
