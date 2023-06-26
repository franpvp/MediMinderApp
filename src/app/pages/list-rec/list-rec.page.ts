import { Component, OnInit, ViewChild } from '@angular/core';
import { RecordatorioService } from '../../services/recordatorio-service/recordatorio.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DbService } from '../../services/db-service/db.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-rec',
  templateUrl: './list-rec.page.html',
  styleUrls: ['./list-rec.page.scss'],
})
export class ListRecPage implements OnInit {

  listaNativeStorage: any = [];

  constructor(public recordatorioService: RecordatorioService, private myPerfilService: MyPerfilService, private dbService: DbService, private nativeStorage: NativeStorage) {

  }

  ngOnInit() {
    this.obtenerDatos(this.myPerfilService.getUsuario());
  }

  // Método para obtener datos
  obtenerDatos(usuario: string) {
    this.nativeStorage.getItem('recordatoriosPorUsuario').then((data) => {
      const recordatoriosPorUsuario = data || {};
      const listaRecordatorios = recordatoriosPorUsuario[usuario] || [];
      this.listaNativeStorage = listaRecordatorios;
      console.log('LISTA NATIVE STORAGE: ', this.listaNativeStorage),
      (error: any) => console.log('ERROR AL OBTENER LA DATA: ', error);
    });
  }

  // Método para borrar datos
  borrarDatos(id: number) {
    this.nativeStorage.getItem('recordatoriosPorUsuario').then((data) => {
      const usuario = this.myPerfilService.getUsuario();
      const recordatoriosPorUsuario = data || {};
      const listaRecordatorios = recordatoriosPorUsuario[usuario] || [];
      const index = listaRecordatorios.findIndex((recordatorio: { id: number; }) => recordatorio.id === id);
      if (index !== -1) {
        listaRecordatorios.splice(index, 1);
        recordatoriosPorUsuario[usuario] = listaRecordatorios;
        this.nativeStorage.setItem('recordatoriosPorUsuario', recordatoriosPorUsuario).then(() => {
          console.log('ITEM BORRADO');
          this.obtenerDatos(usuario); // Actualizar la lista después de borrar el objeto
        }).catch((error) => {
          console.log('ERROR AL BORRAR EL ITEM: ', error);
        });
      }
    }).catch((error) => {
      console.log('ERROR AL OBTENER LA DATA: ', error);
    });
  }
  
  
  
  
  
  
  



  


  
}
