import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { GlobalUrl } from '../globalUrl';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private toastr: ToastrService, private _http: Http,
    private router: Router, private API: GlobalUrl) {
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

  username: string
  password: string
  confirmPassword: string
  hide = true;
  display = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  passwords = new FormControl('', [Validators.required, Validators.minLength(5)]);
  confirmPass = new FormControl('', [Validators.required]);
  home = '';

  register() {

    if (this.email.errors == null && this.passwords.errors == null && this.confirmPass.errors == null) {

      if (this.password == this.confirmPassword) {

        var data = new FormData();
        data.append("email", this.username);
        data.append("password", this.password);
        this.display = true;
        this._http.post(this.API.registration, data)
          .subscribe(Response => {
           // console.log(Response)
            if (Response.json().success == true) {
              this.display = false;
              this.toastr.success(Response.json().message)
              this.router.navigate(['../login'])
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
        this.toastr.error('Password & Confirm Password does not match.');
      }
    }
    else {
      if (this.email.errors != null && this.passwords.errors != null) {
        this.toastr.error('Please enter valid email id and password');
      }
      else if (this.email.errors != null && this.passwords.errors == null) {
        this.toastr.error('Please enter valid email id');
      }
      else if (this.email.errors == null && this.passwords.errors != null) {
        this.toastr.error('Please enter valid Password');
      }
      else if (this.confirmPass.errors != null) {
        this.toastr.error('Please enter confirm Password');
      }
      //alert(this.email.errors)
    }
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorMessageForPassword() {
    return this.passwords.hasError('required') ? 'You must enter a value' :
      this.passwords.hasError('minlength') ? 'Password length should be mininum 5' :
        '';
  }

  getErrorMessageForConfirmPassword() {
    return this.confirmPass.hasError('required') ? 'You must enter a value' : '';
  }

  ngOnInit() {
  }

}
