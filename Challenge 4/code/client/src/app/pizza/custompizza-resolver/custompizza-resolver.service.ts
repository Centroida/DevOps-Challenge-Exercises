import { PizzaDataService } from './../pizza-data/pizza-data.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CustompizzaResolverService implements Resolve<any> {

    constructor(private readonly pizzaDataService: PizzaDataService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.pizzaDataService.getProducts();
    }
}
