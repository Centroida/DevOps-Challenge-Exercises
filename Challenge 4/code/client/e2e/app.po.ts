import { browser, by, element } from 'protractor';

export class AppPage {
    navigateToHome() {
        return browser.get('/');
    }

    register() {
        element(by.className('register')).click();
        element(by.name('username')).sendKeys('Test123');
        element(by.name('password')).sendKeys('Test1est');
        element(by.name('firstName')).sendKeys('Test');
        element(by.name('lastName')).sendKeys('Testov');
        element(by.name('address')).sendKeys('Sofia, Bulgaria');
        element(by.name('phone')).sendKeys(1231231233);
        return element(by.buttonText('Register')).click();
    }

    login() {
        element(by.className('login')).click();
        element(by.name('username')).sendKeys('Test123');
        element(by.name('password')).sendKeys('Test1est');
        return element(by.buttonText('Log in')).click();
    }

    logout() {
        return browser.get('/logout');
    }
}
