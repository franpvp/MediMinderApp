import { browser } from "protractor";
import { Login } from "./page-objects/login.po";

describe('Login Page', () => {
    let login: Login;

    beforeEach(() => {
        login = new Login();
        login.navigateToLogin();
    });
    it('Debería mostrar el título del page Login', () => {
        expect(login.getTituloLogin()).toBeTruthy();
    });
    it('Debería requerir un nombre de usuario', () => {
        login.getInputUsuario().sendKeys('user123');
        expect(login.getInputUsuario()).toBeTruthy();
    });
    it('Debería requerir una contraseña', () => {
        login.getInputContrasena().sendKeys('Prueba123');
        expect(login.getInputContrasena()).toBeTruthy();
    });
    it('El botón ingresar debería redireccionar a page home', () => {
        login.clickLoginIngresarButton();
        expect(browser.getCurrentUrl()).toContain('/home');
    });
    it('El botón crear cuenta debería redireccionar al page registro', () => {
        login.clickLoginCrearButton();
        expect(browser.getCurrentUrl()).toContain('/registro');
    });
    it('Se muestra botón ingresar del login', () => {
        expect(login.esVisibleLoginIngresarButton()).toBeTruthy();
    });
    it('Se muestra botón crear cuenta en login', () => {
        expect(login.esVisibleLoginCrearButton()).toBeTruthy();
    });
    it('Debería aparecer el spinner', () => {
        expect(login.getSpinner()).toBeTruthy();
    });
});