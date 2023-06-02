import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {

  recordatorios: string[] = [];

  constructor() { }

  // Agregar Recordatorio a un arreglo 
  agregarRecordatorio(recordatorio: string) {
    this.recordatorios.push(recordatorio);
  }

  cargarRecordatorios(recordatorios: string[]) {
    this.recordatorios = recordatorios;
  }
}
