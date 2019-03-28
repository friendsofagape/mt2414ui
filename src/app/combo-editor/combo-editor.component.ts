import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http ,Headers} from '@angular/http';
import { GlobalUrl } from '../globalUrl';

@Component({
  selector: 'app-combo-editor',
  templateUrl: './combo-editor.component.html',
  styleUrls: ['./combo-editor.component.css']
})
export class ComboEditorComponent implements OnInit {

  BCV: any;
  strong: any;
  hindi: any;
  linearCard: any;
  sourcetext;
  targettext;
  englishword;
  englishSourceArray = new Array();
  display: boolean;
  constructor(private activatedRoute: ActivatedRoute, private _http: Http, private ApiUrl: GlobalUrl) { }
  // headers = new Headers();
  // guestUser = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZXJva3VAeW9wbWFpbC5jb20iLCJleHAiOjE1MzgxNjIwMTgsInJvbGUiOiJtZW1iZXIifQ.diVbmG_9TqRvgNIWKsnfrbgWUoqJxtWCc_HVVoFjMac";

  ngOnInit() {
    // this.createAuthorizationHeader(this.headers);
    this.activatedRoute.params.subscribe((params: Params) => {

      if (params['BCV'] && params['Strong'] && params['Hindi']) {
        this.BCV = params['BCV'];
        this.strong = params['Strong'];
        this.hindi = params['Hindi'];
        var x: any = this.BCV;
        var l: any = 'grkhin'; //this.Lang;
        //console.log(x)

        this.display = true;
        this._http.get(this.ApiUrl.getnUpdateBCV + '/' + x + '/' + l)
          .subscribe(data => {

            this.linearCard = data.json();
            //console.log(data.json())
            this.sourcetext = this.linearCard.sourcetext;
            this.targettext = this.linearCard.targettext;
            this.englishword = this.linearCard.englishword;

            if (this.sourcetext.length == this.englishword.length) {

              for (let i = 0; i < this.sourcetext.length; i++) {
                this.englishSourceArray.push(this.englishword[i] + '<' + this.sourcetext[i] + '>');
              }
            }
            //console.log('G' + params['Strong'] + '0')

            //let response: any = data;
            this.display = false;
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


  // createAuthorizationHeader(headers: Headers) {
  //     if(localStorage.getItem("access-token")){
  //       headers.append('Authorization', 'bearer ' +
  //         localStorage.getItem("access-token")); 
  //       }
  //       else{
  //         headers.append('Authorization', 'bearer ' + this.guestUser);
  //       }
  // }

  ngAfterViewChecked() {
    //console.log('G' + this.strong + '0')
    if (document.getElementById('G' + this.strong + '0') && document.getElementById(this.hindi) ) {
      document.getElementById('G' + this.strong + '0').style.color = 'blue';
      document.getElementById(this.hindi).style.color = 'blue';
    }
  }


}
