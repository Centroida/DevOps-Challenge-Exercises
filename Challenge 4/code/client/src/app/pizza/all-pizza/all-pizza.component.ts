import { Subscription } from 'rxjs/Subscription';
import { Pizza } from './../../models/Pizza';
import { NotificatorService } from './../../core/notificator/notificator.service';
import { PizzaDataService } from './../pizza-data/pizza-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-all-pizza',
    templateUrl: './all-pizza.component.html',
    styleUrls: ['./all-pizza.component.css']
})
export class AllPizzaComponent implements OnInit {
    public pizza: Pizza[];
    public currentPage = 1;
    public filter = 'all';

    constructor(private readonly activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.pizza = this.activatedRoute.snapshot.data['pizza']['data'][0];
    }

    pageChanged(pageNumber) {
        this.currentPage = pageNumber;
    }

    changeFilter(event) {
        this.filter = event.target.innerHTML;
    }
}
