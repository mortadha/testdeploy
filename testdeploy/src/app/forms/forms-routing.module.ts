import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StripedRowsComponent } from './layouts/striped-rows/striped-rows.component';


const routes: Routes = [
  {
    path: '',    
    children: [
      
      {
        path: 'add-place',
        component: StripedRowsComponent,
        data: {
          title: 'Striped Rows'
        }
      },
      {
        path: 'edite-place/:id',
        component: StripedRowsComponent,
        data: {
          title: 'Striped Rows'
        }
      },
         
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule { }
