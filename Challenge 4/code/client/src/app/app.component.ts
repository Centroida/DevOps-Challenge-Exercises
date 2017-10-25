import { NotificatorService } from './core/notificator/notificator.service';
import { Component, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(
        private readonly notificator: NotificatorService,
        private readonly vcr: ViewContainerRef) {
        this.notificator.init(vcr);
    }
}
