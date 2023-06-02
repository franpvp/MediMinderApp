import { Component, OnInit, ViewChild } from '@angular/core';
import { RecordatorioService } from '../recordatorio.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-rec',
  templateUrl: './list-rec.page.html',
  styleUrls: ['./list-rec.page.scss'],
})
export class ListRecPage implements OnInit {

  panelOpenState = false;
  numbers: number[] = [];

  constructor(public recordatorioService: RecordatorioService) {

    for (let i = 1; i <= 10; i++) {
      this.numbers.push(i);
    }
   }

  ngOnInit() {
    const recordatorios = this.recordatorioService.recordatorios;
    this.recordatorioService.cargarRecordatorios(recordatorios);

  }

  


  
}
