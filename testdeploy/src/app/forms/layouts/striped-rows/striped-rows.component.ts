import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgForm,FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Place } from '../../../shared/models/place';
import{PlaceService} from "../../../shared/services/place.service";
import { HttpErrorResponse } from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {SnotifyService} from 'ng-snotify';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from 'google-maps';

@Component({
  selector: 'app-striped-rows',
  templateUrl: './striped-rows.component.html',
  styleUrls: ['./striped-rows.component.scss']
})
export class StripedRowsComponent {
  // Google map lat-long
  lat: number = 51.678418;
  lng: number = 7.809007;
  image:File;
  place : any;
  position : any;
  idPlace  : string;
  premium : boolean;
  path_img : any;
  labelOptions = {
    color: 'black',
    fontFamily: '',
    fontSize: '10px',
    text: 'My position',
    }
  login: string = "style='display: none;'";  
  geolocationPosition : any;
  listePlace : any[] =new Array();
  public listIdPlaceDB : string[]=new Array();
  public searchControl: FormControl;
  public zoom: number;
  allPlaces : any;


  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild('f') loginForm: NgForm;

  constructor(private placeService: PlaceService,private route: ActivatedRoute,private snotifyService: SnotifyService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
     this.place = {};
    this.route.params.subscribe( params => this.idPlace = params.id );
    if ( this.idPlace ) {
      this.placeService.getPlace(this.idPlace).subscribe((data : any)=>{
       this.place = data.result.place;
       this.lat = Number(this.place.latitude);
       this.lng = Number(this.place.longtitude);
       this.loginForm.controls['name'].setValue( this.place.name );
       this.loginForm.controls['adresse'].setValue( this.place.adresse );
       this.loginForm.controls['phone'].setValue( this.place.phone );
       this.premium = this.place.premium;
       this.path_img = this.place.path_img;
      },
      (err : HttpErrorResponse)=>{
        console.log(err);
      });
    }
  }
  
  ngOnInit() {

    
     //create search FormControl
     this.searchControl = new FormControl();
    
     //set current position
     this.setCurrentPosition();
     
     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
       let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
         types: ["address"]
       });
       autocomplete.addListener("place_changed", () => {
         this.ngZone.run(() => {
           //get the place result
           let place: google.maps.places.PlaceResult = autocomplete.getPlace();
   
           //verify result
           if (place.geometry === undefined || place.geometry === null) {
             return;
           }
           
           //set latitude, longitude and zoom
           this.lat = place.geometry.location.lat();
           this.lng = place.geometry.location.lng();
           this.placeService.getPlacesGoogle(this.lat,this.lng).subscribe((data : any)=>{
          //  this.listePlace = data.results;
           });
           this.zoom = 12;
         });
       });
     });

    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.geolocationPosition = position,
                    this.lat = Number(position.coords.latitude);
                    this.lng = Number(position.coords.longitude);
                      this.placeService.getPlacesGoogle(position.coords.latitude,position.coords.longitude).subscribe((data : any)=>{
                    //  this.listePlace = data.results
                      ;
                    })
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
    };
}

  private setCurrentPosition() {
   
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
        this.placeService.GetPlaces().subscribe((data : any)=>{
          this.listIdPlaceDB = new Array();
          let listid = [];
          data.result.places.forEach(function(place) {
            listid.push(place.id_google);
           
          });
          this.listIdPlaceDB = listid;
          this.placeService.getPlacesGoogle(position.coords.latitude,position.coords.longitude).subscribe((data : any)=>{
            let places = [];
            data.results.forEach(function(place) {
              if ( ! listid.includes(place.id) ) {
                places.push(place);
              }
            });
            this.listePlace = places;
         });
         });
        
      });
    }
  }


  clickPremium(){
    if( this.loginForm.value.premium ){
      this.login = "style='display: block;'";
    }else{
      this.login = "style='display: none;'";
    }
      let randomstring = Math.random().toString(36).slice(-8);
      this.loginForm.controls['loginPlace'].setValue( randomstring );
    }

  onPositionUpdate(position) {
    this.position  = {
      lat: position.coords.lat,
      lng: position.coords.lng
    }

    this.placeService.GetPlaces().subscribe((data : any)=>{
      this.listIdPlaceDB = new Array();
      let listid = [];
      data.result.places.forEach(function(place) {
        listid.push(place.id_google);
       
      });
      this.listIdPlaceDB = listid;
      this.placeService.getPlacesGoogle(position.coords.lat,position.coords.lng).subscribe((data : any)=>{
        let places = [];
        data.results.forEach(function(place) {
          if ( ! listid.includes(place.id) ) {
            places.push(place);
          }
        });
        this.listePlace = places;
     });
     });

    
   }

   markerClick(place) {
    this.position  = {
      lat: Number(place.geometry.location.lat),
      lng: Number(place.geometry.location.lng)
    }
    this.placeService.getNumberPlaceGoogle(place.reference).subscribe((data : any)=>{
     this.loginForm.controls['adresse'].setValue( data.result.formatted_address );
     this.loginForm.controls['phone'].setValue( data.result.formatted_phone_number );
     });
     this.loginForm.controls['id_google'].setValue( place.id );
     this.loginForm.controls['name'].setValue( place.name );
    this.premium = false;
    if(place.photos) {
     let path ="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+ place.photos[0].photo_reference +'&key='+'AIzaSyD4LHtqHkSPuSCuaJGQu9_O3Eq8d9lquE0'   ;
      this.toDataURL( path, function(dataUrl) {})
      
    }else {
      this.path_img ="";
    }
   
    }


     toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = (event: any) => {
        var reader = new FileReader();
        reader.onloadend = (event: any) => {
          this.path_img = event.target.result;
          
        }
        this.place.path_image = xhr.response;
        this.place.path_image.name =Math.random()+"image.png"
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }

   fileChangeEvent(fileInput: any) {
     this.image = fileInput.target.files;
     this.place.path_image = this.image[0];
     if (this.image && this.image[0]) {
      var reader = new FileReader();
        reader.onload = (event: any) => {
          this.path_img = event.target.result;
          
        }
        reader.readAsDataURL(this.image[0]);
      }
     } 

    // On submit button click    
    onSubmit() {
     this.place.name = this.loginForm.value.name;
     this.place.adresse = this.loginForm.value.adresse;
     this.place.premium = this.loginForm.value.premium;
     this.place.phone = this.loginForm.value.phone;
     this.place.latitude = this.position.lat;
     this.place.longtitude = this.position.lng;
     this.place.id_google = this.loginForm.value.id_google;
     this.placeService.addPlace(this.place).subscribe((data : any)=>{
     this.snotifyService.success('Ajouté avec succès', {
        timeout: 500,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      this.placeService.GetPlaces().subscribe((data : any)=>{
        this.listIdPlaceDB = new Array();
        let listid = [];
        data.result.places.forEach(function(place) {
          listid.push(place.id_google);
         
        });
        this.listIdPlaceDB = listid;
        this.placeService.getPlacesGoogle(this.lat,this.lng).subscribe((data : any)=>{
          let places = [];
          data.results.forEach(function(place) {
            if ( ! listid.includes(place.id) ) {
              places.push(place);
            }
          });
          this.listePlace = places;
       });
       });
    },
    (err : HttpErrorResponse)=>{
      this.snotifyService.error("Echec d'ajout", {
        timeout: 500,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    });
  }
}
