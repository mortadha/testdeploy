import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { HorizontalTimelineComponent } from './timeline/horizontal/component/horizontal-timeline.component';
import { VerticalTimelinePageComponent } from "./timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { PlaceComponent } from './place/place.component';
import { MessageComponent } from './message/message.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule,
        Ng2SmartTableModule,
        SnotifyModule
    ],
    declarations: [       
       HorizontalTimelinePageComponent,
        HorizontalTimelineComponent,
        VerticalTimelinePageComponent,
        UserProfilePageComponent,
        PlaceComponent,
        MessageComponent,
        ListeUsersComponent
        
    ],
    providers: [
      { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
      SnotifyService
    ]
})
export class FullPagesModule { }
