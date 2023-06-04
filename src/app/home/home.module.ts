import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

// Custom Component
import { MenuBarComponent } from "../menu-bar/menu-bar.component";
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';

@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        MenuBarComponent,
        SlideMenuComponent
    ]
})
export class HomePageModule {}
