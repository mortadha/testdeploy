import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  
  {
    path: 'forms',
    loadChildren: './forms/forms.module#FormModule'
  },
  
  
  {
    path: 'place',
    loadChildren: './data-tables/data-tables.module#DataTablesModule'
  },
  
  
  {
    path: 'pages',
    loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
  }
];