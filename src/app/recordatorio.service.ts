import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {

  recordatorios: string[] = [];
  private alertSubject: Subject<any> = new Subject<any>();

  constructor() { }

  // Agregar Recordatorio a un arreglo 
  agregarRecordatorio(recordatorio: string) {
    this.recordatorios.push(recordatorio);
  }

  cargarRecordatorios(recordatorios: string[]) {
    this.recordatorios = recordatorios;
  }

  enviarAlerta(alerta: any) {
    this.alertSubject.next(alerta);
  }

  getAlertSubject() {
    return this.alertSubject.asObservable();
  }


}
