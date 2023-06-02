import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  mensaje: string;

  constructor(private router: Router,private alertController: AlertController) { 
    this.tiempoRestante = '';
    this.tiempoIngresado = 0;
    this.nombreMedicamento = '';
    this.dias = 0;
    this.mensaje = '';
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
        clearInterval(this.temporizador);
        this.recordatorio();

        this.mostrarAlerta().then(() => {
          this.router.navigate(['/home']);
        });
      }
    }, 1000);
  }
  // Mensaje de alerta
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Creación Exitosa',
      message: this.mensaje,
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
    this.mensaje = 'Tomar medicamento ' + this.nombreMedicamento;
  }

}
