import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GlobalUrl } from '../globalUrl';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import 'hammerjs';
import { parse } from 'url';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';

export interface PeriodicElement {
  StrongNumber: any;
  Checked: any;
  Unchecked: any;
}

@Component({
  selector: 'word-view-editor',
  templateUrl: './word-view-editor.component.html',
  styleUrls: ['./word-view-editor.component.css']
})
export class WordViewEditorComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];

  displayedColumns: string[] = ['Strong Number', 'Checked', 'Unchecked'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  LangArray: any;
  strongArray: any;
  checkArray: any;
  uncheckArray:any;
  langFirstIndex: any;
  display:boolean;
  glang:any;
  Target: any;
  trgFirstIndex: any;

  ngOnInit() {
    localStorage.setItem("language", "");
    localStorage.setItem('Targetlanguage', "");
    
    this.langFirstIndex = 0;
    this.trgFirstIndex = 0;
    
    this._http.get(this.ApiUrl.getLang)
      .subscribe(data => {
        this.LangArray = data.json();
      }, (error: Response) => {
        if (error.status === 404) {
          this.toastr.warning("Language data not available")
        }
        else {
          this.toastr.error("An Unexpected Error Occured.")
        }

      })    
  }

  constructor(public router: Router, private toastr: ToastrService, private _http: Http, private ApiUrl: GlobalUrl, private changeDetectorRefs: ChangeDetectorRef) {
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getSampeTranslationData() {
    if (this.strongArray) {
      this.ELEMENT_DATA = [];
      for (let i = 0; i < this.strongArray.length; i++) {        
        this.ELEMENT_DATA.push({StrongNumber:this.strongArray[i], Checked:this.checkArray[i]["checked"], Unchecked:this.checkArray[i]["unchecked"] })
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    }
    this.display = false;
  }

  glLangChange(value){
    //console.log('event run')

    this.trgFirstIndex = 0;

    this.glang = value;

    this._http.get(this.ApiUrl.getTarget + "/" + value).subscribe(
      data => {
        this.Target = data.json();
        //console.log (data.json())
      },
      (error: Response) => {
        if (error.status === 404) {
          this.toastr.warning("Target Language data not available");
        } else {
          this.toastr.error("An Unexpected Error Occured.");
        }
      }
    );         
  }


  targetLangChange(l) {
    if (l != 0) {
      this.trgFirstIndex = l;

      this.display = true;
      this._http.get(this.ApiUrl.strongslist + "/" + this.glang   + '/' + l )
      .subscribe(data => {
        this.display = false;
        this.strongArray = Object.keys(data.json());
        this.checkArray =  Object.values(data.json());      
        //console.log(this.checkArray)
        this.getSampeTranslationData();
        
      }, (error: Response) => {
        if (error.status === 404) {
          this.toastr.warning("Strongs data not available")
        }
        else {
          this.toastr.error("An Unexpected Error Occured.")
        }
  
      })
    }
  }

}

