import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-rec',
  templateUrl: './add-rec.page.html',
  styleUrls: ['./add-rec.page.scss'],
})
export class AddRecPage implements OnInit {

  tiempoRestante: string;
  temporizador: any;
  tiempoIngresado: number;
  dias: number;

  datosTemp = {
    nombreMedicamento: ''
  }

  constructor() { 
    this.tiempoRestante = '';
    this.tiempoIngresado = 0;
    this.dias = 0;
  }

  ngOnInit() {
  }

  iniciarTemporizador() {
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }

    const horaActual = new Date();
    const tiempoFinalizacion = new Date(horaActual.getTime() + this.tiempoIngresado * 60 * 60 * 1000);

    this.temporizador = setInterval(() => {
      const ahora = new Date();
      if (ahora < tiempoFinalizacion) {
        this.tiempoRestante = this.obtenerTiempoRestante(tiempoFinalizacion, ahora);
      } else {
        this.recordatorio();
        clearInterval(this.temporizador);
      }
    }, 1000);
  }

  obtenerTiempoRestante(tiempoFinal: Date, tiempoActual: Date): string {
    const diferencia = tiempoFinal.getTime() - tiempoActual.getTime();
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    return horas + ' horas ' + minutos + ' minutos';
  }

  recordatorio() {
    console.log('¡Es hora del recordatorio!');
  }

}
