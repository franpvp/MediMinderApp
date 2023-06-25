import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonPopover, IonSearchbar } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { RecordatorioService } from '../../services/recordatorio-service/recordatorio.service';
import { DbService } from 'src/app/services/db-service/db.service';
import { ApirestService } from 'src/app/services/apirest-service/apirest.service';



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

  medicamentos: any[] = [];
  medicamentosFiltrados: any[] = [];
  showSuggestions: boolean = false;

  @ViewChild('buscador') searchBar!: IonSearchbar;

  @ViewChild('popoverOptions', { static: false }) popoverOptions!: IonPopover;

  constructor(private router: Router, private alertController: AlertController,private recordatorioService: RecordatorioService, private dbService: DbService, private api: ApirestService) { 
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
    this.getPosts();
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

  // OBTENER LOS OBJETOS CREADOS
  getPosts() {
    return this.api.getPosts().subscribe((res) => {
      this.medicamentos = res;
      console.log('OBTUVE MED: ', res);
      console.log(res);
    }, error => {
      console.log('ERROR AL OBTENER MEDICAMENTOS: ', error);
    })
  }

  // BUSQUEDA DE MEDICAMENTOS
  buscarMedicamento(event: any) {
    if(event.target.value === '') { 
      this.showSuggestions = false;
    } else {
      this.showSuggestions = true;
      const query = event.target.value.toLowerCase();
        // Realiza el filtro de acuerdo a la letra ingresada
      this.medicamentosFiltrados = this.medicamentos.filter((medicamento) =>
          medicamento.nombre.toLowerCase().indexOf(query) > -1
      );
    }
  }

  selectSuggestion(medicamento: string) {
    this.showSuggestions = false;
    this.searchBar.value = medicamento;
  } 

      
    
    
  
}
