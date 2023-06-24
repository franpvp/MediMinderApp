import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRecPageRoutingModule } from './list-rec-routing.module';

import { ListRecPage } from './list-rec.page';

// Componentes Angular Material
import { MatExpansionModule } from '@angular/material/expansion';

// Custom Component
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { SlideMenuComponent } from '../../components/slide-menu/slide-menu.component';

@NgModule({
    declarations: [ListRecPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListRecPageRoutingModule,
        MenuBarComponent,
        MatExpansionModule,
        SlideMenuComponent,
    ]
})
export class ListRecPageModule {

}
