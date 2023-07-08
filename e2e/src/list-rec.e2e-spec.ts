import { browser } from "protractor";
import { ListRec } from "./page-objects/list-rec.po";

describe('Recordatorios Page', () => {
    let listRec: ListRec;

    beforeEach(() => {
        listRec = new ListRec();
        listRec.navigateToListRecPage();
    });
    it('Debería mostrar el texto del medicamento', () => {
        expect(listRec.getTextoMedicamento()).toBeTruthy();
    });
    it('Debería mostrar el texto del tiempo ingresado', () => {
        expect(listRec.getTextoTiempoIng()).toBeTruthy();
    });
    it('Debería mostrar el texto de la duración', () => {
        expect(listRec.getTextoDuracion()).toBeTruthy();
    });
    it('El botón agregar debería redireccionar al page add-rec', () => {
        listRec.clickAgregarButton();
        expect(browser.getCurrentUrl()).toContain('/add-rec');
    });
})