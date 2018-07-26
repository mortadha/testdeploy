import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {SnotifyService} from 'ng-snotify';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    //Set toastr container ref configuration for toastr positioning on screen
    constructor(public toastr: ToastsManager, vRef: ViewContainerRef,private snotifyService: SnotifyService) {
        this.toastr.setRootViewContainerRef(vRef);
    }


}