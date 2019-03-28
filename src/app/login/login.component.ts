import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http, ResponseType, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { GlobalUrl } from '../globalUrl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService, private _http: Http, private route: ActivatedRoute,
    private router: Router, private API: GlobalUrl) {
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
    
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
    //console.log("adsfasdf" + playload)
    this.role = playload.role;
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  passwords = new FormControl('', [Validators.required, Validators.minLength(5)]);
  username: string
  password: string
  hide = true;
  display = false;
  home = '';
  headers = new Headers();
  role: any;
  //route:string = "../"

  // login() : void {
  //   if(this.username == 'admin' && this.password == 'admin'){
  //    this.router.navigate(["user"]);
  //   }else {
  //     alert("Invalid credentials");
  //   }
  // }

  login() {

    if (this.email.errors == null && this.passwords.errors == null) {
      // var data = new FormData();
      // data.append("email", this.username);
      // data.append("password", this.password );
      this.display = true;
      this._http.post(this.API.auth, { "email": this.username, "password": this.password })
        .subscribe(Response => {
          // console.log(Response.json().access_token)
          if (Response.json().access_token) {
            this.display = false;
            this.toastr.success('YOU ARE SUCCESSFULLY LOGGED IN...')
            localStorage.setItem("access-token", Response.json().access_token);
            this.createAuthorizationHeader(this.headers);
            console.log("role is"+ this.role)
            if (this.role == 1) {
              this.router.navigate(['/UserDashboard'])
            }
            else if (this.role == 2) {
              this.router.navigate(['/AdminDashboard'])
            }
            else if (this.role == 3) {
              this.router.navigate(['/reports'])
            }
            else {
              this.router.navigate(['/app-bcv-search'])
            }
            location.reload();
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
      // console.log(this.email.errors)
      // if(this.email.errors)
      //if(this.email.errors )
      if (this.email.errors != null && this.passwords.errors != null) {
        this.toastr.error('Please enter valid email id and password');
      }
      else if (this.email.errors != null && this.passwords.errors == null) {
        this.toastr.error('Please enter valid email id');
      }
      else if (this.email.errors == null && this.passwords.errors != null) {
        this.toastr.error('Please enter valid Password');
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


  ngOnInit() {
    localStorage.getItem("access-token") ? this.router.navigate(['../app-bcv-search']) : '';
  }

}
