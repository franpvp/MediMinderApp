import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecPageRoutingModule } from './add-rec-routing.module';

import { AddRecPage } from './add-rec.page';

// Custom Component
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { SlideMenuComponent } from '../../components/slide-menu/slide-menu.component';


@NgModule({
    declarations: [AddRecPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddRecPageRoutingModule,
        MenuBarComponent,
        SlideMenuComponent,
    ]
})
export class AddRecPageModule {}
