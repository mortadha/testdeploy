import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    
    
   
    
    {
        path: '', title: 'Gestion user', icon: 'ft-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            
            { path: '/pages/users', title: 'liste user', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/forms/add-place', title: 'add user', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
            
        ]
    },
    {
        path: '', title: 'Gestion place', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            
            { path: '/place/list', title: 'liste place', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/forms/add-place', title: 'add place', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
            
        ]
    },
    
    
];
