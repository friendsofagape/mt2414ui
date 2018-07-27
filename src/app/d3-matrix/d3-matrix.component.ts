import { Component, ElementRef, NgZone, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import {
    D3Service,
    D3,
    Axis,
    BrushBehavior,
    BrushSelection,
    D3BrushEvent,
    ScaleLinear,
    ScaleOrdinal,
    Selection,
    Transition
} from 'd3-ng2-service';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { AlignerService } from '../aligner.service';
import { promise } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { GlobalUrl } from '../globalUrl';
import { HorizontalAlign } from '../horizontalAlign';
import { getHostElement } from '@angular/core/src/render3';
import { stringify } from '@angular/compiler/src/util';
import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: 'app-d3-matrix',
    templateUrl: './d3-matrix.component.html',
    styleUrls: ['./d3-matrix.component.css']
})
export class D3MatrixComponent implements OnInit, OnChanges {

    private display = false;
    private d3: D3;
    private serviceResult: any;
    private positionalPairOfApi: any;
    private rawPos: any;
    private indPair = new Array();
    private saveButtonFlag: boolean = true;
    private lexiconData: string;
    private greekPopUp: string[];
    @Input() BCV: any;
    @Input() BOOKNAME: any;
    private Statuses = new Array();
    private Interlinear = "Interlinear";
    private verticalORgrid = "Display Bilinear";
    private gridDataJson: any;

    constructor(private ApiUrl: GlobalUrl, private toastr: ToastrService, element: ElementRef, private ngZone: NgZone, d3Service: D3Service, private service: AlignerService, private _http: Http) {
        this.d3 = d3Service.getD3();
        this.toastr.toastrConfig.positionClass = "toast-top-center"
        this.toastr.toastrConfig.closeButton = true;
        this.toastr.toastrConfig.progressBar = true;
        this.toastr.toastrConfig.timeOut= 1200;

    }


    gridData(d: any, rawPoss: any) {
        var xpos = 100;
        var ypos = 100;
        var width = 25;
        var height = 25;
        var filled;

        var rawpossCount = rawPoss.length;
        for (let index = 0; index < rawpossCount; index++) {
            let rowPossseparatedPair = rawPoss[index].split('-');
            if (rowPossseparatedPair.length === 2) {

                if (Number(rowPossseparatedPair[0]) === 255) {
                    rowPossseparatedPair[0] = 0;
                }

                if (Number(rowPossseparatedPair[1]) === 255) {
                    rowPossseparatedPair[1] = 0;
                }
            }
            rawPoss[index] = rowPossseparatedPair[0] + "-" + rowPossseparatedPair[1];
        }

        this.positionalPairOfApi = d.positionalpairs;
        var positionalPairCount = d.positionalpairs.length;
        let positionalPairOfApiDemo = d.positionalpairs;
        for (let index = 0; index < positionalPairCount; index++) {
            let separatedPair = positionalPairOfApiDemo[index].split('-');
            if (separatedPair.length === 2) {


                if (Number(separatedPair[0]) === 0) {
                    separatedPair[0] = 100;
                }

                if (Number(separatedPair[0]) === 255) {
                    separatedPair[0] = 0;
                }
 
                if (Number(separatedPair[1]) === 0) {
                    separatedPair[1] = 100;
                }

                if (Number(separatedPair[1]) === 255) {
                    separatedPair[1] = 0;
                }


            }
            positionalPairOfApiDemo[index] = separatedPair[0] + "-" + separatedPair[1];
        }

        d.greek.unshift('NULL');
        d.englishword.unshift('NULL');
        let greekHorizontalWords = d.englishword;
        let greekHorizontalWord = d.greek;
        d.hinditext.unshift('NULL');
        let hindiVerticalWords = d.hinditext;
        let colorCode = d.colorcode;

        var data = new Array();
        var rowcount = hindiVerticalWords.length;
        var columncount = greekHorizontalWords.length;
        for (var row = 0; row < rowcount; row++) {
            data.push(new Array());
            for (var column = 0; column < columncount; column++) {
                data[row].push({
                    x: xpos,
                    y: ypos,
                    width: width,
                    height: height,
                    filled: filled,
                    positionalPair: row + "-" + column,// column + "-" + row ,
                    positionalPairOfApi: this.positionalPairOfApi,
                    greekHorizontalWords: greekHorizontalWords,
                    greekHorizontalWord: greekHorizontalWord,
                    hindiVerticalWords: hindiVerticalWords,
                    colorCode:colorCode,
                    greekIndexWise: greekHorizontalWords[column] + column + 'column',
                    hindiIndexWise: hindiVerticalWords[row] + row + 'row',
                    rawPosss: rawPoss,
                    saveButtonFlag: this.saveButtonFlag
                })
                xpos += width;

            }
            xpos = 100;
            ypos += height;

        }

        return data;
    }

    saveOnClick() {

        document.getElementById("grid").innerHTML = "";
        var x: any = this.BCV;
        var y: any = this.positionalPairOfApi;

        var z: number = y.length;

        for (let index = 0; index < z; index++) {
            let separatedPair = y[index].split('-');
            if (separatedPair.length === 2) {

                if (Number(separatedPair[0]) === 0) {
                    separatedPair[0] = 255;
                }

                if (Number(separatedPair[0]) === 100) {
                    separatedPair[0] = 0;
                }

                if (Number(separatedPair[1]) === 0) {
                    separatedPair[1] = 255;
                }

                if (Number(separatedPair[1]) === 100) {
                    separatedPair[1] = 0;
                }
            }
            y[index] = separatedPair[0] + "-" + separatedPair[1];
        }
        var data = { "bcv": x, "positional_pairs": y };
        this.display = true;
        this._http.post(this.ApiUrl.getnUpdateBCV, data)
            .subscribe(data => {
                let response: any = data;
                this.display = false;
                //console.log(response._body);
                if (response._body === 'Saved') {
                    this.toastr.success('Updation has been done successfully.');
                    this.gridBind();
                }
            }, (error: Response) => {
                if (error.status === 400) {
                    this.display = false;
                    this.toastr.warning("Bad Request Error.")                    
                }
                else {
                    this.display = false;
                    this.toastr.error("An Unexpected Error Occured.")
                }

            })

        document.getElementById('saveButton').style.display = 'none';
        document.getElementById("appButton").style.display = "";
        //document.getElementById('discardButton').style.display = 'none';
        
        localStorage.setItem("lastAlignments", this.rawPos);
        // console.log(this.positionalPairOfApi)
        // console.log(this.rawPos)
    }

    approveOnClick() {
        var x: any = this.BCV;
        var y: any = this.indPair;
        //console.log(x,y)

        var data = { "bcv": x, "positional_pairs": y };
        this.display = true;
        this._http.post(this.ApiUrl.approveAlignments, data)
            .subscribe(data => {
                let response: any = data;
                this.display = false;
                //console.log(response._body);
                if (response._body === 'Saved') {
                    this.toastr.success('New alignments have been approved successfully.');
                }
            }, (error: Response) => {
                if (error.status === 400) {
                    this.display = false;
                    this.toastr.warning("Bad Request Error.")
                }
                else {
                    this.display = false;
                    this.toastr.error("An Unexpected Error Occured.")
                }

            })
        document.getElementById("appButton").style.display = 'none';
        document.getElementById('discardButton').style.display = 'none';
        this.indPair = [];

    }

    fixOnClick() {
        document.getElementById("grid").innerHTML = "";
        var x: any = this.BCV;
        //console.log(x)

        var data = { "bcv": x };
        this.display = true;
        this._http.post(this.ApiUrl.fixAlignments, data)
            .subscribe(data => {
                //let response: any = data;
                this.display = false;
                //console.log(response._body);
                //if (response._body === 'Saved') {                    
                    this.toastr.success('Feedback alignment have been updated successfully.');
                    this.generateVisual(data);
                    document.getElementById('discardButton').style.display = '';
                    document.getElementById("saveButton").style.display = ""; 
                    document.getElementById("appButton").style.display = 'none';
                    localStorage.setItem("lastAlignments", this.positionalPairOfApi);
                    // console.log(this.positionalPairOfApi)
                    // console.log(this.rawPos)           
                //}
            }, (error: Response) => {
                if (error.status === 400) {
                    this.display = false;
                    this.toastr.warning("Bad Request Error.")
                }
                else {
                    this.display = false;
                    this.toastr.error("An Unexpected Error Occured.")
                }

            })
    }

    discardOnClick() {
        document.getElementById("grid").innerHTML = "";
        if(localStorage.getItem("lastAlignments") !== "")
        {
        var x: any = this.BCV;
        var y: any =  localStorage.getItem("lastAlignments").split(',');
        //var y: any = this.positionalPairOfApi;

        var z: number = y.length;

        for (let index = 0; index < z; index++) {
            let separatedPair = y[index].split('-');
            if (separatedPair.length === 2) {

                if (Number(separatedPair[0]) === 0) {
                    separatedPair[0] = 255;
                }

                if (Number(separatedPair[0]) === 100) {
                    separatedPair[0] = 0;
                }

                if (Number(separatedPair[1]) === 0) {
                    separatedPair[1] = 255;
                }

                if (Number(separatedPair[1]) === 100) {
                    separatedPair[1] = 0;
                }
            }
            y[index] = separatedPair[0] + "-" + separatedPair[1];
        }
        var data = { "bcv": x, "positional_pairs": y };
        this.display = true;
        this._http.post(this.ApiUrl.getnUpdateBCV, data)
            .subscribe(data => {
                let response: any = data;
                this.display = false;
                //console.log(response._body);
                if (response._body === 'Saved') {
                    this.toastr.success('Discarded the changes successfully.');
                    this.gridBind(); 
                    localStorage.setItem("lastAlignments", "");
                }
            }, (error: Response) => {
                if (error.status === 400) {
                    this.display = false;
                    this.toastr.warning("Bad Request Error.")
                }
                else {
                    this.display = false;
                    this.toastr.error("An Unexpected Error Occured.")
                }

            })
            //console.log('1')
        }

        else {
            //console.log('2')
            this.gridBind(); 
        }
        
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById("appButton").style.display = 'none';
        document.getElementById('discardButton').style.display = 'none';
    }


    interlinearOnClick() {
        if (this.Interlinear == "Interlinear") {
            this.Interlinear = "Reverse-Interlinear"
        }
        else {
            this.Interlinear = "Interlinear"
        }

        this.bindHorizontalAlign();
    }

    verticalORgridOnClick() {
        // this.bilinearData = this.gridDataJson;
        // console.log(this.bilinearData)
        if (this.verticalORgrid == "Display Grid") {
            this.verticalORgrid = "Display Bilinear"
            document.getElementById('verticalInterlinear').style.display = "none";
            document.getElementById('grid').style.display = "";
        }
        else {
            this.verticalORgrid = "Display Grid"            
            document.getElementById('verticalInterlinear').style.display = "";
            document.getElementById('grid').style.display = "none";
        }
    }

    bindHorizontalAlign() {
        if (this.Interlinear == "Interlinear") {
            // Code for horizontal alignment
            this.Statuses = [];
            for (var h = 0; h < this.gridDataJson.hinditext.length; h++) {


                var greekPair = new Array();

                for (var g = 0; g < this.gridDataJson.positionalpairs.length; g++) {
                    let pair = this.gridDataJson.positionalpairs[g].split('-');
                    if (h == (Number(pair[0] - 1))) {
                        if (pair[1] == "255" || pair[1] == "0") {
                            greekPair.push("Null");
                        }
                        else {
                            greekPair.push(this.gridDataJson.englishword[Number(pair[1] - 1)] + "(" + this.gridDataJson.greek[Number(pair[1] - 1)] + ")");
                        }
                    }
                }
                if (greekPair[0] == undefined) {
                    greekPair.push("NA");
                }
                this.Statuses.push(new HorizontalAlign(h, this.gridDataJson.hinditext[h], greekPair))
            }
            //console.log(this.Statuses)
            // Ends Here
        }

        if (this.Interlinear == "Reverse-Interlinear") {
            // Code for horizontal alignment
            this.Statuses = [];
            for (var h = 0; h < this.gridDataJson.greek.length; h++) {


                var greekPair = new Array();

                for (var g = 0; g < this.gridDataJson.positionalpairs.length; g++) {
                    let pair = this.gridDataJson.positionalpairs[g].split('-');
                    if (h == (Number(pair[1] - 1))) {
                        if (pair[0] == "255" || pair[0] == "0") {
                            greekPair.push(this.gridDataJson.englishword[Number(pair[1] - 1)] + "(" + "Null" + ")");
                        }
                        else {
                            greekPair.push(this.gridDataJson.englishword[Number(pair[1] - 1)] + "(" +  this.gridDataJson.hinditext[Number(pair[0] - 1)] + ")");
                        }
                    }
                }
                if (greekPair[0] == undefined) {
                    greekPair.push(this.gridDataJson.englishword[h] + "(" + "NA" + ")");
                }
                this.Statuses.push(new HorizontalAlign(h, this.gridDataJson.greek[h], greekPair))
            }
            //console.log(this.Statuses)
            // Ends Here
        }
    }


    exportOnClick() {
        console.log(this.BOOKNAME)
        this.display = true;
        this._http.get(this.ApiUrl.grkhin + "/" + this.BOOKNAME)
          .toPromise()
          .then(response => this.saveToFileSystem(response.json()));
        this.display = false;
      }
     
      private saveToFileSystem(response) {
        const blob = new Blob([JSON.stringify(response)], { type: 'application/json' });
        saveAs(blob, 'bible.json');
      }


    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        const bookChapterVerse: SimpleChange = changes.BCV;
        this.BCV = bookChapterVerse.currentValue;
        this.gridBind();
        this.Interlinear = "Interlinear"
        this.verticalORgrid = "Display Bilinear";
        document.getElementById('verticalInterlinear').style.display = "none";
        document.getElementById('grid').style.display = "";
    }


    gridBind() {
        let bcv: any = this.BCV; //40001010;
        //   var data = new FormData();
        //   data.append("bcv",bcv);
        this.display = true;
        document.getElementById("grid").innerHTML = "";
        this._http.get(this.ApiUrl.getnUpdateBCV + '/' + bcv)
            .subscribe(data => {
                //console.log(data.json())
                this.generateVisual(data)

            }, (error: Response) => {
                if (error.status === 404) {
                    this.toastr.warning("Data not available")
                }
                else {
                    this.toastr.error("An Unexpected Error Occured.")
                }

            });

    }


  generateVisual(data){
    this.gridDataJson = data.json();
    this.rawPos = data.json().positionalpairs;
    this.display = false;
    var that = this;
    let self = this;
    let d3 = this.d3;

    //document.getElementById("grid").innerHTML = "";
    var content = document.getElementById('grid');


    if (this.Interlinear == "Interlinear") {
        // Code for horizontal alignment
        this.Statuses = [];
        for (var h = 0; h < data.json().hinditext.length; h++) {


            var greekPair = new Array();

            for (var g = 0; g < data.json().positionalpairs.length; g++) {
                let pair = data.json().positionalpairs[g].split('-');
                if (h == (Number(pair[0] - 1))) {
                    if (pair[1] == "255" || pair[1] == "0") {
                        greekPair.push("Null");
                    }
                    else {
                        greekPair.push(data.json().englishword[Number(pair[1] - 1)] + "(" + data.json().greek[Number(pair[1] - 1)] + ")");
                    }
                }
            }
            if (greekPair[0] == undefined) {
                greekPair.push("NA");
            }
            this.Statuses.push(new HorizontalAlign(h, data.json().hinditext[h], greekPair))
        }
        //console.log(this.Statuses)
        // Ends Here
    }

    if (this.Interlinear == "Reverse-Interlinear") {
        // Code for horizontal alignment
        //console.log(data.json())
        this.Statuses = [];
        for (var h = 0; h < data.json().greek.length; h++) {


            var greekPair = new Array();

            for (var g = 0; g < data.json().positionalpairs.length; g++) {
                let pair = data.json().positionalpairs[g].split('-');
                if (h == (Number(pair[1] - 1))) {
                    if (pair[0] == "255") {
                        greekPair.push(data.json().englishword[Number(pair[1] - 1)] + "(" + "Null" + ")");
                    }
                    else {
                        //greekPair.push(data.json().hinditext[Number(pair[0] - 1)]);
                        greekPair.push(data.json().englishword[Number(pair[1] - 1)] + "(" + data.json().hinditext[Number(pair[0] - 1)] + ")");
                    }
                }
            }
            if (greekPair[0] == undefined) {
                greekPair.push(data.json().englishword[h] + "(" + "NA" + ")");
            }
            this.Statuses.push(new HorizontalAlign(h, data.json().greek[h], greekPair))
        }
        //console.log(this.Statuses)
        // Ends Here
    }

    var gridData = this.gridData(data.json(), this.rawPos);
    //console.log(gridData)

    var greekLexiconText = '';
    var greekArray = new Array();
    for (var l = 0; l < data.json().greek.length; l++) {
        self._http.get(self.ApiUrl.getLexicon + '/' + data.json().greek[l])
            .subscribe(data => {
                // console.log(data.json())
                greekArray.push("<b>English Word</b>:- " + data.json().englishword + "<br/><br/>" + "<b>Definition</b>:- " + data.json().definition + "<br/><br/>" + "<b>greek_word</b>:- " + data.json().greek_word + "<br/><br/>" + "<b>pronunciation</b>:- " + data.json().pronunciation + "<br/><br/>" + "strongs:- " + data.json().strongs + " " + "<br/><br/>" + "<b>transliteration</b>:- " + data.json().transliteration);
            });

        //    console.log(greekArray)       
    }

    var grid = d3.select("#grid")
        .append("svg")
        .style("overflow", "auto")
        .style("padding-top", "10px")

    var row = grid.selectAll(".rowd3")
        .data(gridData)
        .enter().append("g")
        .attr("class", "rowd3");


    var column = row.selectAll(".square")
        .data(function (d: any) { return d; })
        .enter().append("rect")
        .attr("id", function (d: any, i) { return "rect-" + d.y + i })

    var columnAttributes = column
        .attr("x", function (d: any) { return d.x; })
        .attr("y", function (d: any) { return d.y; })
        .attr("rx", "5")
        .attr("ry", "5")
        .attr("width", function (d: any) { return d.width })
        .attr("height", function (d: any) { return d.height })
        .attr("stroke", "#66a877")//"#acb7b7"
        .attr("fill",
            function (d: any) {
                //console.log(d.positionalPairOfApi)
                //console.log(d.positionalPair)
                if (d.positionalPairOfApi.includes(d.positionalPair)) {
                    d.filled = true;
                    let index = d.positionalPairOfApi.indexOf(d.positionalPair)
                    // console.log(d.colorCode)
                    // console.log(d.positionalPairOfApi)
                    // console.log(d.positionalPair)
                    // console.log(d.colorCode[index])
                     if(d.colorCode[index] == '0'){
                        return "#007C80"
                    }
                    else if(d.colorCode[index] == '1'){
                        return '#023659'
                    }
                    else if(d.colorCode[index] == '2')
                    {
                        return '#4695c9'
                    }
                }
                else {
                    d.filled = false;
                    return "#fff"
                }
            }
        )
        .attr("class", function (d: any) {
            if (d.positionalPairOfApi.includes(d.positionalPair)) {
                return "filledsquare"
            }
            else {
                return "square"
            }
        })
        .on('click', function (d: any, i) {
            if (!d.filled) {
                d3.select(this)
                    .style("fill", "#023659")
                    .attr('class', "filledsquare");

                //console.log(d.positionalPairOfApi)
                if (!self.indPair.includes(d.positionalPair)) {
                    self.indPair.push(d.positionalPair);
                }

                //document.getElementById('rect-'+d.y+0).style.fill = "#fff";

                var splilttedWord = d.positionalPair.split('-');
                if (d.positionalPairOfApi.includes(splilttedWord[0] + "-0")) {
                    const index: number = d.positionalPairOfApi.indexOf(splilttedWord[0] + "-0");
                    if (index !== -1) {
                        d.positionalPairOfApi.splice(index, 1);
                    }
                    document.getElementById('rect-' + d.y + 0).style.fill = "#fff";
                    
                }

                // console.log(splilttedWord)
                if (d.positionalPairOfApi.includes("0-" + splilttedWord[1])) {
                    const indexs: number = d.positionalPairOfApi.indexOf("0-" + splilttedWord[1]);
                    if (indexs !== -1) {
                        d.positionalPairOfApi.splice(indexs, 1);
                    }
                    document.getElementById('rect-' + 100 + i).style.fill = "#fff";
                }

                d.filled = true;
                d.positionalPairOfApi.push(d.positionalPair);

                //console.log(d.positionalPairOfApi)
                if (d.rawPosss != d.positionalPairOfApi) {
                    document.getElementById("saveButton").style.display = "";
                    document.getElementById("discardButton").style.display = "";
                    document.getElementById("appButton").style.display = "none";
                }
                else {
                    document.getElementById("saveButton").style.display = "none";
                    document.getElementById("discardButton").style.display = "none";
                }

                if (self.Interlinear == "Interlinear") {
                    // Code for horizontal alignment

                    self.Statuses = [];
                    for (var h = 0; h < data.json().hinditext.length; h++) {
                        var greekPair = new Array();

                        for (var g = 0; g < d.positionalPairOfApi.length; g++) {
                            let pair = d.positionalPairOfApi[g].split('-');
                            if (h == (Number(pair[0] - 1))) {
                                if (pair[1] == "0") {
                                    greekPair.push("Null");
                                }
                                else {
                                    //greekPair.push(data.json().greek[Number(pair[1] - 1)]);
                                    greekPair.push(data.json().englishword[Number(pair[1] - 1)] + "(" + data.json().greek[Number(pair[1] - 1)] + ")");
                                }
                            }
                        }
                        if (greekPair[0] == undefined) {
                            greekPair.push("NA");
                        }
                        self.Statuses.push(new HorizontalAlign(h, data.json().hinditext[h], greekPair))
                    }
                    // Ends Here
                }


                if (self.Interlinear == "Reverse-Interlinear") {
                    // Code for horizontal alignment

                    self.Statuses = [];
                    for (var h = 0; h < data.json().greek.length; h++) {
                        var greekPair = new Array();

                        for (var g = 0; g < d.positionalPairOfApi.length; g++) {
                            let pair = d.positionalPairOfApi[g].split('-');
                            if (h == (Number(pair[1] - 1))) {
                                if (pair[0] == "0") {
                                    greekPair.push(data.json().englishword[Number(pair[1] - 1)] + "(" + "Null" + ")");
                                }
                                else {
                                    //greekPair.push(data.json().hinditext[Number(pair[0] - 1)]);
                                    greekPair.push(data.json().englishword[Number(pair[1] - 1)] + "(" + data.json().hinditext[Number(pair[0] - 1)] + ")");
                                }
                            }
                        }
                        if (greekPair[0] == undefined) {
                            greekPair.push(data.json().englishword[h] + "(" + "NA" + ")");
                        }
                        self.Statuses.push(new HorizontalAlign(h, data.json().greek[h], greekPair))
                    }
                    // Ends Here
                }
                self.gridDataJson.positionalpairs = d.positionalPairOfApi;
            }
            else {
                d3.select(this)
                    .style("fill", "#fff")
                    .attr('class', "square")
                d.filled = false;
                var index = d.positionalPairOfApi.indexOf(d.positionalPair);
                if (index > -1) {
                    d.positionalPairOfApi.splice(index, 1);
                    if (d.rawPosss != d.positionalPairOfApi) {
                        //console.log('not matching')
                        document.getElementById("saveButton").style.display = "";
                        document.getElementById("discardButton").style.display = "";
                    }
                    else {
                        //console.log('matching')
                        document.getElementById("saveButton").style.display = "none";
                        document.getElementById("discardButton").style.display = "none";
                    }

                }

                if (self.Interlinear == "Interlinear") {
                    // Code for horizontal alignment

                    self.Statuses = [];
                    for (var h = 0; h < data.json().hinditext.length; h++) {
                        var greekPair = new Array();

                        for (var g = 0; g < d.positionalPairOfApi.length; g++) {
                            let pair = d.positionalPairOfApi[g].split('-');
                            if (h == (Number(pair[0] - 1))) {
                                if (pair[1] == "0") {
                                    greekPair.push("Null");
                                }
                                else {
                                    //greekPair.push(data.json().greek[Number(pair[1] - 1)]);
                                    greekPair.push(data.json().englishword[Number(pair[1] - 1)] + "(" + data.json().greek[Number(pair[1] - 1)] + ")");
                                }
                            }
                        }
                        if (greekPair[0] == undefined) {
                            greekPair.push("NA");
                        }
                        self.Statuses.push(new HorizontalAlign(h, data.json().hinditext[h], greekPair))
                    }
                    // Ends Here
                }

                if (self.Interlinear == "Reverse-Interlinear") {
                    // Code for horizontal alignment

                    self.Statuses = [];
                    for (var h = 0; h < data.json().greek.length; h++) {
                        var greekPair = new Array();

                        for (var g = 0; g < d.positionalPairOfApi.length; g++) {
                            let pair = d.positionalPairOfApi[g].split('-');
                            if (h == (Number(pair[1] - 1))) {
                                if (pair[0] == "0") {
                                    greekPair.push(data.json().englishword[Number(pair[1] - 1)] + "(" + "Null" + ")");
                                }
                                else {
                                    //greekPair.push(data.json().hinditext[Number(pair[0] - 1)]);
                                    greekPair.push(data.json().englishword[Number(pair[1] - 1)] + "(" + data.json().hinditext[Number(pair[0] - 1)] + ")");
                                }
                            }
                        }
                        if (greekPair[0] == undefined) {
                            greekPair.push(data.json().englishword[h] + "(" + "NA" + ")");
                        }
                        self.Statuses.push(new HorizontalAlign(h, data.json().greek[h], greekPair))
                    }
                    // Ends Here
                }
                self.gridDataJson.positionalpairs = d.positionalPairOfApi;
            }
            //console.log(d.positionalPairOfApi)
            //console.log(self.indPair)
        })

        .on("mouseover", function (d: any, i) {
            var x = document.getElementById(d.greekIndexWise);
            var y = document.getElementById(d.hindiIndexWise);
            x.style.fontSize = "16px";
            x.style.fill = "#008000";
            y.style.fontSize = "16px";
            y.style.fill = "#008000";

            div.style("left", d3.event.pageX + 10 + "px");
            div.style("top", d3.event.pageY - 25 + "px");
            div.style("display", "inline-block");
            div.style("text-align", "left")
            div.style("width", "400px")
            div.html(function () {

                if (d.greekHorizontalWord[i] != 'NULL') {
                    // console.log(Number(d.greekHorizontalWords[i].substring(1,d.greekHorizontalWords[i].length)));
                    let removeZero = Number(d.greekHorizontalWord[i].substring(1, d.greekHorizontalWord[i].length)).toString();
                    if (removeZero.endsWith('0')) {
                        removeZero = removeZero.substring(0, removeZero.length - 1)
                    }
                    // console.log(removeZero)
                    for (let count = 0; count < greekArray.length; count++) {
                        //console.log(greekArray[count])
                        if (greekArray[count].includes("strongs:- " + removeZero + " ")) {
                            //console.log(greekArray[count])
                            return "<b>" + y.innerHTML + "</b>" + " => " + "<b>" + x.innerHTML + "</b>" + "<br/><br/>" + greekArray[count];
                        }


                    }
                }
                else {
                    return y.innerHTML + " => " + x.innerHTML;
                }
            });





        })

        .on("mouseout", function (d: any) {
            var x = document.getElementById(d.greekIndexWise);
            var y = document.getElementById(d.hindiIndexWise);
            x.style.fontSize = "14px";
            x.style.fill = "black";
            y.style.fontSize = "14px";
            y.style.fill = "black";
            div.style("display", "none");
        })

    var upperColumn = row.selectAll(".upperColumn")
        .data(function (d: any) {
            return d;
        })
        .enter().append("text")


    // For making the svg matrix scrollable
    d3.selectAll("svg")
        .data(gridData)
        .attr("width", function (d, i) {
            let len = d.length;
            len = (len * 35) + 120;
            return len;
        })
        .attr("height", function (d, i) {
            let len = d[0].hindiVerticalWords.length;
            len = (len * 35) + 120;
            return len;
        })
    // Ended Here   

    var labell = d3.selectAll(".rowd3")
        .data(gridData)

    var label = labell.append("text")
        .attr("x", "36")
        .attr("y", function (d, i) {
            return d[0].y + 17;
        })
        .style("font-size", "13px")
        .attr("id", function (d, i) {
            return d[0].hindiIndexWise;
        })
        .text(function (d, i) {
            return d[0].hindiVerticalWords[i];
        })

    //  content.addEventListener('scroll', function(evt) {
    //    //console.log(  label.nodes()[1]);
    //    for(var i =0; i<label.nodes().length; i++){
    //     label.nodes()[i].setAttribute('x', 30 + this.scrollLeft);
    // }
    //   }, false)


    var labellll = grid.selectAll("svg")
        .data(gridData[0])
    var labelll = labellll.enter().append("g")
    var div = d3.select("body")
        .append("div")
        .attr("class", "toolTip")
        .attr("word-wrap", "break-word")
        ;

    var labelGreek = labelll.append("text")

        .attr("transform", function (d: any, i) {
            var xAxis = d.x + 14;
            return "translate(" + xAxis + ",95)rotate(300)";
        })
        .style("font-size", "14px")
        .attr("id", function (d: any, i) {
            return d.greekIndexWise;
        })
        .text(function (d: any, i) {
            return d.greekHorizontalWords[i];
        })


        .on("mouseout", function (d) {
            div.style("display", "none");
        })
        .on('mouseover', function (d: any, i) {
            div.style("left", d3.event.pageX + 10 + "px");
            div.style("top", d3.event.pageY - 25 + "px");
            div.style("display", "inline-block");
            div.style("text-align", "left")
            div.style("width", "400px")
            div.html(function () {

                if (d.greekHorizontalWord[i] != 'NULL') {
                    // console.log(Number(d.greekHorizontalWords[i].substring(1,d.greekHorizontalWords[i].length)));
                    let removeZero = Number(d.greekHorizontalWord[i].substring(1, d.greekHorizontalWord[i].length)).toString();
                    if (removeZero.endsWith('0')) {
                        removeZero = removeZero.substring(0, removeZero.length - 1)
                    }
                    // console.log(removeZero)
                    for (let count = 0; count < greekArray.length; count++) {
                        //console.log(greekArray[count])
                        if (greekArray[count].includes("strongs:- " + removeZero + " ")) {
                            //console.log(greekArray[count])
                            return greekArray[count];
                        }


                    }
                }
                else {
                    return 'N/A';
                }

                //return  (d.greekHorizontalWords[i] == 'NULL') ? 'N/A':d.greekHorizontalWords[i]
            });
        })

    content.addEventListener('scroll', function (evt) {

        // var elms:any = document.querySelectorAll("[id='rect-100']");

        // for(var i = 0; i < elms.length; i++) 
        //     elms[i].style.display='none'; 

        for (var i = 0; i < labelGreek.nodes().length; i++) {
            let labelGreekData: any = gridData[0][i];
            var xi: any = labelGreekData.x + 25;
            (labelGreek.nodes()[i] as any).setAttribute("transform", "translate(" + xi + "," + (85 + this.scrollTop) + ")rotate(300)")
            //labelGreek.nodes()[i].setAttribute("style","font-size:20px")


            // document.getElementById('rect-100').style.display = "none";
            // console.log (85 + this.scrollTop)


        }
    }, false)


  }  

}