import { Subscription } from 'rxjs/Subscription';
import { CookieService } from '../../../core/cookie/cookie.service';
import { NotificatorService } from './../../../core/notificator/notificator.service';
import { UserAuthService } from './../user-auth/user-auth.service';
import { User } from './../../../models/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {
    public subscription: Subscription;

    constructor(
        private readonly userAuth: UserAuthService,
        private readonly notificator: NotificatorService,
        private readonly cookieService: CookieService,
        private readonly router: Router) { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        this.subscription = this.userAuth.logoutUser().subscribe((response) => {
            this.cookieService.removeCookie();
            this.notificator.showSuccess(response['message']);
        },
            (err) => this.notificator.showError(err.error.message),
            () => this.router.navigateByUrl('/'));
    }
}
