import { browser } from "protractor";
import { Home } from "./page-objects/home.po";

describe('Home Page', () => {
    let homePage: Home;

    beforeEach(() => {
        homePage = new Home();
        homePage.navigateToHomePage();
    });

    it('Debería aparecer el botón para crear recordatorios', () => {
        expect(homePage.esVisibleCrearRecordatorioButton()).toBeTruthy();
    });

    it('El botón crear recordatorio debería redireccionar al page add-rec', () => {
        homePage.clickCrearRecordatorioButton();
        expect(browser.getCurrentUrl()).toContain('/add-rec');
    });

    it('Se muestra botón para visualizar los recordatorios ', () => {
        expect(homePage.esVisibleListaRecordatorioButton()).toBeTruthy();
    })

    it('El botón recordatorios redirecciona al page list-rec', () => {
        homePage.clickListaRecordatorioButton();
        expect(browser.getCurrentUrl()).toContain('/list-rec');
    })
});