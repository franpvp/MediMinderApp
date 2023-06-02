import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRecPageRoutingModule } from './list-rec-routing.module';

import { ListRecPage } from './list-rec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRecPageRoutingModule
  ],
  declarations: [ListRecPage]
})
export class ListRecPageModule {}
