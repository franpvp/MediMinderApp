import { browser, by, element, promise, ElementFinder } from 'protractor';

export class Login {

    private getLoginIngresarButton(): ElementFinder {
        return element(by.id('btnIngresar'));
    }
    private getLoginCrearButton(): ElementFinder {
        return element(by.id('btn-crear'));
    }
    getTituloLogin(): ElementFinder {
        return element(by.id('titulo-login'));
    }
    getInputUsuario(): ElementFinder {
        return element(by.id('usuario'));
    }
    getInputContrasena(): ElementFinder {
        return element(by.id('contrasena'));
    }
    getSpinner(): ElementFinder {
        return element(by.id('spinner'));
    }
    clickLoginIngresarButton(): promise.Promise<void> {
        return this.getLoginIngresarButton().click();
    }
    esVisibleLoginIngresarButton(): promise.Promise<boolean> {
        return this.getLoginIngresarButton().isDisplayed();
    }
    clickLoginCrearButton(): promise.Promise<void> {
        return this.getLoginCrearButton().click();
    }
    esVisibleLoginCrearButton(): promise.Promise<boolean> {
        return this.getLoginCrearButton().isDisplayed();
    }
    
    navigateToLogin(): promise.Promise<any> {
        return browser.get('/login');
    }
}