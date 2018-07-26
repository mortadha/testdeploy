import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import{UserService} from "../../../shared/services/user.service";
import {SnotifyService} from 'ng-snotify';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as tableData from '../../../shared/data/smart-data-table';
declare var require: any;

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.scss']
})
export class ListeUsersComponent implements OnInit {

  alertsettings = tableData.userssettings;
  alertSource: any;
  listeUSers = new Array();

  constructor(private userService :UserService) { }

  ngOnInit() {
   
    this.userService.getUsers().subscribe((data : any)=>{
      data.result.users.forEach(element => {
        let user : any;
        user = {};
        user.prenon =  element.prenon.text;
        user.active =  element.active;
        user.phone =  element.phone;
        user.number_fflok =  element.number_fflok;
        this.listeUSers.push(user);
      });
      console.log('listeUSers');
      console.log(this.listeUSers)
      this.alertSource = this.listeUSers;
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
    });
  }

}
