import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {AuthService} from "../../Services/auth.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public form = {
        email: null,
        password: null
    };

    public error = null;

    constructor(
        private jarwis: JarwisService,
        private token: TokenService,
        private route: Router,
        private Auth: AuthService
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {
        return this.jarwis.login(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error),
        );
    }

    handleResponse(data) {
        this.token.handler(data.access_token);
        this.Auth.changeAuthStatus(true);
        this.route.navigateByUrl('/profile');
    }

    handleError(error) {
        this.error = error.error.error;
    }

}
