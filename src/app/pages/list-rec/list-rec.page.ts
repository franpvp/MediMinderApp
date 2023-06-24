import { Component, OnInit, ViewChild } from '@angular/core';
import { RecordatorioService } from '../../services/recordatorio-service/recordatorio.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DbService } from '../../services/db-service/db.service';


@Component({
  selector: 'app-list-rec',
  templateUrl: './list-rec.page.html',
  styleUrls: ['./list-rec.page.scss'],
})
export class ListRecPage implements OnInit {

  panelOpenState = false;

  listaRec: any = [];

  numbers: number[] = [];

  constructor(public recordatorioService: RecordatorioService, private dbService: DbService) {

    for (let i = 1; i <= 100; i++) {
      this.numbers.push(i);
    }

    this.dbService.createDatabase().then(() => {
      this.obtenerRecordatorio();
    });
  }

  ngOnInit() {

  }
  // MÉTODO PARA OBTENER LA LISTA DE RECORDATORIOS 
  obtenerRecordatorio() {
    this.dbService.obtenerRecordatorio()
    .then((data) => {
      this.listaRec = [];
      if(data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          let row = data.rows.item(i);
          this.listaRec.push(row);
          console.log(row);
          console.log('NOMBRE MEDICAMENTO: ', row.nombreMed);
          console.log('TIEMPO INGRESADO: ', row.tiempoIng, ' HORAS');
          console.log('DURACIÓN: ', row.duracionDias, 'DIAS');
        }
      } else {
        console.log('NO HAY RECORDATORIOS');
      }
    }).catch(error => {
      console.log('ERROR AL OBTENER RECORDATORIOS: ', error);
    })
  }



  


  
}
