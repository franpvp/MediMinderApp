import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule, MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { PerfilPage } from '../perfil/perfil.page';

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

  constructor(private router: Router) { }

  ngOnInit() {}

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  toPerfil() {
    this.router.navigate(['/perfil']);
  }

  toNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  cerrarSesion() {
    // Redireccionar al componente de login
    this.router.navigate(['/login']);
  }

}
