import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { DbService } from '../db-service/db.service';

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {

  listaRecordatorios: string[] = [];

  private alertSubject: Subject<any> = new Subject<any>();

  constructor(private dbService: DbService) { }

  // Agregar Recordatorio a un arreglo 
  // agregarRecordatorio(recordatorio: string) {
  //   this.listaRecordatorios.push(recordatorio);
  // }

  addRecordatorio(nombreMed: string, tiempoIng: string, duracionDias: string) {
    this.listaRecordatorios.push(nombreMed, tiempoIng, duracionDias);
  }

  enviarAlerta(alerta: any) {
    this.alertSubject.next(alerta);
  }

  getAlertSubject() {
    return this.alertSubject.asObservable();
  }


}
