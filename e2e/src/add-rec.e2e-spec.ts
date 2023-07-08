import { browser } from "protractor";
import { AddRec } from "./page-objects/add-rec.po";

describe('Add-rec Page', () => {
    let addRec: AddRec;

    beforeEach(() => {
        addRec = new AddRec();
        addRec.navigateToAddRecPage();
    });
    it('Debería mostrar el título del formulario de Add-rec', () => {
        expect(addRec.getTituloAddRec()).toBeTruthy();
    })

    it('Debería tener contenido el input medicamento', () => {
        expect(addRec.getInputMedicamento()).toBeTruthy();
    });
    it('Debería tener contenido el input tiempo ingresado', () => {
        expect(addRec.getInputTiempoIng()).toBeTruthy();
    });
    it('Debería tener contenido el input duracion', () => {
        expect(addRec.getInputDias()).toBeTruthy();
    });
    it('El botón confirmar debería redireccionar al page Home', () => {
        addRec.clickAddConfirmarButton();
        expect(browser.getCurrentUrl()).toContain('/home');
    });
    it('El botón agregar debería visualizarse en el page add-rec', () => {
        expect(addRec.esVisibleAddConfirmarButton()).toBeTruthy();
    })
    
})