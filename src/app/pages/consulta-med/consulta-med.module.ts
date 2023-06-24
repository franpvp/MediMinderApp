import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaMedPageRoutingModule } from './consulta-med-routing.module';

import { ConsultaMedPage } from './consulta-med.page';
import { SlideMenuComponent } from "../../components/slide-menu/slide-menu.component";
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";

@NgModule({
    declarations: [ConsultaMedPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConsultaMedPageRoutingModule,
        SlideMenuComponent,
        MenuBarComponent,
    ]
})
export class ConsultaMedPageModule {}
