import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalUrl } from './globalUrl';
import { Router } from '@angular/router';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private ApiUrl: GlobalUrl, private _http: Http, public router: Router) {
  }

  title = 'app';

  home: any = "app-bcv-search";
  csv: string = "csv-to-table";
  textValue: string;

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
          this.router.navigate(['/app-bcv-search/' + response.json()]);

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

}
