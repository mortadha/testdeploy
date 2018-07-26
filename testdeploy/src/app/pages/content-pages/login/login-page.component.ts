import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import{AdminService} from "../../../shared/services/admin.service"
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f') loginForm: NgForm;

    public alert : boolean;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private auth: AdminService) {
            if(localStorage.getItem('userToken')){
                this.router.navigate(['/dashboard']);
            }    
         }


    ngOnInit() {
       
    }
    // On submit button click    
    onSubmit() {
        this.auth.login(this.loginForm.value).subscribe((data : any)=>{
            localStorage.setItem('userToken',data.result.token);
            this.alert = false;
            this.router.navigate(['/dashboard']);
          },
          (err : HttpErrorResponse)=>{
              this.alert = true;
           });
      //  this.loginForm.reset();
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}