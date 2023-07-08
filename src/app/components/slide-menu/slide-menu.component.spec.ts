import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SlideMenuComponent } from './slide-menu.component';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

class NativeStorageMock {
  setItem(key: string, value: any): Promise<any> {
    // Simulate the behavior of NativeStorage setItem method
    return Promise.resolve();
  }
}

describe('SlideMenuComponent', () => {
  let component: SlideMenuComponent;
  let fixture: ComponentFixture<SlideMenuComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        FormsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: NativeStorage, useClass: NativeStorageMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to home', () => {
    component.toHome();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
  it('should navigate to perfil', () => {
    component.toPerfil();

    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
  });
  it('should navigate to crear-rec', () => {
    component.toCrearRec();

    expect(router.navigate).toHaveBeenCalledWith(['/add-rec']);
  });
  it('should navigate to list-rec', () => {
    component.toListRec();

    expect(router.navigate).toHaveBeenCalledWith(['/list-rec']);
  });
  it('should navigate to login and save session state', () => {
    component.cerrarSesion();

    expect(component.estaLogeado).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
