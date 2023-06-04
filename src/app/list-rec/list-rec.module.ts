import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRecPageRoutingModule } from './list-rec-routing.module';

import { ListRecPage } from './list-rec.page';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MenuBarComponent } from "../menu-bar/menu-bar.component";
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';

@NgModule({
    declarations: [ListRecPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListRecPageRoutingModule,
        MenuBarComponent,
        MatExpansionModule,
        MatPaginatorModule,
        MatTableModule,
        SlideMenuComponent
    ]
})
export class ListRecPageModule {

}
