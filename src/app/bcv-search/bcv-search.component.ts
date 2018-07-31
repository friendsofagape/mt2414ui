import { Component, OnInit} from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AlignerService } from '../aligner.service';
import { promise } from 'protractor';
import { stringify } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';
import {GlobalUrl} from '../globalUrl';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-bcv-search',
  templateUrl: './bcv-search.component.html',
  styleUrls: ['./bcv-search.component.css']
})
export class BcvSearchComponent implements OnInit {

  Books:any;
  Chapters:any;
  Verses:any;    
  bookName:any;
  chapterNumber:string;
  bookNumber:string;
  verseNumber:string;
  BCV:any;
  chapterFirstIndex:any;
  verseFirstIndex:any;
  bookFirstIndex:any;


  constructor(private activatedRoute: ActivatedRoute,private toastr: ToastrService,private _http:Http,private ApiUrl:GlobalUrl) {

    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar =true;
   }


  ngOnInit() {
    this.chapterFirstIndex = 0;
    this.verseFirstIndex = 0;
    this.bookFirstIndex = 0;
    this._http.get(this.ApiUrl.getBooks)
    .subscribe(data => {
      this.Books = data.json().books;
      //console.log (data.json())
    },(error:Response) =>{
      if(error.status === 404){
        this.toastr.warning("Books data not available")
      }
      else{
        this.toastr.error("An Unexpected Error Occured.")
      }
      
    })

    this.activatedRoute.params.subscribe((params: Params) => {

      enum bookno {"MAT" = 40,"MRK" = 41,"LUK" = 42,"JHN" = 43,"ACT" = 44,"ROM" = 45,
      "1CO" = 46,"2CO" = 47,"GAL" = 48,"EPH" = 49,"PHP" = 50,"COL" = 51,"1TH" = 52,
      "2TH" = 53,"1TI" = 54,"2TI" = 55,"TIT" = 56,"PHM" = 57,"HEB" = 58,"JAS" = 59,
      "1PE" = 60,"2PE" = 61,"1JN" = 62,"2JN" = 63,"3JN" = 64,"JUD" = 65,"REV" = 66,
      "GEN" = "01","EXO" = "02","LEV" = "03","NUM" = "04","DEU" = "05","JOS" = "06",
      "JDG" = "07","RUT" = "08",'1SA' = "09","2SA" = 10,"1KI" = 11,"2KI" = 12,
      "1CH" = 13,"2CH" = 14,"EZR" = 15,"NEH" = 16,"EST" = 17,"JOB" = 18,"PSA" = 19
      ,"PRO" = 20,"ECC" = 21,"SNG" = 22,"ISA" = 23,"JER" = 24,"LAM" = 25,"EZK" = 26,
      "DAN" = 27,"HOS" = 28,"JOL" = 29,"AMO" = 30,"OBA" = 31,"JON" = 32,"MIC" = 33,
      "NAM" = 34,"HAB" = 35,"ZEP" = 36,"HAG" = 37,"ZEC" = 38,"MAL" = 39};

      if(params['BCV']){
      let BcvParam:string = params['BCV'];
     
      BcvParam = BcvParam.replace( /\./g, "" );
      if(BcvParam.length == 8 ){
      let booknostr = bookno[BcvParam.substring(0,2)];
      this.bookFirstIndex = booknostr;
      this.bookChange(booknostr);

 
      
      let chapterstr = BcvParam.substring(2,5).replace(/^0+/, ''); 
      this.chapterFirstIndex = BcvParam.substring(2,5).replace(/^0+/, '');
      this.chapterChange(chapterstr,booknostr);

      this.bookNumber = BcvParam.substring(0,2);      
      this.chapterNumber =BcvParam.substring(2,5);

      let versestr = BcvParam.substring(5,8).replace(/^0+/, ''); 
      this.verseFirstIndex = BcvParam.substring(5,8).replace(/^0+/, '');
      this.verseChange(versestr);

      localStorage.setItem("lastAlignments", "");
    }
  }
    });
    
  }


  bookChange(x){
    this.chapterFirstIndex = 0;
    this.verseFirstIndex = 0;
    this.verseNumber=stringify(0);
    this.BCV = null

    // var data = new FormData();
    // data.append("bookname", x);    
    this.bookName = x;
    //console.log(this.bookName)

    if(this.bookFirstIndex != 0){
    this._http.get(this.ApiUrl.getChapters + x)
    .subscribe(data => {
      this.Chapters = data.json().chapter_numbers;
      //console.log (data.json())
    },(error:Response) =>{
      if(error.status === 404){
        this.toastr.warning("Chapter data not available")
      }
      else{
        this.toastr.error("An Unexpected Error Occured.")
      }
      
    })
     }
     else {
      this.Chapters = null;
     }
  }

  chapterChange(x:string,y){
    this.verseFirstIndex = 0;
    this.verseNumber=stringify(0);
    // var data = new FormData();
    this.BCV = null
    // data.append("chapternumber", x);
    // data.append("bookname", y);

    if(x != stringify(0)){
    this._http.get(this.ApiUrl.getVerses+ y +'/'+ x)
    .subscribe(data => {
      this.Verses = data.json().verse_numbers;
      // console.log (data.json())
      enum booknumber {"GEN" = "01","EXO" = "02","LEV" = "03","NUM" = "04","DEU" = "05",
      "JOS" = "06","JDG" = "07","RUT" = "08",'1SA' = "09","2SA" = 10,"1KI" = 11,"2KI" = 12,
      "1CH" = 13,"2CH" = 14,"EZR" = 15,"NEH" = 16,"EST" = 17,"JOB" = 18,"PSA" = 19
      ,"PRO" = 20,"ECC" = 21,"SNG" = 22,"ISA" = 23,"JER" = 24,"LAM" = 25,"EZK" = 26,
      "DAN" = 27,"HOS" = 28,"JOL" = 29,"AMO" = 30,"OBA" = 31,"JON" = 32,"MIC" = 33,
      "NAM" = 34,"HAB" = 35,"ZEP" = 36,"HAG" = 37,"ZEC" = 38,"MAL" = 39,"MAT" = 40,
      "MRK" = 41,"LUK" = 42,"JHN" = 43,"ACT" = 44,"ROM" = 45,"1CO" = 46,"2CO" = 47,
      "GAL" = 48,"EPH" = 49,"PHP" = 50,"COL" = 51,"1TH" = 52,"2TH" = 53,"1TI" = 54,
      "2TI" = 55,"TIT" = 56,"PHM" = 57,"HEB" = 58,"JAS" = 59,"1PE" = 60,"2PE" = 61,
      "1JN" = 62,"2JN" = 63,"3JN" = 64,"JUD" = 65,"REV" = 66};

      this.bookNumber = booknumber[this.bookName];
      //console.log(booknumber[this.bookName]);

      if (x.length > 2){this.chapterNumber = x} 
      else if(x.length >1) {this.chapterNumber  = '0'+ x}
      else if(x.length === 1) {this.chapterNumber = '00'+ x}  ;
      //console.log(this.chapterNumber)
    },(error:Response) =>{
      if(error.status === 404){
        this.toastr.warning("Verse data not available")
      }
      else{
        this.toastr.error("An Unexpected Error Occured.")
      }
      
    })
  }
  else 
  {this.Verses = null }
  }

   verseChange(x:string){
    if (x.length > 2){this.verseNumber = x} 
    else if(x.length >1) {this.verseNumber  = '0'+ x}
    else if(x.length === 1) {this.verseNumber = '00'+ x};

    if(this.verseNumber == '000')
    {this.BCV = null}
    else
    this.BCV = this.bookNumber + this.chapterNumber + this.verseNumber;

    if(document.getElementById("saveButton"))
    document.getElementById("saveButton").style.display = "none";
    if(document.getElementById("appButton"))
    document.getElementById("appButton").style.display = 'none';
    if(document.getElementById("discardButton"))
    document.getElementById("discardButton").style.display = 'none';

    localStorage.setItem("lastAlignments", "");
  }

  prevOnclick(){
    document.getElementById('grid').scrollTop =0;
    if(document.getElementById("saveButton").style.display != "none"){
      this.toastr.warning("Kindly click on save to make the updation or discard changes.")
    }

    else {

    if(this.verseNumber != '000')
    {
    document.getElementById("saveButton").style.display = "none";
    document.getElementById("appButton").style.display = 'none';
    document.getElementById("discardButton").style.display = 'none';
    }

    if(this.chapterNumber && this.verseNumber){
              
              (Number(this.verseNumber) <= this.Verses.length
               && Number(this.verseNumber) > 1) 
               ? this.verseNumber = stringify((Number(this.verseNumber) - 1))
               : this.verseNumber
         

              this.verseFirstIndex = Number(this.verseNumber);
            
            
            let U:string = this.verseNumber;
            if (U.length > 2){this.verseNumber = U} 
            else if(U.length >1) {this.verseNumber  = '0'+ U}
            else if(U.length === 1) {this.verseNumber = '00'+ U};
            //console.log(this.verseNumber)


            if(this.verseNumber == '000')
            {this.BCV = null}
            else
            this.BCV = this.bookNumber + this.chapterNumber + this.verseNumber;

            //console.log('prev' + this.bookNumber + this.chapterNumber + this.verseNumber);
            
            //console.log (this.BCV + "  " + "prev")
          }
        }
        localStorage.setItem("lastAlignments", "");
  }

  nextOnClick(){
    document.getElementById('grid').scrollTop =0;
    if(document.getElementById("saveButton").style.display != "none"){
      this.toastr.warning("Kindly click on save to make the updation or discard changes.")
    }

    else {

    //console.log(this.bookNumber + this.chapterNumber)
    
    if(this.verseNumber != '000')
    {

    document.getElementById("saveButton").style.display = "none";
    document.getElementById("appButton").style.display = 'none';
    document.getElementById("discardButton").style.display = 'none';
    }
    //console.log(this.chapterNumber);

    (Number(this.verseNumber) < this.Verses.length
    && Number(this.verseNumber) > 0) 
    ? this.verseNumber = stringify((Number(this.verseNumber) + 1))
    : this.verseNumber 

    this.verseFirstIndex = Number(this.verseNumber);

    let U:string = this.verseNumber;
    if (U.length > 2){this.verseNumber = U} 
    else if(U.length >1) {this.verseNumber  = '0'+ U}
    else if(U.length === 1) {this.verseNumber = '00'+ U};
    //console.log(this.verseNumber)

    //console.log('prev' + this.bookNumber + this.chapterNumber + this.verseNumber);
    if(this.verseNumber == '000')
    {this.BCV = null}
    else
    this.BCV = this.bookNumber + this.chapterNumber + this.verseNumber;
    //console.log (this.BCV + "  " + "next")

    localStorage.setItem("lastAlignments", "");
}
}

}
