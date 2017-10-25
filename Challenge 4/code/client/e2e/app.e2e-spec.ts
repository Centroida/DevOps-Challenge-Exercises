import { element, browser, by } from 'protractor';
import { AppPage } from './app.po';

describe('PizzaNG App Tests', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Should display correct heading message', () => {
        page.navigateToHome();
        expect(element(by.className('heading-content')).getText()).toContain('DELICIOUS PIZZA');
    });

    it('Should open pizza page when clicked navbar button', () => {
        page.navigateToHome();
        element(by.className('pizza')).click();
        expect(browser.getCurrentUrl()).toContain('/pizza/all');
    });

    it('Should open custom pizza page when clicked navbar button', () => {
        page.navigateToHome();
        element(by.className('custompizza')).click();
        expect(browser.getCurrentUrl()).toContain('/pizza/custompizza');
    });

    it('Should registered user successfully', () => {
        page.navigateToHome();
        page.register()
            .then(() => {
                expect(element(by.className('toast')).getText()).toContain('Register');
            });
    });

    it('Should login user successfully', () => {
        page.navigateToHome();
        page.login()
            .then(() => {
                expect(element(by.className('toast')).getText()).toContain('Login');
            })
            .then(() => page.logout());
    });

    it('Should logout user successfully', () => {
        page.navigateToHome();
        page.login()
            .then(() => page.logout())
            .then(() => {
                expect(element(by.className('toast')).getText()).toContain('Logout');
            });
    });

    it('Should open user profile page successfully', () => {
        page.navigateToHome();
        page.login()
            .then(() => browser.get('/users/profile'))
            .then(() => {
                expect(browser.getCurrentUrl()).toContain('/users/profile');
            })
            .then(() => page.logout());
    });

    it('Should open user cart page successfully', () => {
        page.navigateToHome();
        page.login()
            .then(() => browser.get('/users/cart'))
            .then(() => {
                expect(browser.getCurrentUrl()).toContain('/users/cart');
            })
            .then(() => page.logout());
    });
});
