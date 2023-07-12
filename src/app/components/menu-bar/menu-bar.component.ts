import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule, MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    IonicModule,
    FormsModule,
    MatMenuModule,
  ],
})
export class MenuBarComponent  implements OnInit {

  menu!: MatMenuPanel<any> | null;
  estaLogeado: boolean = false;

  constructor(private router: Router, private nativeStorage: NativeStorage) { }

  ngOnInit() {}

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  toHome() {
    this.router.navigate(['/home']);
  }

  toPerfil() {
    this.router.navigate(['/perfil']);
  }

  toCrearRec() {
    this.router.navigate(['/add-rec']);
  }

  toRegistroRec() {
    this.router.navigate(['/list-rec']);
  }

  cerrarSesion() {
    // Redireccionar al componente de login
    this.estaLogeado = false;
    this.guardarEstadoSesion();
    this.router.navigate(['/login']);
  }

  // NATIVE STORAGE
  guardarEstadoSesion() {
    this.nativeStorage.setItem('estadoSesion', { estaLogeado: this.estaLogeado })
    .then(() => {
      console.log('Estado de sesión guardado correctamente', this.estaLogeado);
    }).catch((error) => {
      console.log('Error al guardar el estado de sesión: ', error);
    })
  }

}
