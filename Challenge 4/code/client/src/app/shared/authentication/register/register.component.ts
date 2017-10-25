import { Subscription } from 'rxjs/Subscription';
import { Cart } from './../../../models/Cart';
import { NotificatorService } from './../../../core/notificator/notificator.service';
import { UserAuthService } from './../user-auth/user-auth.service';
import { User } from './../../../models/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { LoginComponent } from '../login/login.component';


export interface RegisterModal {
    title: string;
}
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent extends DialogComponent<RegisterModal, null> implements OnDestroy, RegisterModal {
    public title: string;
    public subscription: Subscription = new Subscription();
    public mouseover:boolean;
    public user:User;

    constructor(
        dialogService: DialogService,
        private readonly userAuth: UserAuthService,
        private readonly notificator: NotificatorService,
        private readonly router: Router) {
        super(dialogService);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    registerUser(data: User) {
        data.cart = new Cart();
        data.cart.pizza = [];
        data.cart.customPizza = [];
        data.cart.price = 0;
        data.orders = [];

        this.subscription = this.userAuth.registerUser(data).subscribe(
            (response) => this.notificator.showSuccess(response['message']),
            (err) => this.notificator.showError(err.error.message),
            () => this.close());
    }
    showLoginModal() {
        this.close();
        this.dialogService.addDialog(LoginComponent, { title: 'Log In' });
    }
}
