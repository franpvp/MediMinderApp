import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
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
