import { Injectable } from '@angular/core';
import { SweetAlertService } from 'ng2-sweetalert2';
import swal from 'sweetalert2';

@Injectable()
export class AlerterService {

    constructor() { }

    showSuccessAlert(title, message) {
        swal(title, message, 'success');
    }

    showWarningAlert(title, message) {
        swal(title, message, 'warning');
    }

    showErrorAlert(title, message) {
        swal(title, message, 'error');
    }

    showAddOrderSuggestion(name, imageUrl) {
        return new Promise((resolve, reject) => {
            swal({
                title: 'Add pizza to cart?',
                text: `Do you want to add ${name}?`,
                imageUrl,
                confirmButtonColor: '#40A104',
                confirmButtonText: 'Yes, add it!',
                cancelButtonText: 'Cancel',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                preConfirm: () => {
                    return new Promise((res) => setTimeout(() => res(), 500));
                },
            }).then(() => {
                resolve();
            }, () => {
                reject();
            });
        });
    }

    showPurchaseSuggestion() {
        return new Promise((resolve, reject) => {
            swal({
                title: 'Order pizza?',
                text: `Do you want to order the pizza from your cart?`,
                type: 'info',
                confirmButtonText: 'Yes, order it!',
                confirmButtonColor: '#40A104',
                showCancelButton: true,
                cancelButtonText: 'Cancel order!',
                cancelButtonColor: '#FF0000',
                allowOutsideClick: false,
            }).then(() => {
                resolve();
            }, () => {
                reject('Cancelled order!');
            });
        });
    }

    askForAddressSuggestion() {
        return new Promise((resolve, reject) => {
            swal({
                title: 'Use your default address?',
                text: `Do you want to order the pizza to your default address?`,
                type: 'info',
                confirmButtonText: 'Yes!',
                confirmButtonColor: '#40A104',
                showCancelButton: true,
                cancelButtonText: 'No, use another address',
                allowOutsideClick: false,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return new Promise((res) => setTimeout(() => res(), 500));
                },
            }).then(() => {
                resolve();
            }, () => {
                reject();
            });
        });
    }

    getAddressSuggestion() {
        return new Promise((resolve, reject) => {
            swal({
                title: 'Address:',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Order!',
                showLoaderOnConfirm: true,
                preConfirm: (address) => {
                    return new Promise((res) => setTimeout(() => res(), 500));
                    // return new Promise(function (res, rej) {
                    //     setTimeout(function () {
                    //         if (email === 'taken@example.com') {
                    //             rej('This email is already taken.');
                    //         } else {
                    //             res();
                    //         }
                    //     }, 2000);
                    // });
                },
                allowOutsideClick: false
            }).then((address) => {
                resolve(address);
            }, () => {
                reject('Cancelled order!');
            });
        });
    }
}
