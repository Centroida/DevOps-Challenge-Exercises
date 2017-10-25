import { LogoutComponent } from './shared/authentication/logout/logout.component';
import { AuthGuardService } from './core/auth-guard/auth-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },

    { path: 'users', loadChildren: './users/users.module#UsersModule' },
    { path: 'pizza', loadChildren: './pizza/pizza.module#PizzaModule' },

    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
