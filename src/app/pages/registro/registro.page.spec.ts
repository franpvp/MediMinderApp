import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { RegistroPage, MyErrorStateMatcher } from './registro.page';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db-service/db.service';
import { ToastController } from '@ionic/angular';
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';

class MockFormGroupDirective {
  form: FormGroup = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl(''),
    confPassword: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    correo: new FormControl(''),
    celular: new FormControl('')
  });

  dirty: true;
  valid: true;
  submitted: false;
}

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dbServiceSpy: jasmine.SpyObj<DbService>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let myPerfilServiceSpy: jasmine.SpyObj<MyPerfilService>;

  beforeEach(waitForAsync(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const dbServiceSpyObj = jasmine.createSpyObj('DbService', ['createDatabase', 'validarUsuario', 'agregarUsuario', 'agregarDatosPerfil']);
    const toastControllerSpyObj = jasmine.createSpyObj('ToastController', ['create']);
    const myPerfilServiceSpyObj = jasmine.createSpyObj('MyPerfilService', ['setUsuario']);

    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: DbService, useValue: dbServiceSpyObj },
        { provide: ToastController, useValue: toastControllerSpyObj },
        { provide: MyPerfilService, useValue: myPerfilServiceSpyObj },
        { provide: FormGroupDirective, useClass: MockFormGroupDirective } // Use the mocked FormGroupDirective
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dbServiceSpy = TestBed.inject(DbService) as jasmine.SpyObj<DbService>;
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    myPerfilServiceSpy = TestBed.inject(MyPerfilService) as jasmine.SpyObj<MyPerfilService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createDatabase and agregarUsuario methods when form is valid', () => {
    component.myForm.controls.usuario.setValue('user123');
    component.myForm.controls.password.setValue('Prueba123');
    component.myForm.controls.confPassword.setValue('Prueba123');
    component.myForm.controls.nombre.setValue('NombreUser');
    component.myForm.controls.apellido.setValue('ApellidoUser');
    component.myForm.controls.correo.setValue('testuser@gmail.com');
    component.myForm.controls.celular.setValue('912345678');

    component.confirmar();

    expect(dbServiceSpy.createDatabase).toHaveBeenCalled();
    expect(dbServiceSpy.agregarUsuario).toHaveBeenCalledWith('user123', 'Prueba123');
    expect(dbServiceSpy.agregarDatosPerfil).toHaveBeenCalledWith('user123', 'NombreUser', 'ApellidoUser', 'testuser@gmail.com', '912345678');
    expect(myPerfilServiceSpy.setUsuario).toHaveBeenCalledWith('user123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show error toast when passwords do not match', () => {
    component.myForm.controls.usuario.setValue('user123');
    component.myForm.controls.password.setValue('Prueba123');
    component.myForm.controls.confPassword.setValue('Prueba122');
    component.myForm.controls.nombre.setValue('NombreUser');
    component.myForm.controls.apellido.setValue('ApellidoUser');
    component.myForm.controls.correo.setValue('testuser@gmail.com');
    component.myForm.controls.celular.setValue('912345678');

    component.confirmar();

    expect(toastControllerSpy.create).toHaveBeenCalledWith({
      message: 'Las contraseñas no coinciden.',
      duration: 2000,
      cssClass: 'toast-centered'
    });
  });

  it('should show error toast when form is not valid', () => {
    component.myForm.controls.usuario.setValue('');
    component.myForm.controls.password.setValue('Prueba123');
    component.myForm.controls.confPassword.setValue('Prueba123');
    component.myForm.controls.nombre.setValue('NombreUser');
    component.myForm.controls.apellido.setValue('ApellidoUser');
    component.myForm.controls.correo.setValue('testuser@gmail.com');
    component.myForm.controls.celular.setValue('912345678');

    component.confirmar();

    expect(toastControllerSpy.create).toHaveBeenCalledWith({
      message: 'Debe llenar todos los campos.',
      duration: 2000,
      cssClass: 'toast-centered'
    });
  });

});
