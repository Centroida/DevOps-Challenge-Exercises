import { Injectable } from '@angular/core';
import { CookieService as CookieSer } from 'ngx-cookie-service';

@Injectable()
export class CookieService {
    constructor(private readonly cookieService: CookieSer) { }

    getCookie(name: string) {
        return this.cookieService.get(name);
    }

    setCookie(name: string, value: string) {
        return this.cookieService.set(name, value, 1, '/');
    }

    removeCookie(name?: string) {
        if (name) {
            return this.cookieService.delete(name, '/');
        }

        return this.cookieService.deleteAll('/');
    }
}
