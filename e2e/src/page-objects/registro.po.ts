import { browser, by, element, promise, ElementFinder } from 'protractor';

export class Registro {

    // Método que obtiene input de nombre usuario
    getInputUsuario(): ElementFinder {
        return element(by.id('usuario'));
    }
    // Método que obtiene input nombre
    getNombre(): ElementFinder {
        return element(by.id('nombre'));
    }
    // Método que obtiene input apellido
    getApellido(): ElementFinder {
        return element(by.id('apellido'));
    }
    // Método que obtiene input correo
    getCorreo(): ElementFinder {
        return element(by.id('correo'));
    }
    // Método que obtiene input celular
    getCelular(): ElementFinder {
        return element(by.id('celular'));
    }
    // Método que obtiene input contraseña
    getContrasena(): ElementFinder {
        return element(by.id('contrasena'));
    }
    // Método que obtiene input confirmar contraseña
    getConfirmarContrasena(): ElementFinder {
        return element(by.id('confirmarContrasena'));
    }
    clickConfirmarButton(): ElementFinder {
        return element(by.id('btnIngresar'));
    }
    navigateToRegistroPage(): promise.Promise<any> {
        return browser.get('/registro');
    }
}