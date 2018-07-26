import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { VerticalTimelinePageComponent } from "./timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";

import { PlaceComponent } from './place/place.component';
import { MessageComponent } from './message/message.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';

const routes: Routes = [
  {
    path: '',
    children: [
       
      {
        path: 'place',
        component: PlaceComponent,
        data: {
          title: 'Gallery Page'
        }
      },
      {
        path: 'message',
        component: MessageComponent,
        data: {
          title: 'messages'
        }
      },
      {
        path: 'users',
        component: ListeUsersComponent,
        data: {
          title: 'users'
        }
      },
      {
        path: 'profile',
        component: UserProfilePageComponent,
        data: {
          title: 'User Profile Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
