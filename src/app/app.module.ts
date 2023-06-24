import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
// Native Storage
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@NgModule({
    declarations: [AppComponent],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, NativeStorage],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule
    ]
})
export class AppModule {}
