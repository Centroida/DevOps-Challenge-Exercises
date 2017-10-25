import { UsersDataService } from './../users-data/users-data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';

describe('OrdersComponent Tests', () => {
    let subscription;
    let userDataService;
    let notificator;
    let component = new OrdersComponent(userDataService, notificator);

    let callResult = {
        count: 0,
        args: [],
    };

    it('Expect to be defined', () => {
        expect(component).toBeDefined();
    });

    describe('ngOnInit Tests', () => {
        beforeEach(() => {
            callResult = {
                count: 0,
                args: [],
            };

            subscription = {
                subscribe(success, error) {
                    callResult.count++;
                    callResult.args.push(success);
                    callResult.args.push(error);
                }
            };

            userDataService = {
                getUserOrders() {
                    callResult.count++;
                    return subscription;
                }
            };

            notificator = {
                showError(msg) {
                    callResult.count++;
                    callResult.args.push(msg);
                }
            };

            component = new OrdersComponent(userDataService, notificator);
        });

        it('Expect to call userDataService getUserOrders method once and subscribe once', () => {
            component.ngOnInit();
            expect(callResult.count).toEqual(2);
        });
        it('Expect to call subscribe with two callbacks', () => {
            component.ngOnInit();
            expect(callResult.args.length).toEqual(2);
        });
        it('Expect when call second callback to call notificator once with correct parameter', () => {
            component.ngOnInit();

            const callback = callResult.args[1];
            callResult = { count: 0, args: [] };

            callback({ error: { message: 'hello' } });
            expect(callResult.count).toEqual(1);
            expect(callResult.args[0]).toEqual('hello');
        });
    });

    describe('ngOnDestroy Tests', () => {
        beforeEach(() => {
            callResult = {
                count: 0,
                args: [],
            };

            subscription = {
                subscribe(success, error) {
                    return {
                        unsubscribe() {
                            callResult.count++;
                        }
                    };
                }
            };

            userDataService = {
                getUserOrders() {
                    return subscription;
                }
            };

            notificator = {
                showError(msg) {
                }
            };

            component = new OrdersComponent(userDataService, notificator);
        });

        it('Expect to call unsubscribe once when called after ngOnInit', () => {
            component.ngOnInit();
            component.ngOnDestroy();

            expect(callResult.count).toEqual(1);
        });
    });
});
