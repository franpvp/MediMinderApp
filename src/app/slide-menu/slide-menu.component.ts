import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';


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

  constructor(private router: Router) { }

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
    this.router.navigate(['/login']);
  }

}
