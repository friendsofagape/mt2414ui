import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { GlobalUrl } from '../globalUrl'
import { NumberToStringPipe } from '../number-to-string.pipe';

@Component({
  selector: 'strongpage',
  templateUrl: './strongpage.component.html',
  styleUrls: ['./strongpage.component.css']
})
export class StrongpageComponent implements OnInit {

  strongNo: any;
  display = false;
  apiData: any;
  lexicon: any;
  definition: any;
  pronunciation: any;
  sourceword: any;
  strongs: any;
  lang: any;
  trglang:any;
  targetword: any;
  transliteration: any;
  objlen: Number;
  objLenArr: any = [];
  objCountArr: any = [];
  objLangWordArr: any = [];
  objBcvCheckArr: any = [];
  objBcvCheckPos: any = [];
  objBcvUncheckArr: any = [];
  objBcvUncheckPos: any = [];
  checkedCount: any = [];
  uncheckedCount: any = [];
  headers = new Headers();


  bookno: any = {
    "01": "GEN", "02": "EXO", "03": "LEV", "04": "NUM", "05": "DEU", "06": "JOS",
    "07": "JDG", "08": "RUT", "09": '1SA', "10": "2SA", "11": "1KI", "12": "2KI",
    "13": "1CH", "14": "2CH", "15": "EZR", "16": "NEH", "17": "EST", "18": "JOB", "19": "PSA",
    "20": "PRO", "21": "ECC", "22": "SNG", "23": "ISA", "24": "JER", "25": "LAM", "26": "EZK",
    "27": "DAN", "28": "HOS", "29": "JOL", "30": "AMO", "31": "OBA", "32": "JON", "33": "MIC",
    "34": "NAM", "35": "HAB", "36": "ZEP", "37": "HAG", "38": "ZEC", "39": "MAL",
    "40": "MAT", "41": "MRK", "42": "LUK", "43": "JHN", "44": "ACT", "45": "ROM",
    "46": "1CO", "47": "2CO", "48": "GAL", "49": "EPH", "50": "PHP", "51": "COL", "52": "1TH",
    "53": "2TH", "54": "1TI", "55": "2TI", "56": "TIT", "57": "PHM", "58": "HEB", "59": "JAS",
    "60": "1PE", "61": "2PE", "62": "1JN", "63": "2JN", "64": "3JN", "65": "JUD", "66": "REV"
  };

  constructor(private toastr: ToastrService, private ApiUrl: GlobalUrl, private _http: Http, public router: Router, private activatedRoute: ActivatedRoute) {
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
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['Strong'] && params['Lang'] && params['TrgLang']) {
        this.strongNo = params['Strong'];
        this.lang = params['Lang'];
        this.trglang = params['TrgLang'];
      }

    });

    this._http.get(this.ApiUrl.strongslist + '/' + this.lang + '/' + this.trglang + "/" + this.strongNo)
      .subscribe(data => {
        this.display = true;
        this.apiData = data.json();
        this.objlen = Object.keys(this.apiData).length;
        this.createObjArr();
        // console.log(Object.keys(this.apiData).length)
        //console.log((Object.keys(this.apiData)))
        //  console.log((Object.values(this.apiData)[0]))
        //console.log(this.apiData)
        this.display = false;
      }, (error: Response) => {
        if (error.status === 404) {
          this.toastr.warning("Strongs data not available")
        }
        else {
          this.toastr.error("An Unexpected Error Occured.")
        }

      })

    this._http.get(this.ApiUrl.strongLexicon + '/' + this.strongNo)
      .subscribe(data => {
        this.display = true;
        this.lexicon = data.json();
        this.definition = Object.values(this.lexicon)[0];
        this.pronunciation = Object.values(this.lexicon)[1];
        this.sourceword = Object.values(this.lexicon)[2];
        this.targetword = Object.values(this.lexicon)[4];
        this.transliteration = Object.values(this.lexicon)[5];
        // this.apiData = data.json();
        // this.objlen = Object.keys(this.apiData).length;
        // this.createObjArr();
        // console.log(Object.keys(this.apiData).length)
        //console.log((Object.keys(this.apiData)))
        //  console.log((Object.values(this.apiData)[0]))
        //console.log(this.lexicon)
        this.display = false;
      }, (error: Response) => {
        if (error.status === 404) {
          this.toastr.warning("Lexicon data not available")
        }
        else {
          this.toastr.error("An Unexpected Error Occured.")
        }

      })
  }

  createObjArr() {
    for (let i = 0; i < this.objlen; i++) {
      this.objLenArr.push(i);
      this.objCountArr.push(Object.values(this.apiData)[i]["count"]);
      this.objLangWordArr.push(Object.keys(this.apiData)[i]);
      this.checkedCount.push(Object.values(this.apiData)[i]["checkedCount"]);
      this.uncheckedCount.push(Object.values(this.apiData)[i]["uncheckedCount"]);

      if (((Object.values(this.apiData)[i]["references"])["unchecked"])) {
        this.objBcvUncheckArr.push(((Object.values(this.apiData)[i]["references"])["unchecked"])["bcv"]);

        this.objBcvUncheckPos.push(((Object.values(this.apiData)[i]["references"])["unchecked"])["positionalPairs"]);
      }

      if (((Object.values(this.apiData)[i]["references"])["checked"])) {
        //console.log(((Object.values(this.apiData)[i]["references"])["checked"])["bcv"])
        this.objBcvCheckArr.push(((Object.values(this.apiData)[i]["references"])["checked"])["bcv"]);

        this.objBcvCheckPos.push(((Object.values(this.apiData)[i]["references"])["checked"])["positionalPairs"]);
      }

      if (((Object.values(this.apiData)[i]["references"])["unchecked"]) && !((Object.values(this.apiData)[i]["references"])["checked"])) {

        this.objBcvCheckArr.push("");

        this.objBcvCheckPos.push("");
      }

      if (!((Object.values(this.apiData)[i]["references"])["unchecked"]) && ((Object.values(this.apiData)[i]["references"])["checked"])) {

        this.objBcvUncheckArr.push("");

        this.objBcvUncheckPos.push("");
      }


    }
    //console.log(this.objBcvCheckArr)
  }

  Checked(word, ind) {
    let param ={};
    for(let i=0;i < this.objBcvUncheckPos[ind].length; i ++){
      param[this.objBcvUncheckArr[ind][i]] =  this.objBcvUncheckPos[ind][i];
    }

    //console.log(param);
    // console.log((((Object.values(this.apiData)[ind]["references"])["unchecked"])["positionalPairs"]).length)
    // console.log((((Object.values(this.apiData)[ind]["references"])["unchecked"])["bcv"]).length)

    var data = { "srclang": this.lang, "trglang": this.trglang, "strongs": this.strongNo, "word": word, "status": "0", "positionData": param };
    this.display = true;
    this._http.post(this.ApiUrl.strongslist, data, {
      headers: this.headers
    })
      .subscribe(data => {
        let response: any = data.json();

        console.log(response.success);
        if (response.success === true) {
          this.toastr.success('Word has been checked successfully.');
          this.filterData(ind, 'check');
          this.display = false;
          //console.log(this.uncheckedCount)
          //this.router.navigate(['../strong/:Strong/:Lang'])
        }
      }, (error: Response) => {
        if (error.status === 400) {
          this.display = false;
          this.toastr.warning("Bad Request Error.")
        }
        else if (error.status === 401) {
          this.display = false;
          this.toastr.warning("Authentication Failed")
        }
        else {
          this.display = false;
          this.toastr.error("An Unexpected Error Occured.")
        }

      })
  }

  Unchecked(word, ind) {
    let param ={};
    for(let i=0;i < this.objBcvCheckPos[ind].length; i ++){
      param[this.objBcvCheckArr[ind][i]] =  this.objBcvCheckPos[ind][i];
    }

    var data = { "srclang": this.lang, "trglang": this.trglang, "strongs": this.strongNo, "word": word, "status": "1","positionData": param  };
    this.display = true;
    this._http.post(this.ApiUrl.strongslist, data, {
      headers: this.headers
    })
      .subscribe(data => {
        let response: any = data.json();

        console.log(response.success);
        if (response.success === true) {
          this.toastr.success('Word has been Unchecked successfully.');
          this.filterData(ind, 'uncheck');
          this.display = false;
          //console.log(this.uncheckedCount)
          //this.router.navigate(['../strong/:Strong/:Lang'])
        }
      }, (error: Response) => {
        if (error.status === 400) {
          this.display = false;
          this.toastr.warning("Bad Request Error.")
        }
        else if (error.status === 401) {
          this.display = false;
          this.toastr.warning("Authentication Failed")
        }
        else {
          this.display = false;
          this.toastr.error("An Unexpected Error Occured.")
        }

      })
  }

  filterData(ind, flag) {
    // console.log("before check Bcv" + this.objBcvCheckArr)
    // console.log("check pos" + this.objBcvCheckPos)
    // console.log("uncheck bcv" + this.objBcvUncheckArr)
    // console.log("before uncheck pos" + this.objBcvUncheckPos)

    // console.log('before')
    // console.log(((Object.values(this.apiData)[ind]["references"])["checked"]))
    // console.log(((Object.values(this.apiData)[ind]["references"])["unchecked"]))

    if (flag == 'check') {
      this.checkedCount[ind] = (Object.values(this.apiData)[ind]["checkedCount"]) + (Object.values(this.apiData)[ind]["uncheckedCount"]);
      this.uncheckedCount[ind] = 0;

      // console.log(this.objBcvCheckArr[ind])
      // console.log(this.objBcvCheckArr[ind])

      if (((Object.values(this.apiData)[ind]["references"])["unchecked"])) {
        this.objBcvCheckArr[ind] = (((Object.values(this.apiData)[ind]["references"])["unchecked"])["bcv"]);

        this.objBcvCheckPos[ind] = (((Object.values(this.apiData)[ind]["references"])["unchecked"])["positionalPairs"]);
      }

      if (((Object.values(this.apiData)[ind]["references"])["checked"])) {
        this.objBcvUncheckArr[ind] = "";

        this.objBcvUncheckPos[ind] = "";
      }
    }

    else if (flag == 'uncheck') {
      this.uncheckedCount[ind] = (Object.values(this.apiData)[ind]["checkedCount"]) + (Object.values(this.apiData)[ind]["uncheckedCount"]);
      this.checkedCount[ind] = 0;

      // console.log(this.objBcvCheckArr[ind])
      // console.log(this.objBcvCheckArr[ind])

      if (((Object.values(this.apiData)[ind]["references"])["checked"])) {
        this.objBcvUncheckArr[ind] = (((Object.values(this.apiData)[ind]["references"])["checked"])["bcv"]);

        this.objBcvUncheckPos[ind] = (((Object.values(this.apiData)[ind]["references"])["checked"])["positionalPairs"]);
      }

      if (((Object.values(this.apiData)[ind]["references"])["unchecked"])) {
        this.objBcvCheckArr[ind] = "";

        this.objBcvCheckPos[ind] = "";
      }
    }
    // console.log("after check Bcv" + this.objBcvCheckArr)
    // console.log("check pos" + this.objBcvCheckPos)
    // console.log("uncheck bcv" + this.objBcvUncheckArr)
    // console.log("after uncheck pos" + this.objBcvUncheckPos)

    // console.log('after')
    // console.log(((Object.values(this.apiData)[ind]["references"])["checked"]))
    // console.log(((Object.values(this.apiData)[ind]["references"])["unchecked"]))

  }

}
