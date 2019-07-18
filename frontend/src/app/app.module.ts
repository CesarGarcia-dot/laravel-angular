import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RequestResetComponent} from './components/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './components/password/response-reset/response-reset.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {JarwisService} from './Services/jarwis.service';
import {TokenService} from './Services/token.service';
import {AuthService} from './Services/auth.service';
import {AfterLoginService} from './Services/after-login.service';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        SignupComponent,
        ProfileComponent,
        RequestResetComponent,
        ResponseResetComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        SnotifyModule
    ],
    providers: [
        JarwisService,
        TokenService,
        AuthService,
        AfterLoginService,
        {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
        SnotifyService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
