import { Component, OnInit } from '@angular/core';
import {Http, ResponseType} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {FormControl, Validators} from '@angular/forms';
import {GlobalUrl} from '../globalUrl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService,private _http:Http,private route: ActivatedRoute,
    private router: Router,private API:GlobalUrl) {
      this.toastr.toastrConfig.positionClass = "toast-top-center"
      this.toastr.toastrConfig.closeButton = true;
      this.toastr.toastrConfig.progressBar = true;
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  passwords = new FormControl('', [Validators.required, Validators.minLength(5)]);
  username : string
  password : string
  hide = true;
  display= false;
  home = '';
  
  login(){

    if(this.email.errors == null && this.passwords.errors == null){ 
          var data = new FormData();
          data.append("email", this.username);
          data.append("password", this.password );
        this.display = true;
        this._http.post(this.API.auth,data)
        .subscribe(Response => 
          {
            console.log(Response.json())
            if(Response.json().access_token){
              this.display = false;
               this.toastr.success('YOU ARE SUCCESSFULLY LOGGED IN...')
               this.router.navigate(['../app-bcv-search'])
               localStorage.setItem("access-token",Response.json().access_token);
              }
              else{
                this.display = false;
                this.toastr.error(Response.json().message)
              }
              this.display = false;              
          }
      )
    }
    else {
      if(this.email.errors != null && this.passwords.errors != null)
      {
        this.toastr.error('Please enter valid email id and password');
      }
      else if (this.email.errors != null && this.passwords.errors == null){
        this.toastr.error('Please enter valid email id');
      }
      else if (this.email.errors == null && this.passwords.errors != null){
        this.toastr.error('Please enter valid Password');
      }
    }
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getErrorMessageForPassword(){
    return this.passwords.hasError('required') ? 'You must enter a value' :
    this.passwords.hasError('minlength') ? 'Password length should be mininum 5' :
        '';    
  }


  ngOnInit() {      
           localStorage.getItem("access-token")?this.router.navigate(['../app-bcv-search']):'';
  }

}

