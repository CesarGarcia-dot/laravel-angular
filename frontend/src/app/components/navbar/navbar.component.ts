import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public loggedIn: boolean;

    constructor(
        private Auth: AuthService,
        private token: TokenService,
        private route: Router
    ) {
    }

    ngOnInit() {
        this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    }

    logout(e: MouseEvent) {
        e.preventDefault();
        this.Auth.changeAuthStatus(false);
        this.token.remove();
        this.route.navigateByUrl('/login');
    }

}
