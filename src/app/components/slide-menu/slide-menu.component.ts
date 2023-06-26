import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
  ],
})
export class SlideMenuComponent  implements OnInit {

  estaLogeado: boolean = false;

  constructor(private router: Router, private nativeStorage: NativeStorage) { }

  ngOnInit() {}

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

  guardarEstadoSesion() {
    this.nativeStorage.setItem('estadoSesion', { estaLogeado: this.estaLogeado })
    .then(() => {
      console.log('Estado de sesión guardado correctamente', this.estaLogeado);
    }).catch((error) => {
      console.log('Error al guardar el estado de sesión: ', error);
    })
  }

}
