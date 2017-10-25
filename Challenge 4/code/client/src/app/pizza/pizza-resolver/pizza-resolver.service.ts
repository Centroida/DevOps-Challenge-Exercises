import { PizzaDataService } from './../pizza-data/pizza-data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PizzaResolverService implements Resolve<any> {

    constructor(private readonly pizzaDataService: PizzaDataService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.pizzaDataService.getAllPizza();
    }
}
