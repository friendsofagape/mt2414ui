import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { GlobalUrl } from '../globalUrl';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {

  BCV: any;
  // Strong: any;
  // langWord: any;
  Pos = [];
  Lang: any;
  trglang:any;
  linearCard: any;
  sourcetext;
  targettext;
  englishword;
  englishSourceArray = new Array();
  display: boolean;
  headers = new Headers();
  lid:any;
  constructor(public router: Router, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private _http: Http, private ApiUrl: GlobalUrl) {
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
    this.toastr.toastrConfig.timeOut = 1200;

    this.createAuthorizationHeader(this.headers);
  }


  createAuthorizationHeader(headers: Headers) {
    if (localStorage.getItem("access-token")) {
      headers.append('Authorization', 'bearer ' +
        localStorage.getItem("access-token"));

      this.decodeToken(String(JSON.parse(JSON.stringify(this.headers)).Authorization));
    }
  }

  decodeToken(token) {
    var playload = JSON.parse(atob(token.split('.')[1]));
    let dd = Number(playload.exp)
    // var timeDiff = Math.abs(new Date(dd * 1000).getTime() - new Date().getTime());
    // if (Math.ceil(timeDiff / (1000 * 3600 * 24)) > 1) {
    //   localStorage.setItem("access-token", '');
    //   this.router.navigate(['../app-login']);
    // }

    if(Date.now() / 1000 > dd){
      localStorage.setItem("access-token", '');
      location.reload();
      this.router.navigate(['../'])
    }
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      if (params['BCV']) {
        this.BCV = params['BCV'];
        // this.Strong = params['BCV'].split('-')[1];
        // this.langWord = params['BCV'].split('-')[2];
        this.Pos = params['Pos'].split(',');
        this.Lang = params['Lang'];
        this.trglang = params['TrgLang'];
        
        var x: any = this.BCV;
        var l: any = this.Lang;
        //console.log(this.Pos)

        this.display = true;
        this._http.get(this.ApiUrl.getnUpdateBCV + '/' + x + '/' + l + '/' + this.trglang)
          .subscribe(data => {

            this.linearCard = data.json();
            //console.log(data.json())
            // this.sourcetext = this.linearCard.sourcetext;
            // this.targettext = this.linearCard.targettext;
            // this.englishword = this.linearCard.englishword;
            let bcvArray = [];
            this.linearCard.bcvList.forEach(bcv => {
              if(bcv.length == 7){
               bcvArray.push("0" + bcv);
               console.log(bcv)
             }
             else{
              bcvArray.push(bcv);
             }
            });
            console.log(bcvArray)
            let indexOfBcv = bcvArray.indexOf(x);
            let lid = this.linearCard.LidList[indexOfBcv];
            this.lid = lid;
            console.log(lid)
            this.sourcetext = this.linearCard.targetContent[lid].strongs;
            this.targettext = Object.values(this.linearCard.sourceContent[lid])[0];
            this.englishword = this.linearCard.targetContent[lid].english;


            if (this.sourcetext.length == this.englishword.length) {

              for (let i = 0; i < this.sourcetext.length; i++) {
                this.englishSourceArray.push(this.englishword[i] + '<' + this.sourcetext[i] + '>');
              }
            }
            //console.log('G' + params['Strong'] + '0')

            //let response: any = data;
            this.display = false;
            //console.log(this.linearCard.positionalpairs)
          }, (error: Response) => {
            if (error.status === 400) {
              this.display = false;
              // this.toastr.warning("Bad Request Error.")
            }
            else {
              this.display = false;
              // this.toastr.error("An Unexpected Error Occured.")
            }

          })
      }
    });

  }

  ngAfterViewChecked() {
    // if (document.getElementById(this.Strong) && document.getElementById(this.langWord)) {
    //   document.getElementById(this.Strong).style.background = 'yellow';

    //   if (this.targettext.includes(this.langWord) && this.sourcetext.includes(Number(this.Strong))) {
    //     //console.log(Number(this.targettext.indexOf(e) + 1))
    //     let left = Number(this.targettext.indexOf(this.langWord) + 1);
    //     let right = Number(this.sourcetext.indexOf(Number(this.Strong)) + 1);

    //     if (this.linearCard.positionalpairs.includes(left + "-" + right)) {
    //       const index: number = this.linearCard.positionalpairs.indexOf(left + "-" + right);
    //       if (index !== -1) {
    //         console.log("ngview")
    //         document.getElementById(this.langWord).style.background = 'black';
    //       }
    //     }
    //   }
    // }

    for (let i = 0; i < this.Pos.length; i++) {
      if (document.getElementById('down-' + (this.Pos[i].split('-')[1]))) {
        document.getElementById('down-' + (this.Pos[i].split('-')[1])).style.background = 'yellow';
      }

      if (document.getElementById('up-' + (this.Pos[i].split('-')[0])) && this.linearCard.positionalPairs[this.lid]["pairs"].includes(this.Pos[i].split('-')[0] + "-" + (this.Pos[0].split('-')[1]))) {
        document.getElementById('up-' + (this.Pos[i].split('-')[0])).style.background = 'black';
        document.getElementById('up-' + (this.Pos[i].split('-')[0])).style.borderStyle = 'outset';

      }
    }
  }

  targetClick(e) {
    console.log(e)
    console.log(this.linearCard.positionalpairs)
    if (this.linearCard.positionalPairs[this.lid]["pairs"].includes(e + "-" + (this.Pos[0].split('-')[1]))) {

      const index: number = this.linearCard.positionalPairs[this.lid]["pairs"].indexOf(e + "-" + (this.Pos[0].split('-')[1]));
      if (index !== -1) {
        this.linearCard.positionalPairs[this.lid]["pairs"].splice(index, 1);
        console.log("splice")
        document.getElementById('up-' + e).style.background = '';
        document.getElementById('up-' + e).style.borderStyle = "";
        console.log('up-' + e)
      }
    }
    else {
      this.linearCard.positionalPairs[this.lid]["pairs"].push(e + "-" + (this.Pos[0].split('-')[1]));

      document.getElementById('up-' + e).style.background = "black";
      document.getElementById('up-' + e).style.borderStyle = "outset";
    }
    console.log(this.linearCard.positionalpairs)
  }

  saveOnClick() {
    if (localStorage.getItem('access-token')) {

      this.decodeToken(String(JSON.parse(JSON.stringify(this.headers)).Authorization));

      this.toastr.error('You are not under any organisation.')

      // var x: any = this.BCV;
      // var y: any = this.linearCard.positionalpairs;
      // var l: any = this.Lang;


      // var data = { "bcv": x, "positional_pairs": y, "srclang": l, "trglang":"grk-ugnt" };
      // this.display = true;
      // this._http.post(this.ApiUrl.getnUpdateBCV, data, {
      //   headers: this.headers
      // })
      //   .subscribe(data => {
      //     let response: any = data;
      //     this.display = false;
      //     //console.log(response._body);
      //     if (response._body === 'Saved') {
      //       this.toastr.success('Updation has been done successfully.');
      //     }
      //   }, (error: Response) => {
      //     if (error.status === 400) {
      //       this.display = false;
      //       this.toastr.warning("Bad Request Error.")
      //     }
      //     else {
      //       this.display = false;
      //       this.toastr.error("An Unexpected Error Occured.")
      //     }

      //   })

    }
    else {
      this.toastr.error('You are not a registered User. Sign In to make changes.')
    }
  }
}
