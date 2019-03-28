import { Component, OnInit } from '@angular/core';
import { Http, ResponseType } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import {GlobalUrl} from '../globalUrl'

@Component({
  selector: 'resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private toastr: ToastrService, private _http: Http,private route: ActivatedRoute,private API:GlobalUrl,
    private router: Router) {
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  display = false;
  username: string;
  home = '';

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  login() {

    if (this.email.errors == null) {
      var data = new FormData();
      data.append("email", this.username);
      this.display = true;
      this._http.post(this.API.resetPassword, data)
        .subscribe(Response => {
        //console.log(Response.json())
          if (Response.json().success) {
            this.display = false;
            this.toastr.success(Response.json().message)
            this.router.navigate(['../forgotpassword'])
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
      if (this.email.errors == null) {
        this.toastr.error('Please enter valid Password');
      }
      //alert(this.email.errors)
    }
  }

}
