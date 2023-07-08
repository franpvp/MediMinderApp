import { browser, by, element, promise, ElementFinder } from 'protractor';

export class ListRec {

    private getEliminarButton(): ElementFinder {
        return element(by.id('btn-eliminar'));
    }
    private getAgregarButton(): ElementFinder {
        return element(by.id('btn-agregar'));
    }

    getTextoMedicamento(): ElementFinder {
        return element(by.id('texto-medicamento'));
    }

    getTextoTiempoIng(): ElementFinder {
        return element(by.id('texto-tiempo-ing'));
    }

    getTextoDuracion(): ElementFinder {
        return element(by.id('texto-duracion'));
    }

    clickEliminarButton(): promise.Promise<void> {
        return this.getEliminarButton().click();
    }
    clickAgregarButton(): promise.Promise<void> {
        return this.getAgregarButton().click();
    }
    esVisibleEliminarButton(): promise.Promise<boolean> {
        return this.getEliminarButton().isDisplayed();
    }
    esVisibleAgregarButton(): promise.Promise<boolean> {
        return this.getAgregarButton().isDisplayed();
    }
    navigateToListRecPage(): promise.Promise<any> {
        return browser.get('/list-rec');
    }
}