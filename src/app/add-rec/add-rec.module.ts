import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecPageRoutingModule } from './add-rec-routing.module';

import { AddRecPage } from './add-rec.page';

import { MenuBarComponent } from "../menu-bar/menu-bar.component";
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecPageRoutingModule,
    MenuBarComponent,
    SlideMenuComponent
  ],
  declarations: [AddRecPage]
})
export class AddRecPageModule {}
