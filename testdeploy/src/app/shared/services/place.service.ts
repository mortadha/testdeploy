import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions,Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class PlaceService {

  constructor(private http:HttpClient) { }

  baseUrl = "https://dev.fflok.orevonlabs.fr";
  headers = { 
    'Content-Type': 'application/json',
    'Connection': 'Keep-Alive',
    'Access-Control-Allow-Origin':'*',
    'Authorization':localStorage.getItem('userToken')
    };

    //get liste places
    GetPlaces(): Observable<any> {
            return this.http.get(this.baseUrl + 'getPlaces',{
            headers :this.headers});
    }
    //count places
    countPlaces(): Observable<any> {
        return this.http.get(this.baseUrl + 'coutPlace',{
        headers :this.headers});
    }
    //count places
    deletePlace(id): Observable<any> {
        return this.http.delete(this.baseUrl + 'deletePlace/'+id,{
        headers :this.headers});
    }
    //count places
    getPlace(id): Observable<any> {
        return this.http.get(this.baseUrl + 'getPlace/'+id,{
        headers :this.headers});
    }

     //getPlacesGoogle
     getPlacesGoogle(latitude ,longitude): Observable<any> {
        return this.http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ latitude  +","+ longitude +"&radius=500&type=restaurant&key=AIzaSyD4LHtqHkSPuSCuaJGQu9_O3Eq8d9lquE0",{
        });
     }

    //ge number place google
    getNumberPlaceGoogle(reference): Observable<any> {
        return this.http.get("https://maps.googleapis.com/maps/api/place/details/json?reference="+ reference+"&key=AIzaSyD4LHtqHkSPuSCuaJGQu9_O3Eq8d9lquE0",{
        });
     } 


  //add place 
  addPlace(data): Observable<any> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Connection': 'Keep-Alive',
            'Access-Control-Allow-Origin':'*'
        });
        let options = new RequestOptions({ headers: headers });
        let token = 'Bearer '+localStorage.getItem('userToken');
        const formData = new FormData();
        console.log(data.path_image.name);
        formData.append("image", data.path_image,data.path_image.name);
        formData.append("name",data.name);
        formData.append("phone",data.phone);
        formData.append("premium",data.premium);
        formData.append("adresse",data.adresse);
        formData.append("latitude",data.latitude);
        formData.append("longtitude",data.longtitude);
        formData.append("id_google",data.id_google);

       return this.http.post(this.baseUrl +'addPlace',formData,{
        headers : {
             'x-api-key':'InJIznpwpt07sHYeRzqJ5VXDHqmGqXJQ-AwOtaVdWuciqxJocAjW1MhHNktDLPbTj',
             'Authorization':token
         }});
    }

}
