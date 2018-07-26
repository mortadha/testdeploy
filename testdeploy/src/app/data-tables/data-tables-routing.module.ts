import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DTFilterComponent } from "./filter/dt-filter.component";


const routes: Routes = [
  {
    path: '',
    children: [
     
      {
        path: 'list',
        component: DTFilterComponent,
        data: {
          title: 'list restaurants'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataTablesRoutingModule { }