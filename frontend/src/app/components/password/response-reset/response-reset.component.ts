import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JarwisService} from '../../../Services/jarwis.service';
import {SnotifyService} from 'ng-snotify';

@Component({
    selector: 'app-response-reset',
    templateUrl: './response-reset.component.html',
    styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
    public error = [];
    public form = {
        email: null,
        password: null,
        password_confirmation: null,
        resetToken: null
    };

    constructor(
        private route: ActivatedRoute,
        public jarwis: JarwisService,
        private router: Router,
        private notify: SnotifyService
    ) {
        route.queryParams.subscribe(params => {
            this.form.resetToken = params['token'];
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        this.jarwis.changePassword(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        let _router = this.router;
        this.notify.confirm('Hecho', 'Ahora prueba logearte con la nueva contraseña', {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            buttons: [
                {
                    text: 'Ok', action: (toast) => {
                        _router.navigateByUrl('/login');
                        this.notify.remove(toast.id);
                    }
                },
            ]
        });

    }

    handleError(error) {
        this.error = error.error.error;
    }

}
