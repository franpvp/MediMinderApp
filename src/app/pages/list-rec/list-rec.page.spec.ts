import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';
import { RecordatorioService } from '../../services/recordatorio-service/recordatorio.service';
import { ListRecPage } from './list-rec.page';

describe('ListRecPage', () => {
  let component: ListRecPage;
  let fixture: ComponentFixture<ListRecPage>;
  let nativeStorageMock: jasmine.SpyObj<NativeStorage>;
  let myPerfilServiceMock: jasmine.SpyObj<MyPerfilService>;
  let recordatorioServiceMock: jasmine.SpyObj<RecordatorioService>;

  beforeEach(waitForAsync(() => {
    const nativeStorageSpy = jasmine.createSpyObj('NativeStorage', ['getItem', 'setItem']);
    const myPerfilServiceSpy = jasmine.createSpyObj('MyPerfilService', ['getUsuario']);
    const recordatorioServiceSpy = jasmine.createSpyObj('RecordatorioService', []);

    TestBed.configureTestingModule({
      declarations: [ListRecPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: NativeStorage, useValue: nativeStorageSpy },
        { provide: MyPerfilService, useValue: myPerfilServiceSpy },
        { provide: RecordatorioService, useValue: recordatorioServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListRecPage);
    component = fixture.componentInstance;
    nativeStorageMock = TestBed.inject(NativeStorage) as jasmine.SpyObj<NativeStorage>;
    myPerfilServiceMock = TestBed.inject(MyPerfilService) as jasmine.SpyObj<MyPerfilService>;
    recordatorioServiceMock = TestBed.inject(RecordatorioService) as jasmine.SpyObj<RecordatorioService>;

    nativeStorageMock.getItem.and.returnValue(Promise.resolve({}));
    nativeStorageMock.setItem.and.returnValue(Promise.resolve());
    myPerfilServiceMock.getUsuario.and.returnValue('testuser');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerDatos on ngOnInit', () => {
    component.ngOnInit();

    expect(myPerfilServiceMock.getUsuario).toHaveBeenCalled();
    expect(nativeStorageMock.getItem).toHaveBeenCalledWith('recordatoriosPorUsuario');
    expect(component.listaNativeStorage).toEqual([]);
  });

  it('should call obtenerDatos on borrarDatos', () => {
    component.borrarDatos(1);

    expect(myPerfilServiceMock.getUsuario).toHaveBeenCalled();
    expect(nativeStorageMock.getItem).toHaveBeenCalledWith('recordatoriosPorUsuario');
    expect(nativeStorageMock.setItem).toHaveBeenCalledWith('recordatoriosPorUsuario', jasmine.any(Object));
    expect(component.obtenerDatos).toHaveBeenCalled();
  });
});

