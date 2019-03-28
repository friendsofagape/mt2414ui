import { Component,OnInit} from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { GlobalUrl } from './globalUrl';
import { Router } from '@angular/router';
import 'hammerjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //navBarFlag:boolean = false;

  constructor(private toastr: ToastrService,private ApiUrl: GlobalUrl, private _http: Http, public router: Router) {
    // this.createAuthorizationHeader(this.headers);
    // this.toastr.toastrConfig.positionClass = "toast-top-center"
    // this.toastr.toastrConfig.closeButton = true;
    // this.toastr.toastrConfig.progressBar = true;
    // this.toastr.toastrConfig.timeOut = 1200;
    // if(localStorage.getItem('access-token')){
    //   this.navBarFlag = true;
    // }
  }

  ngOnInit() {  }

  // createAuthorizationHeader(headers: Headers) {
  //   headers.append('Authorization', 'bearer ' +
  //     localStorage.getItem("access-token"));
  // }

  // title = 'app';

  // home: any = "app-bcv-search";
  // csv: string = "csv-to-table";
  // textValue: string;
  // headers = new Headers();

  // searchBCV() {
  //   if (this.textValue) {
  //     var formData = new FormData();
  //     formData.append("reference", this.textValue);
  //     this._http.post(this.ApiUrl.getBcvSearch, formData,{
  //           headers: this.headers
  //         })
  //       .subscribe(data => {
  //         let response: any = data;
  //         //this.display = false;
  //         //console.log(this.textValue);
  //         this.textValue = "";
  //         this.router.navigate(['/app-bcv-search/' + response.json()]);

  //       }, (error: Response) => {
  //         if (error.status === 400) {
  //           //this.display = false;
  //           //this.toastr.warning("Bad Request Error.")
  //         }
  //         else {
  //           //this.display = false;
  //           //this.toastr.error("An Unexpected Error Occured.")
  //         }

  //       })
  //   }
  // }

  // logout(){
  //    console.log('hey yaa')
  //    localStorage.getItem("access-token")?localStorage.setItem("access-token",''):localStorage.setItem("access-token",'');
  //    this.toastr.success('You are succesfully logged out')
  //    this.router.navigate(['../app-login'])
  // }

}
