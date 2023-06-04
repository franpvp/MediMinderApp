import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionesPageRoutingModule } from './notificaciones-routing.module';

import { NotificacionesPage } from './notificaciones.page';
import { MenuBarComponent } from "../menu-bar/menu-bar.component";
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';

@NgModule({
    declarations: [NotificacionesPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NotificacionesPageRoutingModule,
        MenuBarComponent,
        SlideMenuComponent
    ]
})
export class NotificacionesPageModule {}
