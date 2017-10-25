import { Cart } from './../../../models/Cart';
import { NotificatorService } from './../../../core/notificator/notificator.service';
import { UserAuthService } from './../user-auth/user-auth.service';
import { User } from './../../../models/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../../../core/cookie/cookie.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { RegisterModal, RegisterComponent } from '../register/register.component';
import { Subscription } from 'rxjs/Subscription';

export interface LoginModal {
    title: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends DialogComponent<LoginModal, null> implements OnDestroy, LoginModal {
    public mouseover:boolean;

    public user: User = new User();
    public title: string;
    public subscription: Subscription = new Subscription();

    constructor(
        dialogService: DialogService,
        private readonly userAuth: UserAuthService,
        private readonly notificator: NotificatorService,
        private readonly cookieService: CookieService,
        private readonly router: Router,
    ) {
        super(dialogService);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loginUser(data: User) {
        this.subscription = this.userAuth.loginUser(data).subscribe(
            (response) => {
                const user = response['data'][0].user;
                const cartItems = user.cart.pizza.length + user.cart.customPizza.length;

                this.cookieService.setCookie('token', response['data'][0].token);
                this.cookieService.setCookie('username', user.username);
                this.cookieService.setCookie('cartItems', cartItems.toString());
                this.cookieService.setCookie('cartPrice', user.cart.price.toString());

                this.notificator.showSuccess(response['message']);
                this.close();
            },
            (err) => this.notificator.showError(err.error.message));
    }
    showRegisterModal() {
        this.close();
        this.dialogService.addDialog(RegisterComponent, { title: 'Register' });
    }
}

