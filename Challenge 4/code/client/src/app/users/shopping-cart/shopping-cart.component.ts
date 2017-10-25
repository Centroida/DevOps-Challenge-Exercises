import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AlerterService } from './../../core/alerter/alerter.service';
import { Cart } from './../../models/Cart';
import { CookieService } from './../../core/cookie/cookie.service';
import { NotificatorService } from './../../core/notificator/notificator.service';
import { UsersDataService } from './../users-data/users-data.service';
import { Product } from './../../models/Product';
import { CustomPizza } from './../../models/CustomPizza';
import { Pizza } from './../../models/Pizza';
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Order } from '../../models/Order';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit, DoCheck, OnDestroy {
    public cart: Cart = new Cart();
    public subscriptions: Subscription[] = [];
    public address: string;

    constructor(
        private readonly userDataService: UsersDataService,
        private readonly notificator: NotificatorService,
        private readonly cookieService: CookieService,
        private readonly alerter: AlerterService,
        private readonly router: Router
    ) { }

    ngOnDestroy() {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngOnInit() {
        const sub = this.userDataService.getCurrentUserInfo().subscribe(
            (response) => {
                this.cart = response['data'][0].cart;
                this.address = response['data'][0].address;
            },
            (err) => this.notificator.showError(err.error.message));

        this.subscriptions.push(sub);
    }

    ngDoCheck() {
        this.cart.price = +this.cookieService.getCookie('cartPrice');
    }

    removeCustomPizzaOrder(pizza: CustomPizza) {
        const deletingPizza = this.cart.customPizza
            .find(x => {
                return Object.keys(pizza).every(key => {
                    if (pizza[key].length) {
                        return pizza[key].every(type => {
                            return !!x[key].find(y => y.toString() === type.toString());
                        });
                    }

                    return pizza[key] === x[key];
                });
            });

        this.cart.customPizza = this.cart.customPizza.filter(x => x !== deletingPizza);
        this.successRemovePizza(pizza);

        const sub = this.userDataService.deleteCustomPizzaFromCart(pizza).subscribe(
            (response) => this.notificator.showSuccess(response['message']),
            (err) => this.notificator.showError(err.error.message));

        this.subscriptions.push(sub);
    }

    removeClassicPizzaOrder(pizza: Pizza) {
        const deletingPizza = this.cart.pizza
            .find(x => {
                return Object.keys(pizza).every(key => {
                    return pizza[key] === x[key];
                });
            });

        this.cart.pizza = this.cart.pizza.filter(x => x !== deletingPizza);
        this.successRemovePizza(pizza);

        const sub = this.userDataService.deleteClassicPizzaFromCart(pizza).subscribe(
            (response) => this.notificator.showSuccess(response['message']),
            (err) => this.notificator.showError(err.error.message));

        this.subscriptions.push(sub);
    }

    orderPizza() {
        this.alerter.showPurchaseSuggestion()
            .then(() => {
                return this.alerter.askForAddressSuggestion()
                    .then(() => this.address)
                    .catch(() => this.alerter.getAddressSuggestion());
            })
            .then((address: string) => {
                const order = new Order();
                order.date = new Date();
                order.items = this.cart;
                order.address = address;

                const sub = this.userDataService.addOrderToUser(order).subscribe(
                    (response) => this.successOrderPizza(),
                    (err) => this.notificator.showError(err.error.message));

                this.subscriptions.push(sub);
            })
            .catch((error: string) => {
                this.alerter.showErrorAlert('Cancelled', error);
            });
    }

    private successOrderPizza() {
        this.alerter.showSuccessAlert('Ordered!', 'The order is comming in 30 minutes!');
        this.cart = new Cart();

        this.cookieService.setCookie('cartItems', '0');
        this.cookieService.setCookie('cartPrice', '0');

        this.router.navigateByUrl('/users/orders');
    }

    private successRemovePizza(pizza) {
        const cartItems = +this.cookieService.getCookie('cartItems') - 1;
        const cartPrice = +this.cookieService.getCookie('cartPrice') - pizza.price;

        this.cookieService.setCookie('cartItems', cartItems.toString());
        this.cookieService.setCookie('cartPrice', cartPrice.toString());
    }
}
