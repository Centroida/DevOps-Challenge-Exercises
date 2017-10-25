import { UserInfoService } from './../user-info/user-info.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private readonly userInfoService: UserInfoService,
        private readonly router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const check = this.userInfoService.isLoggedUser();
        if (!check) {
            this.router.navigateByUrl('/');
        }

        return check;
    }
}
