import { ElementFinder, element, by, promise, browser } from "protractor";

export class AddRec {
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

    clickConfirmarButton(): ElementFinder {
        return element(by.id('btnConfirmar'));
    }

    navigateToAddRecPage(): promise.Promise<any> {
        return browser.get('/add.rec');
    }
}