import { browser, by, element, promise, ElementFinder } from 'protractor';

export class Login {

    private getLoginIngresarButton(): ElementFinder {
        return element(by.id('btnIngresar'));
    }

    getInputUsuario(): ElementFinder {
        return element(by.id('usuario'));
    }

    getInputContrasena(): ElementFinder {
        return element(by.id('contrasena'));
    }

    clickLoginIngresarButton(): promise.Promise<void> {
        return this.getLoginIngresarButton().click();
    }

    esVisibleLoginIngresarButton(): promise.Promise<boolean> {
        return this.getLoginIngresarButton().isDisplayed();
    }

    navigateToLogin(): promise.Promise<any> {
        return browser.get('/login');
    }
}