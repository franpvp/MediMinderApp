import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonPopover, IonSearchbar } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { RecordatorioService } from '../../services/recordatorio-service/recordatorio.service';
import { DbService } from 'src/app/services/db-service/db.service';
import { ApirestService } from 'src/app/services/apirest-service/apirest.service';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';



@Component({
  selector: 'app-add-rec',
  templateUrl: './add-rec.page.html',
  styleUrls: ['./add-rec.page.scss'],
})
export class AddRecPage implements OnInit {

  nombreMedicamento: string;
  nameMed: string;
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

  private nextId: number = 1;

  @ViewChild('buscador') searchBar!: IonSearchbar;

  @ViewChild('popoverOptions', { static: false }) popoverOptions!: IonPopover;

  constructor(private router: Router, private alertController: AlertController,private recordatorioService: RecordatorioService, private dbService: DbService, private myPerfilService: MyPerfilService, private api: ApirestService,private nativeStorage: NativeStorage) { 
    this.tiempoRestante = '';
    this.tiempoIngresado = 0;
    this.nombreMedicamento = '';
    this.dias = 0;
    this.mensajeMed = '';
    this.mensajeHoras = '';
    this.mensajeDias = '';
    this.mensajeTiempo = '';
    this.nameMed = '';    

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
          value: this.nameMed,
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
          value: 'Tomar: ' + this.nameMed,
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
  // ALERTA CUANDO SE ACABE EL TEMPORIZADOR
  enviarInformacionAlerta() {
    const informacionAlerta = {
      header: 'Notificación',
      mensaje: 'Hora de tomar: ' + this.nameMed
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
  // Medicamento Seleccionado
  selectSuggestion(medicamento: string) {
    this.showSuggestions = false;
    this.nameMed = medicamento;
    this.searchBar.value = medicamento;
  }

  // NATIVE STORAGE
  // Método para guardar los datos
  // guardarDatos(nombreMedIng: string, nombreUsuario: string, tiempoIng: number, diasIng: number) {
  //   this.nativeStorage.getItem('misRecordatorios').then((data) => {
  //     const nuevoObjeto = {
  //       id: 1,
  //       usuario: nombreUsuario,
  //       nombreMed: nombreMedIng,
  //       tiempoIng: String(tiempoIng),
  //       dias: String(diasIng)

  //     };
  //     // Verifica si la lista existe o es nula
  //     const lista = data || [];
      
  //     // Verifica si hay objetos en la lista
  //     if (lista.length > 0) {
  //       // Obtiene el último objeto de la lista
  //       const ultimoObjeto = lista[lista.length - 1];
  //       // Incrementa el valor de nextId basado en el id del último objeto
  //       this.nextId = ultimoObjeto.id + 1;
  //     }
  //     // Asigna el valor de nextId al nuevo objeto
  //     nuevoObjeto.id = this.nextId;
  //     // Agrega el nuevo objeto a la lista
  //     lista.push(nuevoObjeto);
  //     // Guarda la lista actualizada en NativeStorage
  //     this.nativeStorage.setItem('misRecordatorios', lista);
      
  //   }).catch((error) => {
  //     console.log('Error al obtener la lista de objetos: ', error);
  //     const lista = []; // Crea una lista vacía
  //     const nuevoObjeto = {
  //       id: 1,
  //       usuario: nombreUsuario,
  //       nombreMed: nombreMedIng,
  //       tiempoIng: String(tiempoIng),
  //       dias: String(diasIng)
  //     };
  //     lista.push(nuevoObjeto); // Agrega el nuevo objeto a la lista
  //     // Guarda la lista en NativeStorage
  //     this.nativeStorage.setItem('misRecordatorios', lista).then(() => {
  //       console.log('Datos guardados exitosamente');
  //     }).catch((error) => {
  //       console.log('Error al guardar los datos: ', error);
  //     });
  //   });
  // }

  guardarDatos(nombreMedIng: string, tiempoIng: number, diasIng: number) {

    this.nativeStorage.getItem('recordatoriosPorUsuario').then((data) => {
      const recordatorio = {
        id: 1,
        nombreMed: nombreMedIng,
        tiempoIng: String(tiempoIng),
        dias: String(diasIng)
  
      };
      let recordatoriosPorUsuario = data || {}; // Si no hay datos, crea un objeto vacío
      const usuario = this.myPerfilService.getUsuario();
      console.log('USUARIO RECORDATORIO: ', usuario);
      if (!recordatoriosPorUsuario[usuario]) {
        recordatoriosPorUsuario[usuario] = []; // Crea una nueva lista para el usuario actual
      }
  
      recordatoriosPorUsuario[usuario].push(recordatorio); // Agrega el nuevo recordatorio a la lista
  
      this.nativeStorage.setItem('recordatoriosPorUsuario', recordatoriosPorUsuario).then(() => {
        console.log('Recordatorio guardado exitosamente');
      }).catch((error) => {
        console.log('Error al guardar el recordatorio: ', error);
      });
    }).catch((error) => {
      console.log('Error al obtener los recordatorios por usuario: ', error);
      const usuario = this.myPerfilService.getUsuario();
      const recordatorio = {
        id: 1,
        nombreMed: nombreMedIng,
        tiempoIng: String(tiempoIng),
        dias: String(diasIng)
      };
      let recordatoriosPorUsuario = {
        [usuario]: [recordatorio]
      };
      // Guarda la lista en NativeStorage
      this.nativeStorage.setItem('recordatoriosPorUsuario', recordatoriosPorUsuario).then(() => {
        console.log('Datos guardados exitosamente');
      }).catch((error) => {
        console.log('Error al guardar los datos: ', error);
      });
    });
  }
  
}
