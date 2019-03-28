import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GlobalUrl } from '../globalUrl';
import { Router } from '@angular/router';
import 'hammerjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  animal: string;
  name: string;

  navBarFlag: boolean = false;
  logoutFlag: boolean = false;
  bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;
  bcvParser = new this.bcv_parser;
  osisMat: any;
  role: any;
  username: any;

  constructor(private toastr: ToastrService, private ApiUrl: GlobalUrl, private _http: Http, public router: Router, public dialog: MatDialog) {
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
    this.toastr.toastrConfig.timeOut = 1200;
    this.createAuthorizationHeader(this.headers);
    if (localStorage.getItem('access-token')) {
      this.navBarFlag = true;
      this.logoutFlag = true;
    }

    this.bcvParser.set_options({ "book_alone_strategy": "include", "book_sequence_strategy": "include" });
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
    //console.log(playload)
    this.role = playload.role;
    this.username = playload.firstName;

    let dd = Number(playload.exp);
    // var timeDiff = Math.abs(new Date(dd * 1000).getTime() - new Date().getTime());
    // if (Math.ceil(timeDiff / (1000 * 3600 * 24)) > 1) {
    //   localStorage.setItem("access-token", '');
    //   this.role = "";
    //   this.username = "";
    //   // this.router.navigate(['../app-login']);
    //   this.router.navigate(['']);
    // }

    if(Date.now() / 1000 > dd){
      localStorage.setItem("access-token", '');
      location.reload();
      this.router.navigate(['../'])
    }

  }

  ngOnInit() {
    localStorage.setItem('language', "");
    localStorage.setItem('Targetlanguage', "");
  }

  title = 'app';

  home: any = "/app-bcv-search";
  csv: string = "/csv-to-table";
  wordview: string = "/wordview"
  textValue: string;
  headers = new Headers();

  searchBCV() {
    if (this.textValue) {
      var formData = new FormData();
      formData.append("reference", this.textValue);
      this._http.post(this.ApiUrl.getBcvSearch, formData)
        .subscribe(data => {
          let response: any = data;
          //this.display = false;
          //console.log(this.textValue);
          this.textValue = "";

         let bcv = String(response.json());
          let len = bcv.length;
          if(len == 7){
            bcv = "0" +  bcv;
          }

          this.router.navigate(['/app-bcv-search/' + bcv]);

        }, (error: Response) => {
          if (error.status === 400) {
            //this.display = false;
            //this.toastr.warning("Bad Request Error.")
          }
          else {
            //this.display = false;
            //this.toastr.error("An Unexpected Error Occured.")
          }

        })
    }
  }

  logout() {
    localStorage.getItem("access-token") ? localStorage.setItem("access-token", '') : localStorage.setItem("access-token", '');
    this.toastr.success('You are succesfully logged out')
    this.router.navigate(['../'])
    this.logoutFlag = false;
    this.role = "" ;
    this.username = "";

    const dialogLoginUpRef = this.dialog.open(LoginDialog, {
      data: {},
      disableClose: false
    });

    let instance = dialogLoginUpRef.componentInstance;
    instance.logoutInstanceFlag = false;
    instance.firstNameDialog = "" ;
    instance.role = "" ;

    dialogLoginUpRef.afterClosed().subscribe(result => {
      console.log('The logout dialog was closed');
      this.logoutFlag = instance.logoutInstanceFlag;
      this.role = instance.role;
      this.username = instance.firstNameDialog;
    });

    //location.reload();
  }

  // signin() {
  //   this.router.navigate(['../app-login'])
  // }

  signup() {
    this.router.navigate(['../app-register'])
  }

  do_parse() {
    var s = (<HTMLInputElement>document.getElementById("q")).value;
    var osises = this.bcvParser.parse(s).osis_and_indices();
    this.osisMat = osises;
  }


  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      data: { name: this.name, animal: this.animal },
      disableClose: false
    });

    let instance = dialogRef.componentInstance;
    instance.logoutInstanceFlag = false;
    instance.firstNameDialog = "" ;
    instance.role = "" ;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closedddd');
      this.logoutFlag = instance.logoutInstanceFlag;      
      this.role = instance.role;
      this.username = instance.firstNameDialog;
    });
  }

  openSignupDialog(): void {
    const signUpdialogRef = this.dialog.open(SignupDialog, {
      data: { name: this.name, animal: this.animal },
      disableClose: false
    });

    signUpdialogRef.afterClosed().subscribe(result => {
      console.log('The sign up dialog was closed');
    });
  }

  openResetDialog(): void {
    const resetdialogRef = this.dialog.open(resetDialog, {
      data: { name: this.name, animal: this.animal },
      disableClose: false
    });

    resetdialogRef.afterClosed().subscribe(result => {
      console.log('The reset dialog was closed');
    });
  }

}


@Component({
  selector: 'login-dialog',
  templateUrl: 'login.html',
})
export class LoginDialog implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  passwords = new FormControl('', [Validators.required, Validators.minLength(5)]);
  username: string;
  password: string;
  hide = true;
  display = false;
  home = '';
  headers = new Headers();
  role: any;
  logoutInstanceFlag:any;
  firstNameDialog:any;

  constructor(private API: GlobalUrl, public router: Router,
    private toastr: ToastrService, private _http: Http, private ApiUrl: GlobalUrl, public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {
    dialogRef.disableClose = false;
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
    //console.log("adsfasdf" + playload)
    this.role = playload.role;
    this.firstNameDialog = playload.firstName;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

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
            console.log("role is" + this.role)
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
            //location.reload();
            this.dialogRef.close();
            this.logoutInstanceFlag = true;
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

  newAccount() {

    this.dialogRef.close();


    const dialogSignUpRef = this.dialog.open(SignupDialog, {
      data: {},
      disableClose: false
    });

    dialogSignUpRef.afterClosed().subscribe(result => {
      console.log('The signup new account dialog was closed');
    });
  }

  resetClick() {

    this.dialogRef.close();

    const dialogResetRef = this.dialog.open(resetDialog, {
      data: {},
      disableClose: false
    });

    dialogResetRef.afterClosed().subscribe(result => {
      console.log('The reset click dialog was closed');
    });
  }

}


@Component({
  selector: 'signup-dialog',
  templateUrl: 'signup.html',
})
export class SignupDialog implements OnInit {

  username: string
  password: string
  confirmPassword: string
  firstname: string
  lastname: string
  hide = true;
  display = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  passwords = new FormControl('', [Validators.required, Validators.minLength(5)]);
  confirmPass = new FormControl('', [Validators.required]);
  firstnameValid = new FormControl('', [Validators.required]);
  home = '';

  constructor(private API: GlobalUrl, public router: Router,
    private toastr: ToastrService, private _http: Http, private ApiUrl: GlobalUrl, public dialogRef: MatDialogRef<SignupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {
    dialogRef.disableClose = false;
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  register() {

    if (this.email.errors == null && this.passwords.errors == null && this.confirmPass.errors == null && this.firstnameValid.errors == null) {

      if (this.password == this.confirmPassword) {

        // var data = new FormData();
        // data.append("email", this.username);
        // data.append("password", this.password);
        // data.append("firstName",this.firstname);
        // data.append("lastName",this.lastname?this.lastname:"");
        this.display = true;
        this._http.post(this.API.registration, { "email": this.username, "password": this.password, "firstName": this.firstname, "lastName": this.lastname ? this.lastname : "" })
          .subscribe(Response => {
            console.log(Response)
            if (Response.json().success == true) {
              this.display = false;
              this.toastr.success(Response.json().message)
              //this.router.navigate(['../app-login'])
              this.dialogRef.close();
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
      else if (this.confirmPass.errors != null) {
        this.toastr.error('Please enter confirm Password');
      }
      else if (this.firstnameValid.errors != null) {
        this.toastr.error('Please enter your first name')
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

  getErrorMessageForFirstName() {
    return this.firstnameValid.hasError('required') ? 'You must enter your first name' : '';
  }

  ngOnInit() {
  }

  alreadyClick() {

    this.dialogRef.close();


    const dialogloginRef = this.dialog.open(LoginDialog, {
      data: {},
      disableClose: false
    });

    // let instance = dialogloginRef.componentInstance;
    // instance.logoutInstanceFlag = false;
    // instance.firstNameDialog = "" ;
    // instance.role = "" ;

    dialogloginRef.afterClosed().subscribe(result => {
      console.log('The already click dialog was closed');
      console.log('The logout dialog was closed');
    });
  }
}


@Component({
  selector: 'reset-dialog',
  templateUrl: 'reset.html',
})
export class resetDialog implements OnInit {


  constructor(private API: GlobalUrl, public router: Router,
    private toastr: ToastrService, private _http: Http, private ApiUrl: GlobalUrl, public dialogRef: MatDialogRef<resetDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {
    dialogRef.disableClose = false;
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

  reset() {

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
            this.dialogRef.close();

            const dialogForgotRef = this.dialog.open(forgotDialog, {
              data: {  },
              disableClose: false
            });

            dialogForgotRef.afterClosed().subscribe(result => {
              console.log('The reset function dialog was closed');
            });          
            //this.router.navigate(['../forgotpassword'])
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
  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'forgot-dialog',
  templateUrl: 'forgot.html',
})
export class forgotDialog implements OnInit {

  constructor(private API: GlobalUrl, public router: Router,
    private toastr: ToastrService, private _http: Http, private ApiUrl: GlobalUrl, public dialogRef: MatDialogRef<forgotDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {
    dialogRef.disableClose = false;
    this.toastr.toastrConfig.positionClass = "toast-top-center"
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }
    
  passwords = new FormControl('', [Validators.required, Validators.minLength(5)]);
  password: string
  temppassword: string
  hide = true;
  display = false;
  home = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  forgot() {

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
            this.dialogRef.close();

            const dialogloginRef = this.dialog.open(LoginDialog, {
              data: {},
              disableClose: false
            });
        
            dialogloginRef.afterClosed().subscribe(result => {
              console.log('The forgot dialog was closed');
            });
            //this.router.navigate(['../app-login'])
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
