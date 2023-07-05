import { browser, by, element, promise, ElementFinder } from 'protractor';

export class Registro {

    private getRegistroConfirmarButton(): ElementFinder {
        return element(by.id('btnIngresar'));
    }
    // Método que obtiene input de nombre usuario
    getInputUsuario(): ElementFinder {
        return element(by.id('usuario'));
    }
    // Método que obtiene input nombre
    getInputNombre(): ElementFinder {
        return element(by.id('nombre'));
    }
    // Método que obtiene input apellido
    getInputApellido(): ElementFinder {
        return element(by.id('apellido'));
    }
    // Método que obtiene input correo
    getInputCorreo(): ElementFinder {
        return element(by.id('correo'));
    }
    // Método que obtiene input celular
    getInputCelular(): ElementFinder {
        return element(by.id('celular'));
    }
    // Método que obtiene input contraseña
    getInputContrasena(): ElementFinder {
        return element(by.id('contrasena'));
    }
    // Método que obtiene input confirmar contraseña
    getInputConfirmarContrasena(): ElementFinder {
        return element(by.id('confirmarContrasena'));
    }

    clickRegistroConfirmarButton(): promise.Promise<void> {
        return this.getRegistroConfirmarButton().click();
    }

    esVisibleRegistroConfirmarButton(): promise.Promise<boolean> {
        return this.getRegistroConfirmarButton().isDisplayed();
    }
    
    navigateToRegistroPage(): promise.Promise<any> {
        return browser.get('/registro');
    }
}