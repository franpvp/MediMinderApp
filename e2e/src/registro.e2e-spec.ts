import { browser } from "protractor";
import { Registro } from "./page-objects/registro.po";

describe('Registro Page', () => {
    let registroPage: Registro;

    beforeEach(() =>{
        registroPage = new Registro();
        registroPage.navigateToRegistroPage();
    });

    it('Debería mostrarse el título del formulario de registro', () => {
        expect(registroPage.getTituloRegistro()).toBeTruthy();
    })

    it('Debería tener contenido el input nombre de usuario', () => {
        expect(registroPage.getInputUsuario()).toBeTruthy();
    });

    it('Debería requerir un nombre de usuario válido', () => {
        registroPage.getInputUsuario().sendKeys('user123');
        expect(registroPage.getInputUsuario().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir un nombre válido', () => {
        registroPage.getInputNombre().sendKeys('francisca');
        expect(registroPage.getInputNombre().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir un apellido válido', () => {
        registroPage.getInputApellido().sendKeys('valdivia');
        expect(registroPage.getInputApellido().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir un correo válido', () => {
        registroPage.getInputCorreo().sendKeys('fran@gmail.com');
        expect(registroPage.getInputCorreo().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir un celular válido', () => {
        registroPage.getInputCelular().sendKeys('francisca');
        expect(registroPage.getInputCelular().getAttribute('error-text')).toBeTruthy();
    });

    it('Debería requerir una contraseña válido', () => {
        registroPage.getInputContrasena().sendKeys('francisca');
        expect(registroPage.getInputContrasena().getAttribute('error-text')).toBeTruthy();
    });

    it('Deberían coincidir las contraseñas válido', () => {
        registroPage.getInputConfirmarContrasena().sendKeys('Prueba123');
        expect(registroPage.getInputConfirmarContrasena().getAttribute('error-text')).toBeTruthy();
    });

    it('El botón redirecciona al home', () => {
        registroPage.clickRegistroConfirmarButton();
        expect(browser.getCurrentUrl()).toContain('/home');
    });
})