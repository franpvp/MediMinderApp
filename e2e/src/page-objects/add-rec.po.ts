import { ElementFinder, element, by, promise, browser } from "protractor";

export class AddRec {
    private getAddConfirmarButton(): ElementFinder {
        return element(by.id('btnConfirmar'));
    }
    getTituloAddRec(): ElementFinder {
        return element(by.id('titulo-addrec'));
    }
    // Método para obtener el input del medicamento
    getInputMedicamento(): ElementFinder {
        return element(by.id('medicamento'));
    }

    getInputTiempoIng(): ElementFinder {
        return element(by.id('tiempoIngresado'));
    }

    getInputDias(): ElementFinder {
        return element(by.id('dias'));
    }

    clickAddConfirmarButton(): promise.Promise<void> {
        return this.getAddConfirmarButton().click();
    }

    esVisibleAddConfirmarButton(): promise.Promise<boolean> {
        return this.getAddConfirmarButton().isDisplayed();
    }

    navigateToAddRecPage(): promise.Promise<any> {
        return browser.get('/add.rec');
    }
}