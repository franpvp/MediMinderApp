import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { RecordatorioService } from '../recordatorio.service';

@Component({
  selector: 'app-add-rec',
  templateUrl: './add-rec.page.html',
  styleUrls: ['./add-rec.page.scss'],
})
export class AddRecPage implements OnInit {

  nombreMedicamento: string;
  tiempoRestante: string;
  temporizador: any;
  tiempoIngresado: number;
  dias: number;
  mensajeMed: string;
  mensajeHoras: string;
  mensajeDias: string;
  mensajeTiempo: string;
  recordatorios: string[] = [];

  constructor(private router: Router, private alertController: AlertController,private recordatorioService: RecordatorioService) { 
    this.tiempoRestante = '';
    this.tiempoIngresado = 0;
    this.nombreMedicamento = '';
    this.dias = 0;
    this.mensajeMed = '';
    this.mensajeHoras = '';
    this.mensajeDias = '';
    this.mensajeTiempo = '';
    
  }

  ngOnInit() {
  }

  iniciarTemporizador(formulario: NgForm) {
    if (formulario.invalid) {
      // Mostrar mensaje de error o realizar alguna acción adicional
      return;
    }
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
        clearInterval(this.temporizador);
      }
    }, 1000);


    this.recordatorio();
    // Se agrega recordatorio y se guarda en el servicio
    this.agregarRecordatorio();
    this.mostrarAlerta().then(() => {
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    });
    
  }

  async mostrarAlerta() {
    const horaActual = new Date();
    const tiempoFinalizacion = new Date(horaActual.getTime() + this.tiempoIngresado * 60 * 60 * 1000);
    const tiempoRestante = this.obtenerTiempoRestante(tiempoFinalizacion, new Date());
    const alert = await this.alertController.create({
      header: 'Creación Exitosa',
      cssClass: 'multiline-alert',
      inputs: [
        {
          type: 'text',
          value: this.mensajeMed,
          disabled: true
        },
        {
          type: 'text',
          value: this.mensajeHoras,
          disabled: true
        },
        {
          type: 'text',
          value: this.mensajeDias,
          disabled: true
        },
      ],
      buttons: ['OK']
    });

    
    await alert.present();
  }

  obtenerTiempoRestante(tiempoFinal: Date, tiempoActual: Date): string {
    const diferencia = tiempoFinal.getTime() - tiempoActual.getTime();
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    return horas + ' horas ' + minutos + ' minutos';
  }

  recordatorio() {
    this.mensajeMed = 'Medicamento: ' + this.nombreMedicamento;
    this.mensajeHoras = 'Cada: ' + this.tiempoIngresado + ' hrs';
    this.mensajeDias = 'Duración estimada: ' + this.dias + ' días';
  }

  agregarRecordatorio() {
    const recordatorio = `Medicamento: ${this.nombreMedicamento}\n
                      Cada: ${this.tiempoIngresado} hrs\n
                      Duración estimada: ${this.dias} días`;
    this.recordatorioService.agregarRecordatorio(recordatorio);
  } 
}
