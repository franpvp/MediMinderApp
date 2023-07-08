import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { DbService } from '../../services/db-service/db.service';
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dbServiceSpy: jasmine.SpyObj<DbService>;
  let myPerfilServiceSpy: jasmine.SpyObj<MyPerfilService>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let nativeStorageSpy: jasmine.SpyObj<NativeStorage>;

  beforeEach(waitForAsync(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const dbServiceSpyObj = jasmine.createSpyObj('DbService', ['createDatabase', 'obtenerDatosUsuario']);
    const myPerfilServiceSpyObj = jasmine.createSpyObj('MyPerfilService', ['setUsuario']);
    const toastControllerSpyObj = jasmine.createSpyObj('ToastController', ['create']);
    const nativeStorageSpyObj = jasmine.createSpyObj('NativeStorage', ['setItem']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: DbService, useValue: dbServiceSpyObj },
        { provide: MyPerfilService, useValue: myPerfilServiceSpyObj },
        { provide: ToastController, useValue: toastControllerSpyObj },
        { provide: NativeStorage, useValue: nativeStorageSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dbServiceSpy = TestBed.inject(DbService) as jasmine.SpyObj<DbService>;
    myPerfilServiceSpy = TestBed.inject(MyPerfilService) as jasmine.SpyObj<MyPerfilService>;
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    nativeStorageSpy = TestBed.inject(NativeStorage) as jasmine.SpyObj<NativeStorage>;

    toastControllerSpy.create.and.returnValue(Promise.resolve({} as HTMLIonToastElement));

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home and save session state when credentials are correct', async () => {
    dbServiceSpy.createDatabase.and.returnValue(Promise.resolve());
    dbServiceSpy.obtenerDatosUsuario.and.returnValue(Promise.resolve({ rows: { length: 1, item: () => ({ username: 'testuser', contrasena: 'testpassword' }) } }));
    nativeStorageSpy.setItem.and.returnValue(Promise.resolve());

    component.user.usuario = 'testuser';
    component.user.password = 'testpassword';
    await component.ingresar();

    expect(dbServiceSpy.createDatabase).toHaveBeenCalled();
    expect(dbServiceSpy.obtenerDatosUsuario).toHaveBeenCalledWith('testuser');
    expect(myPerfilServiceSpy.setUsuario).toHaveBeenCalledWith('testuser');
    expect(nativeStorageSpy.setItem).toHaveBeenCalledWith('estadoSesion', { estaLogeado: true });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show error toast when credentials are incorrect', async () => {
    dbServiceSpy.createDatabase.and.returnValue(Promise.resolve());
    dbServiceSpy.obtenerDatosUsuario.and.returnValue(Promise.resolve({ rows: { length: 0 } }));
    toastControllerSpy.create.and.returnValue(Promise.resolve({} as HTMLIonToastElement));

    component.user.usuario = 'testuser';
    component.user.password = 'testpassword';
    await component.ingresar();

    expect(dbServiceSpy.createDatabase).toHaveBeenCalled();
    expect(dbServiceSpy.obtenerDatosUsuario).toHaveBeenCalledWith('testuser');
    expect(toastControllerSpy.create).toHaveBeenCalledWith({
      message: 'Nombre de usuario o contraseña incorrectos.',
      duration: 2000,
      cssClass: 'toast-centered'
    } as any);
  });

  it('should show error toast when username or password are empty', async () => {
    component.user.usuario = '';
    component.user.password = '';
    await component.ingresar();

    expect(toastControllerSpy.create).toHaveBeenCalledWith({
      message: 'Debe llenar todos los campos.',
      duration: 2000,
      cssClass: 'toast-centered'
    } as any);
  });

});
