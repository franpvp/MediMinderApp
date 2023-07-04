import { browser } from "protractor";
import { Registro } from "./page-objects/registro.po";

describe('Registro Page', () => {
    let registroPage: Registro;

    beforeEach(() =>{
        registroPage = new Registro();
        registroPage.navigateToRegistroPage();
    });

    it('Debería tener contenido el input nombre de usuario', () => {
        expect(registroPage.getInputUsuario()).toBeTruthy();
    });

    it('Debería requerir un nombre de usuario válido', () => {
        registroPage.getInputUsuario().sendKeys('user123');
        registroPage.clickConfirmarButton().click();
        expect(registroPage.getInputUsuario().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir un nombre válido', () => {
        registroPage.getNombre().sendKeys('francisca');
        registroPage.clickConfirmarButton().click();
        expect(registroPage.getNombre().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir un apellido válido', () => {
        registroPage.getApellido().sendKeys('valdivia');
        registroPage.clickConfirmarButton().click();
        expect(registroPage.getApellido().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir un correo válido', () => {
        registroPage.getCorreo().sendKeys('fran@gmail.com');
        registroPage.clickConfirmarButton().click();
        expect(registroPage.getCorreo().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir un celular válido', () => {
        registroPage.getCelular().sendKeys('francisca');
        registroPage.clickConfirmarButton().click();
        expect(registroPage.getCelular().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir una contraseña válido', () => {
        registroPage.getContrasena().sendKeys('francisca');
        registroPage.clickConfirmarButton().click();
        expect(registroPage.getContrasena().getAttribute('error-text')).toBeTruthy();
    });

    it('Deberían coincidir las contraseñas válido', () => {
        registroPage.getConfirmarContrasena().sendKeys('Prueba123');
        registroPage.clickConfirmarButton().click();
        expect(registroPage.getConfirmarContrasena().getAttribute('error-text')).toBeTruthy();
    });

    it('El botón redirecciona al home', () => {
        registroPage.clickConfirmarButton();
        expect(browser.getCurrentUrl()).toContain('/home');
    });
})