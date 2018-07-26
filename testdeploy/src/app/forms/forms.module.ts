import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormsRoutingModule } from "./forms-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NGXFormWizardModule } from "./ngx-wizard/ngx-wizard.module";
import { CustomFormsModule } from 'ng2-validation';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { AgmCoreModule } from '@agm/core';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { StripedRowsComponent } from './layouts/striped-rows/striped-rows.component';


@NgModule({
    imports: [
        CommonModule,
        FormsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NGXFormWizardModule,
        CustomFormsModule,
        MatchHeightModule,
        NgbModule,
        SnotifyModule,
        AgmCoreModule,
        UiSwitchModule,
        AgmSnazzyInfoWindowModule 
    ],
    declarations: [
        
        StripedRowsComponent
        
    ],
    providers: [
      { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
      SnotifyService
    ]

})
export class FormModule { }
