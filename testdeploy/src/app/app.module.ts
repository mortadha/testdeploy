
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { AdminService } from "./shared/services/admin.service"
import { PlaceService } from "./shared/services/place.service"
import { FflokService } from "./shared/services/fflok.service"
import { UserService } from "./shared/services/user.service"
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { CustomOption } from "./shared/toastr/custom-option";
import { ErrorPageComponent } from './pages/content-pages/error/error-page.component';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { LoginPageComponent } from './pages/content-pages/login/login-page.component';
import * as $ from 'jquery';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {'path':'/api/socket.io/','Access-Control-Allow-Origin':'*'} };

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        LoginPageComponent,
        ErrorPageComponent,
        
    ],
    imports: [
        BrowserAnimationsModule,
        SnotifyModule,
        FormsModule ,
        StoreModule.forRoot({}),
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        ToastModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
              }
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo',
            libraries: ["places"]
        })
    ],
    providers: [
        //Toastr and auth providers
        { provide: ToastOptions, useClass: CustomOption },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
        AuthService,
        SnotifyService,
        AuthGuard,
        AdminService,
        PlaceService,
        FflokService,
        UserService,
        LoginPageComponent,
        ErrorPageComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }