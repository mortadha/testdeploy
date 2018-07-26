import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesRoutingModule } from "./data-tables-routing.module";
import { ModalModule } from 'ngx-bootstrap/modal';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { DTFilterComponent } from "./filter/dt-filter.component";


@NgModule({
    imports: [
        CommonModule,
        DataTablesRoutingModule,
        Ng2SmartTableModule,
        ModalModule.forRoot(),
        SnotifyModule
       
        
    ],
    declarations: [
        
        DTFilterComponent,
        
    ],
    providers: [
      { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
      SnotifyService
    ]
})
export class DataTablesModule { }
