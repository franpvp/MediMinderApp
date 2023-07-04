import { browser, by, element, promise, ElementFinder } from 'protractor';

export class Home {
    // Método que obtiene el boton de Crear Recordatorio mediante id
    private getCrearRecordatorioButton(): ElementFinder {
        return element(by.id('btnCrearRec'));
    }
    private getListaRecordatorioButton(): ElementFinder {
        return element(by.id('btnListRec'));
    }
    // Método que lleva a Page Crear Recordatorio
    clickCrearRecordatorioButton(): promise.Promise<void> {
        return this.getCrearRecordatorioButton().click();
    }
    // Método que verifica que el boton Crear Recordatorio está visible en la page
    esVisibleCrearRecordatorioButton(): promise.Promise<boolean> {
        return this.getCrearRecordatorioButton().isDisplayed();
    }

    clickListaRecordatorioButton(): promise.Promise<void> {
        return this.getListaRecordatorioButton().click();
    }

    esVisibleListaRecordatorioButton(): promise.Promise<boolean> {
        return this.getListaRecordatorioButton().isDisplayed();
    }

    navigateToHomePage(): promise.Promise<any> {
        return browser.get('/');
    }

}