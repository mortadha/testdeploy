import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions,Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {

  constructor(private http:HttpClient) { }
  login(data): Observable<any> {
    let headers = new Headers({ 
        'Content-Type': 'application/json',
        'Connection': 'Keep-Alive',
        'Access-Control-Allow-Origin':'*',
        
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post('https://dev.fflok.orevonlabs.fr/api/admin/loginAdmin',data,{
        headers : {
            'x-api-key':'InJIznpwpt07sHYeRzqJ5VXDHqmGqXJQ-AwOtaVdWuciqxJocAjW1MhHNktDLPbTj'
        }});
}


}