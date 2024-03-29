import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';

// Custom Component
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { SlideMenuComponent } from '../../components/slide-menu/slide-menu.component';

@NgModule({
    declarations: [PerfilPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PerfilPageRoutingModule,
        MenuBarComponent,
        SlideMenuComponent,
    ]
})
export class PerfilPageModule {}
