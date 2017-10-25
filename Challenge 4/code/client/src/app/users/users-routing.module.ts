import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuardService } from './../core/auth-guard/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] },
    { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
