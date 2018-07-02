import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { map, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlignerService {

  constructor(private http:Http) { }

  getAligner(bcv){
   bcv = 43001017;
  this.http.get('http://127.0.0.1:5000/getalignments/'+ bcv)
 }

  // async getAligner(): Promise<number>{
  //   let bcv = 43001001;
  //    const response = await this.http.get('http://127.0.0.1:5000/getalignments/'+ bcv)
  //    .toPromise()
  //    return  response.json()
  //  //console.log('asdfasdfkj')
  // }
}
