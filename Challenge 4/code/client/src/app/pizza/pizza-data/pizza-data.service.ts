import { CookieService } from './../../core/cookie/cookie.service';
import { HttpHeaders } from '@angular/common/http';
import { Pizza } from './../../models/Pizza';
import { CustomPizza } from './../../models/CustomPizza';
import { RequesterService } from './../../core/requester/requester.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PizzaDataService {
    constructor(
        private readonly requester: RequesterService,
        private readonly cookieService: CookieService
    ) { }

    getAllPizza() {
        return this.requester.get('/api/pizza');
    }

    getProducts() {
        return this.requester.get('/api/products');
    }

    addPizzaToUserCart(pizza: Pizza) {
        const token = this.cookieService.getCookie('token');
        const headers = new HttpHeaders().set('token', token);

        return this.requester.post('/api/shoppingCart/pizza', pizza, headers);
    }

    addCustomPizzaToUserCart(pizza: CustomPizza) {
        const token = this.cookieService.getCookie('token');
        const headers = new HttpHeaders().set('token', token);

        return this.requester.post('/api/shoppingCart/customPizza', pizza, headers);
    }
}
