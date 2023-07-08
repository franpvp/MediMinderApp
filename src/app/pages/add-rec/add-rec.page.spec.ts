import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing";
import { AddRecPage } from "./add-rec.page";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NativeStorage } from "@awesome-cordova-plugins/native-storage/ngx";
import { IonicModule, AlertController, ToastController } from "@ionic/angular";
import { ApirestService } from "src/app/services/apirest-service/apirest.service";
import { MyPerfilService } from "src/app/services/perfil-service/my-perfil.service";
import { SQLite } from "@awesome-cordova-plugins/sqlite/ngx";
import { Observable, delay, of } from "rxjs";

class SQLiteMock {}

class NativeStorageMock {
  setItem(key: string, value: any): Promise<any> {
    // Simulate the behavior of NativeStorage setItem method
    return Promise.resolve();
  }
}

class ApirestServiceMock {
  getPosts(): Observable<any> {
    const data = [
      { id: 1, nombre: 'Paracetamol' },
      { id: 2, nombre: 'Ibuprofeno' },
      { id: 3, nombre: 'Omeprazol' },
      { id: 4, nombre: 'Amoxicilina' },
      { id: 5, nombre: 'Loratadina' },
      { id: 6, nombre: 'Atorvastatina' },
      { id: 7, nombre: 'Metformina' },
      { id: 8, nombre: 'Diazepam' },
      { id: 9, nombre: 'Fluoxetina' },
      { id: 10, nombre: 'Losartán' }
    ];
    return of(data).pipe(delay(100)); // Simula una respuesta retrasada con 'delay' si es necesario
  }
}

describe('AddRecPage', () => {
  let component: AddRecPage;
  let fixture: ComponentFixture<AddRecPage>;
  let router: jasmine.SpyObj<Router>;
  let alertController: jasmine.SpyObj<AlertController>;
  let myPerfilService: jasmine.SpyObj<MyPerfilService>;
  let toastController: jasmine.SpyObj<ToastController>;

  beforeEach(waitForAsync(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const myPerfilServiceSpy = jasmine.createSpyObj('MyPerfilService', [], { usuario: 'usuarioPrueba' });
    const toastControllerSpy = jasmine.createSpyObj('ToastController', ['create']);
    let alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [AddRecPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: NativeStorage, useClass: NativeStorageMock },
        { provide: MyPerfilService, useValue: myPerfilServiceSpy },
        { provide: ApirestService, useClass: ApirestServiceMock },
        { provide: ToastController, useValue: toastControllerSpy },
        { provide: SQLite, useClass: SQLiteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    myPerfilService = TestBed.inject(MyPerfilService) as jasmine.SpyObj<MyPerfilService>;
    toastController = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should start the timer and navigate to home', fakeAsync(() => {
    const formularioMock: Partial<NgForm> = {
      invalid: false
    };
    component.tiempoIngresado = 1;

    component.iniciarTemporizador(formularioMock as NgForm);
    expect(formularioMock.invalid).toBeFalsy();

    tick(1000);
    expect(component.tiempoRestante).toBeDefined();

    tick(60 * 60 * 1000);
    expect(component.tiempoRestante).toBeUndefined();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));
  it('should display an alert', async () => {
    const alertSpy = jasmine.createSpyObj('alert', ['present']);
    spyOn(alertController, 'create').and.returnValue(Promise.resolve(alertSpy));

    await component.mostrarAlerta();

    expect(alertController.create).toHaveBeenCalledWith({
      header: 'Creación Exitosa',
      cssClass: 'multiline-alert',
      inputs: [
        { type: 'text', value: component.nameMed, disabled: true },
        { type: 'text', value: component.mensajeHoras, disabled: true },
        { type: 'text', value: component.mensajeDias, disabled: true }
      ],
      buttons: ['OK']
    });

    expect(alertSpy.present).toHaveBeenCalledTimes(1);
  });
});

