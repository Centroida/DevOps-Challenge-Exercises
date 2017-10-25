import { SharedModule } from './../shared/shared.module';
import { UsersDataService } from './users-data/users-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';
import { OrderDetailsPipe } from './order-details/order-details.pipe';
import { DeliveryStatusPipe } from './delivery-status/delivery-status.pipe';
import { ShowPizzaProductsPipe } from '../pizza/pizza-products/showPizzaProducts.pipe';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        UsersRoutingModule
    ],
    declarations: [
        ProfileComponent,
        OrdersComponent,
        ShoppingCartComponent,
        OrderDetailsPipe,
        DeliveryStatusPipe,
        ShowPizzaProductsPipe,
    ],
    providers: [
        UsersDataService
    ]
})
export class UsersModule { }
