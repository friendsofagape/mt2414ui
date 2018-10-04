import { Component, OnInit } from '@angular/core';
import { Http, ResponseType } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { GlobalUrl } from '../globalUrl';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  passwords = new FormControl('', [Validators.required, Validators.minLength(5)]);
  password: string
  temppassword: string
  hide = true;
  display = false;
  home = '';

  constructor(private toastr: ToastrService, private _http: Http, private route: ActivatedRoute,
    private router: Router, private API: GlobalUrl) {
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

  ngOnInit() {
  }

  login() {

    if (this.passwords.errors == null) {
      var data = new FormData();
      data.append("temp_password", this.temppassword);
      data.append("password", this.password);
      this.display = true;
      this._http.post(this.API.forgotPassword, data)
        .subscribe(Response => {
          //console.log(Response.json())
          if (Response.json().success) {
            this.display = false;
            this.toastr.success(Response.json().message)
            this.router.navigate(['../app-login'])
          }
          else {
            this.display = false;
            this.toastr.error(Response.json().message)
          }
          this.display = false;
        }
        )
    }
    else {

      if (this.passwords.errors == null) {
        this.toastr.error('Please enter valid password');
      }
    }
  }

  getErrorMessageForPassword(){
    return this.passwords.hasError('required') ? 'You must enter a value' :
    this.passwords.hasError('minlength') ? 'Password length should be mininum 5' :
        '';    
  }

}
