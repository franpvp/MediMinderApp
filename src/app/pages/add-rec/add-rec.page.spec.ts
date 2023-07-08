import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AddRecPage } from './add-rec.page';

describe('AddRecPage', () => {
  let component: AddRecPage;
  let fixture: ComponentFixture<AddRecPage>;
  let router: Router;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRecPage],
      imports: [FormsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(AddRecPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
    
  }));

  it('Debería comenzar el temporizador', fakeAsync(() => {
    spyOn(window, 'setInterval').and.callThrough();
    spyOn(window, 'clearInterval').and.callThrough();
    spyOn(component, 'obtenerTiempoRestante').and.stub();
    spyOn(component, 'mostrarAlertaTermino').and.stub();
    spyOn(component, 'recordatorio').and.stub();
    spyOn(component, 'mostrarAlerta').and.returnValue(Promise.resolve());

    component.tiempoIngresado = 1;

    const formularioMock: Partial<NgForm> = {
      invalid: false
    };

    component.iniciarTemporizador(formularioMock as NgForm);
    expect(formularioMock.invalid).toBeFalsy();
    expect(window.setInterval).toHaveBeenCalled();

    // Simulate passage of time
    tick(1000);

    expect(component.obtenerTiempoRestante).toHaveBeenCalled();

    // Simulate timer completion
    tick(60 * 60 * 1000);

    expect(component.mostrarAlertaTermino).toHaveBeenCalled();
    expect(window.clearInterval).toHaveBeenCalled();
    expect(component.recordatorio).toHaveBeenCalled();
    expect(component.mostrarAlerta).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);

  }));

  it('No debería mostrar el temporizador si el formulario es inválido', () => {
    spyOn(window, 'setInterval').and.callThrough();

    const formularioMock: Partial<NgForm> = {
      invalid: true
    };

    component.iniciarTemporizador(formularioMock as NgForm);

    expect(formularioMock.invalid).toBeTruthy();
    expect(window.setInterval).not.toHaveBeenCalled();
  });
  it('should obtain remaining time', () => {
    const tiempoFinalizacion = new Date();
    const ahora = new Date(tiempoFinalizacion.getTime() - 1000); // 1 second earlier

    const tiempoRestante = component.obtenerTiempoRestante(tiempoFinalizacion, ahora);

    expect(tiempoRestante).toBe('00:00:01');
  });

  it('Debería mostrar la alerta de termino', () => {
    spyOn(window, 'alert');

    component.mostrarAlertaTermino();

    expect(window.alert).toHaveBeenCalledWith('Timer completed!');
  });

  it('Debería mostrar el recordatorio', () => {
    spyOn(window, 'alert');

    component.recordatorio();

    expect(window.alert).toHaveBeenCalledWith('Don\'t forget!');
  });

  it('Debería mostrar la alerta', async () => {
    spyOn(window, 'alert');

    await component.mostrarAlerta();

    expect(window.alert).toHaveBeenCalledWith('Alert!');
  });

  it('Debería navegar al home', fakeAsync(() => {
    spyOn(router, 'navigate');

    tick(1000);

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));
});
