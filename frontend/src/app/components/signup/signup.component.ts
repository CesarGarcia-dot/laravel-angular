import {Component, OnInit} from '@angular/core';
import {JarwisService} from "../../Services/jarwis.service";
import {TokenService} from "../../Services/token.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    public form = {
        email: null,
        name: null,
        password: null,
        password_confirmation: null,
    };

    public error = [];

    constructor(
        private jarwis: JarwisService,
        private token: TokenService,
        private route: Router
    ) {
    }

    ngOnInit() {
     this.form = {
            email: null,
            name: null,
            password: null,
            password_confirmation: null,
        };
    }

    onSubmit() {
        return this.jarwis.signup(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error),
        );
    }

    handleError(error) {
        this.error = error.error.errors;
    }

    handleResponse(data) {
        this.token.handler(data.access_token);
        this.route.navigateByUrl('/profile');
    }
}
