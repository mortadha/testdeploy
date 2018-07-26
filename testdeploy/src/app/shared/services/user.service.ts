import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions,Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Socket, SocketIoModule } from 'ng-socket-io';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';

@Injectable()
export class UserService {

  constructor(private http:HttpClient,private mysocket : Socket) { }

  baseUrl = "https://dev.fflok.orevonlabs.fr";
  headers = { 
    'Content-Type': 'application/json',
    'Connection': 'Keep-Alive',
    'Access-Control-Allow-Origin':'*',
    'Authorization':localStorage.getItem('userToken')
    };

      //count users
    countUser(): Observable<any> {
      return this.http.get(this.baseUrl + 'coutUser',{
      headers :this.headers});
    }
    
      //count places
     getUsers(): Observable<any> {
        return this.http.get(this.baseUrl + 'getUsers',{
        headers :this.headers});
      }
      getMessage() {
        return this.mysocket
            .fromEvent<any>("tchat5b2bccc1059064793096c47e")
            .map( data => data );
      }

      sendMessage(data): Observable<any> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Connection': 'Keep-Alive',
            'Access-Control-Allow-Origin':'*',
            
        });
        let options = new RequestOptions({ headers: headers });
       return this.http.put('http://localhost:3000/api/io/sendMessagfflok',data,{
            headers : {
                'x-api-key':'InJIznpwpt07sHYeRzqJ5VXDHqmGqXJQ-AwOtaVdWuciqxJocAjW1MhHNktDLPbTj',
                'Authorization' :'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IisyMTYyNjExOTUwOCIsImlhdCI6MTUyODc5NTg0N30.QNXC8ZCHVDZZCM8U1o7NJmK2g03voCe2JSSocVLKwAc',
                'Access-Control-Allow-Origin':'*',
                'Content-Type' : 'application/x-www-form-urlencoded'
            }});
    }

}
