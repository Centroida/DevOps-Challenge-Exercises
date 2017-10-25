import { AlerterService } from './alerter/alerter.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { UserInfoService } from './user-info/user-info.service';
import { CookieService } from './cookie/cookie.service';
import { NotificatorService } from './notificator/notificator.service';
import { RequesterService } from './requester/requester.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SweetAlertService } from 'ng2-sweetalert2';

@NgModule({
    providers: [
        RequesterService,
        NotificatorService,
        CookieService,
        UserInfoService,
        AuthGuardService,
        SweetAlertService,
        AlerterService,
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parent: CoreModule) {
        if (parent) {
            throw new Error('Core module is already provided!');
        }
    }
}
