import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { RecordatorioService } from '../../services/recordatorio-service/recordatorio.service';
import { DbService } from 'src/app/services/db-service/db.service';

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

  constructor(private router: Router, private alertController: AlertController,private recordatorioService: RecordatorioService, private dbService: DbService) { 
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
        this.mostrarAlertaTermino();

        clearInterval(this.temporizador);
      }
      
    }, 1000);
    // SE INVOCAN LOS MÉTODOS
    this.recordatorio();
    this.addRecordatorio();

    this.mostrarAlerta().then(() => {
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    });

  }

  async mostrarAlerta() {
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

  async mostrarAlertaTermino() {
    const alerta = await this.alertController.create({
      header: 'Notificación',
      cssClass: 'multiline-alert',
      inputs: [
        {
          type: 'text',
          value: 'Tomar: ' + this.nombreMedicamento,
          disabled: true
        },
      ],
      buttons: ['OK']
    });

    await alerta.present();
  }

  obtenerTiempoRestante(tiempoFinal: Date, tiempoActual: Date): string {
    const diferencia = tiempoFinal.getTime() - tiempoActual.getTime();
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    return horas + ' horas ' + minutos + ' minutos';
  }
  // MENSAJE DESPUÉS DE CREAR UN RECORDATORIO
  recordatorio() {
    this.mensajeMed = 'Medicamento: ' + this.nombreMedicamento;
    this.mensajeHoras = 'Cada: ' + this.tiempoIngresado + ' hrs';
    this.mensajeDias = 'Duración estimada: ' + this.dias + ' días';
  }

  // MÉTODO QUE AGREGA UN RECORDATORIO A LA BASE DE DATOS
  addRecordatorio() {
    let nombreMed = this.nombreMedicamento;
    let tiempoIng = this.tiempoIngresado;
    let duracionDias = this.dias;
    // INSERCIÓN DE LOS DATOS A LA BASE DE DATOS
    this.dbService.agregarRecordatorio(nombreMed,String(tiempoIng),String(duracionDias));
  }
  // ALERTA CUANDO SE ACABE EL TEMPORIZADOR
  enviarInformacionAlerta() {
    const informacionAlerta = {
      header: 'Notificación',
      mensaje: 'Hora de tomar: ' + this.nombreMedicamento
    };
    // Enviar la información de la alerta a través del servicio
    this.recordatorioService.enviarAlerta(informacionAlerta);
  }
}
