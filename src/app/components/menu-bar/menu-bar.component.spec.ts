import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MenuBarComponent } from './menu-bar.component';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


class NativeStorageMock {
  setItem(key: string, value: any): Promise<any> {
    // Simulate the behavior of NativeStorage setItem method
    return Promise.resolve();
  }
}

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatExpansionModule,
        FormsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: NativeStorage, useClass: NativeStorageMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuBarComponent);
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

  it('should navigate to login and save session state', () => {
    component.cerrarSesion();

    expect(component.estaLogeado).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
