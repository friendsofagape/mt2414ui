import { Component, OnInit } from '@angular/core';
import { GlobalUrl } from '../globalUrl';
import { Http, ResponseType, Response, Headers } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-requestorganisation',
  templateUrl: './requestorganisation.component.html',
  styleUrls: ['./requestorganisation.component.css']
})
export class RequestorganisationComponent implements OnInit {

  name: any;
  address: any;
  email: any;
  concode: any;
  phone: any;
  display: any = false;
  headers = new Headers();

  constructor(public router: Router, private toastr: ToastrService, private _http: Http, private API: GlobalUrl) {
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
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
  }

  submit() {


    this.decodeToken(String(JSON.parse(JSON.stringify(this.headers)).Authorization));

    this.display = true;
    this._http.post(this.API.requestOrganization, { "organisation_name": this.name, "address": this.address, "email": this.email, "country_code": this.concode, "phone": this.phone }, {
      headers: this.headers
    })
      .subscribe(Response => {
        //console.log(Response.json())
        if (Response.json().success == true) {
          this.display = false;
          this.toastr.success('Request Sent to admin.')
        }
        else {
          this.display = false;
          this.toastr.error(Response.json().message)
        }
        this.display = false;
      }
      )

  }

}
