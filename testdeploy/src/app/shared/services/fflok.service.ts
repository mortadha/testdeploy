import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions,Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FflokService {

  constructor(private http:HttpClient) { }

  baseUrl = environment.baseUrl;
  headers = { 
    'Content-Type': 'application/json',
    'Connection': 'Keep-Alive',
    'Access-Control-Allow-Origin':'*',
    'Authorization':localStorage.getItem('userToken')
    };

      //count places
    countfflok(): Observable<any> {
      return this.http.get(this.baseUrl + 'coutfflok',{
      headers :this.headers});
    }

}
