import { Component, ViewChild,TemplateRef } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import{PlaceService} from "../../shared/services/place.service";
import { HttpErrorResponse } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import * as tableData from '../../shared/data/smart-data-table';
declare var require: any;
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
const data: any = require('../../shared/data/company.json');
import {SnotifyService} from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dt-filter',
    templateUrl: './dt-filter.component.html',
    styleUrls: ['./dt-filter.component.scss']
})

export class DTFilterComponent {
   
    
   // @ViewChild(DatatableComponent) table: DatatableComponent;
    source: any;
    filterSource: any;
    alertSource: any;
    modalRef: BsModalRef;
    message: string;
    idPlace: string;
    constructor(private placeService: PlaceService,private modalService: BsModalService,private snotifyService: SnotifyService,private router: Router) {
        
        this.placeService.GetPlaces().subscribe((data : any)=>{
           // this.source =   data.result.places;
          //  this.filterSource = data.result.places;
            this.alertSource =data.result.places;
          },
          (err : HttpErrorResponse)=>{
            console.log(err);
          });
        
    }
    //settings = tableData.settings;
    //filtersettings = tableData.filtersettings;
    alertsettings = tableData.alertsettings;
  


    //  For confirm action On Delete
    onDeleteConfirm(event,tem: TemplateRef<any>) {
        this.idPlace = event.data._id
        this.openModal(tem);
     }

    //  For confirm action On Save
    onSaveConfirm(event,tem: TemplateRef<any>) {
        this.router.navigate(['/forms/edite-place/'+event.data._id])
    }

    
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
      }
     
      confirm(): void {
          this.placeService.deletePlace(this.idPlace).subscribe((data : any)=>{
            if(data.result.place.n == 1 ){
                this.placeService.GetPlaces().subscribe((data : any)=>{
                    this.alertSource =data.result.places;
                   },
                   (err : HttpErrorResponse)=>{
                     console.log(err);
                   });
                this.snotifyService.success('suppression avec succès', {
                    timeout: 5000,
                    showProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true
                  });
            }
           },
           (err : HttpErrorResponse)=>{
             console.log(err);
           });
        this.modalRef.hide();
        
      }
     
      decline(): void {
        this.message = 'Declined!';
        this.modalRef.hide();
      }
}