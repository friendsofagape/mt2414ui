import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GlobalUrl } from '../globalUrl';
import { Router } from '@angular/router';
import 'hammerjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navBarFlag: boolean = true;
  logoutFlag: boolean = false;

  constructor(private toastr: ToastrService, private ApiUrl: GlobalUrl, private _http: Http, public router: Router) {
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
    this.toastr.toastrConfig.timeOut = 1200;
    if (localStorage.getItem('access-token')) {
      this.navBarFlag = true;
      this.logoutFlag = true;
    }
  }

  ngOnInit() { }

  title = 'app';

  home: any = "/bcv";
  csv: string = "/TranslationWords";
  textValue: string;
  headers = new Headers();

  searchBCV() {
    if (this.textValue) {
      var formData = new FormData();
      formData.append("reference", this.textValue);
      this._http.post(this.ApiUrl.getBcvSearch, formData)
        .subscribe(data => {
          let response: any = data;
          this.textValue = "";
          this.router.navigate(['/bcv/' + response.json()]);

        }, (error: Response) => {
          if (error.status === 400) {
          }
          else {
          }

        })
    }
  }

  logout() {
    localStorage.getItem("access-token") ? localStorage.setItem("access-token", '') : localStorage.setItem("access-token", ''); 
    this.toastr.success('You are succesfully logged out')
    this.router.navigate(['../login'])
  }

  signin() {
    this.router.navigate(['../login'])
  }

  signup() {
    this.router.navigate(['../register'])
  }

}

