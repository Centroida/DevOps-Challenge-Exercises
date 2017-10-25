import { Order } from './../../models/Order';
import { Pizza } from './../../models/Pizza';
import { CustomPizza } from './../../models/CustomPizza';
import { CookieService } from './../../core/cookie/cookie.service';
import { HttpHeaders } from '@angular/common/http';
import { RequesterService } from './../../core/requester/requester.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersDataService {

    constructor(
        private readonly requester: RequesterService,
        private readonly cookieService: CookieService
    ) { }

    getCurrentUserInfo() {
        const token = this.cookieService.getCookie('token');
        const headers = new HttpHeaders().set('token', token);

        return this.requester.get('/api/currentUser', headers);
    }

    deleteCustomPizzaFromCart(pizza: CustomPizza) {
        const token = this.cookieService.getCookie('token');
        const headers = new HttpHeaders().set('token', token);

        return this.requester.put('/api/shoppingCart/customPizza', pizza, headers);
    }

    deleteClassicPizzaFromCart(pizza: Pizza) {
        const token = this.cookieService.getCookie('token');
        const headers = new HttpHeaders().set('token', token);

        return this.requester.put('/api/shoppingCart/pizza', pizza, headers);
    }

    addOrderToUser(order: Order) {
        const token = this.cookieService.getCookie('token');
        const headers = new HttpHeaders().set('token', token);

        return this.requester.post('/api/currentUser', order, headers);
    }

    getUserOrders() {
        const token = this.cookieService.getCookie('token');
        const headers = new HttpHeaders().set('token', token);

        return this.requester.get('/api/orders', headers);
    }
}
