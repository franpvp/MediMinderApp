import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { StorageService } from 'src/app/services/storage-service/storage.service';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ApirestService } from 'src/app/services/apirest-service/apirest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private menuController : MenuController, private nativeStorage: NativeStorage, private api: ApirestService) {
  }

  ngOnInit() {
  }

  closeMenu() {
    this.menuController.enable(true, 'main-content');
  }
  
  // Método para guardar los datos
  guardarDatos() {
    this.nativeStorage.setItem("myitem", {id:"1", name:"fran"})
    .then(() => {
      alert("DATOS GUARDADOS")
    }).catch(error => {
      console.log('DATOS NO GUARDADOS: ', error);
    });
  }
  // Método para obtener datos
  obtenerDatos() {
    this.nativeStorage.getItem('myitem').then((data) => {
      console.log(data),
      (error: any) => console.log(error);
    });
  }

  // Método para borrar datos
  borrarDatos() {
    this.nativeStorage.remove("myitem").then(() => {
      alert('ITEM BORRADO');
    });
  }
}
