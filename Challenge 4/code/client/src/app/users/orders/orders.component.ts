import { Subscription } from 'rxjs/Subscription';
import { Order } from './../../models/Order';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from './../../core/cookie/cookie.service';
import { UsersDataService } from './../users-data/users-data.service';
import { NotificatorService } from './../../core/notificator/notificator.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
    public orders: Order[] = [];
    public subscription: Subscription;

    constructor(
        private readonly userDataService: UsersDataService,
        private readonly notificator: NotificatorService,
    ) { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        this.subscription = this.userDataService.getUserOrders().subscribe(
            (response) => this.orders = response['data'][0],
            (err) => this.notificator.showError(err.error.message));
    }
}
