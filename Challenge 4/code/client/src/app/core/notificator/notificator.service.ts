import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class NotificatorService {

    constructor(private readonly toastr: ToastsManager) { }

    init(vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    showSuccess(msg: string) {
        this.toastr.success(msg, 'Success!');
    }

    showError(msg: string) {
        this.toastr.error(msg, 'Error!');
    }

    showWarning(msg: string) {
        this.toastr.warning(msg, 'Warning!');
    }

    showInfo(msg: string) {
        this.toastr.info(msg, 'Info!');
    }
}
