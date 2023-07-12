import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonPopover, IonSearchbar, NavController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

// Servicios
import { RecordatorioService } from '../../services/recordatorio-service/recordatorio.service';
import { ApirestService } from 'src/app/services/apirest-service/apirest.service';
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';
// Native Storage
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-rec',
  templateUrl: './add-rec.page.html',
  styleUrls: ['./add-rec.page.scss'],
})
export class AddRecPage implements OnInit {

  nombreMedicamento: string = '';
  nameMed: string = '';
  tiempoRestante: string = '';
  temporizador: any;
  tiempoIngresado!: number;
  dias!: number;
  mensajeMed: string = '';
  mensajeHoras: string = '';
  mensajeDias: string = '';
  mensajeTiempo: string = '';

  recordatorios: string[] = [];
  medicamentos: any[] = [];
  medicamentosFiltrados: any[] = [];
  showSuggestions: boolean = false;
  estadoInfo: string = '';

  @ViewChild('buscador') searchBar!: IonSearchbar;
  @ViewChild('popoverOptions', { static: false }) popoverOptions!: IonPopover;

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef, private toastController: ToastController, private alertController: AlertController,private recordatorioService: RecordatorioService, private myPerfilService: MyPerfilService, private api: ApirestService, private nativeStorage: NativeStorage, private navCtrl: NavController) { 
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

    let contador = 0;
    const horaActual = new Date();
    const tiempoFinalizacion = new Date(horaActual.getTime() + this.tiempoIngresado * 60 * 60 * 1000);

    let intervaloHoras = this.tiempoIngresado;
    let duracionDias = this.dias;
    let totalHoras = duracionDias * 24;
    let totalRepeticiones = Math.ceil(totalHoras / intervaloHoras);

    this.estadoInfo = 'En curso';

    this.temporizador = setInterval(() => {
      const ahora = new Date();
      if (ahora < tiempoFinalizacion) {
        this.tiempoRestante = this.obtenerTiempoRestante(tiempoFinalizacion, ahora);
      } else {
        this.scheduleNotification();
        contador++;
        if(contador === totalRepeticiones) {
          this.nativeStorage.getItem('recordatoriosPorUsuario').then((data) => {
            this.estadoInfo = 'Finalizado';
            const usuario = this.myPerfilService.getUsuario();
            data[usuario].forEach((recordatorio: any) => {
              recordatorio.estadoInfo = this.estadoInfo;
            });
            this.nativeStorage.setItem('recordatoriosPorUsuario', data)
              .then(() => {
                this.changeDetectorRef.detectChanges();
                console.log('Estado "Finalizado" guardado en NativeStorage');
              })
              .catch((error) => {
                console.error('Error al guardar el estado "Finalizado" en NativeStorage:', error);
              });
          })
          
          
          clearInterval(this.temporizador);
        } else {
          tiempoFinalizacion.setTime(tiempoFinalizacion.getTime() + intervaloHoras * 60 * 60 * 1000);
        }
      }
    }, 1000);
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

  //Método para ejecutar una Notificacion
  async scheduleNotification() {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 111,
          title: "Notificación MediMinder",
          body: "Click para más información",
          largeBody: "Tomar: " + this.nameMed
        }
      ]
    }
    try {
      LocalNotifications.schedule(options);
    }
    catch(ex) {
      alert(JSON.stringify(ex));
    }
  }

  obtenerTiempoRestante(tiempoFinal: Date, tiempoActual: Date): string {
    const diferencia = tiempoFinal.getTime() - tiempoActual.getTime();
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    return horas + ' horas ' + minutos + ' minutos';
  }
  // MENSAJE DESPUÉS DE CREAR UN RECORDATORIO
  recordatorio() {
    this.mensajeMed = 'Medicamento: ' + this.nameMed;
    this.mensajeHoras = 'Cada: ' + this.tiempoIngresado + ' hrs';
    this.mensajeDias = 'Duración estimada: ' + this.dias + ' días';
  }
  // OBTENER LOS OBJETOS CREADOS
  getPosts() {
    return this.api.getPosts().subscribe((res) => {
      this.medicamentos = res;
      console.log('OBTUVE MED: ', res);
      console.log(res);
    }, error => {
      const jsonData: any = [
          { id: 1, nombre: 'Paracetamol' },
          { id: 2, nombre: 'Ibuprofeno' },
          { id: 3, nombre: 'Omeprazol' },
          { id: 4, nombre: 'Amoxicilina' },
          { id: 5, nombre: 'Loratadina' },
          { id: 6, nombre: 'Atorvastatina' },
          { id: 7, nombre: 'Metformina' },
          { id: 8, nombre: 'Diazepam' },
          { id: 9, nombre: 'Fluoxetina' },
          { id: 10, nombre: 'Losartán' }
      ];
      this.nativeStorage.setItem('medicamentosDef', jsonData);
      this.medicamentos = jsonData;
      alert('ALERTA CODIGO 404 SE UTILIZAN MEDICAMENTOS GUARDADOS EN NATIVE STORAGE');
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
  // MEDICAMENTO SELECCIONADO DE LA LISTA
  selectSuggestion(medicamento: string) {
    this.showSuggestions = false;
    this.nameMed = medicamento;
    this.searchBar.value = medicamento;
  }

  // NATIVE STORAGE
  // MÉTODO PARA GUARDAR DATOS
  guardarDatos(nombreMedIng: string, tiempoIng: number, diasIng: number) {
    this.nativeStorage.getItem('recordatoriosPorUsuario').then((data) => {
      if(tiempoIng != 0 && diasIng != 0) {
        const recordatorio = {
          id: 1,
          nombreMed: nombreMedIng,
          tiempoIng: String(tiempoIng),
          dias: String(diasIng),
          estadoInfo: 'En curso'
        };
        let recordatoriosPorUsuario = data || {}; // Si no hay datos, crea un objeto vacío
        const usuario = this.myPerfilService.getUsuario();
        console.log('USUARIO RECORDATORIO: ', usuario);
        if (!recordatoriosPorUsuario[usuario]) {
          recordatoriosPorUsuario[usuario] = []; // Crea una nueva lista para el usuario actual
        }
        const lista = recordatoriosPorUsuario[usuario]; // Obtén la lista de recordatorios para el usuario actual
  
        if (lista.length > 0) {
          const ultimoObjeto = lista[lista.length - 1];
          recordatorio.id = ultimoObjeto.id + 1; // Incrementa el valor de id basado en el último objeto de la lista
        }
        lista.push(recordatorio);
    
        this.nativeStorage.setItem('recordatoriosPorUsuario', recordatoriosPorUsuario).then(() => {
          this.changeDetectorRef.detectChanges();
          console.log('Recordatorio guardado exitosamente');
        }).catch((error) => {
          console.log('Error al guardar el recordatorio: ', error);
        });
      }else {
        this.presentToast('Ingreso inválido');
      }
      
    }).catch((error) => {
      console.log('Error al obtener los recordatorios por usuario: ', error);
      const usuario = this.myPerfilService.getUsuario();
      if(tiempoIng != 0 && diasIng != 0) {
        const recordatorio = {
          id: 1,
          nombreMed: nombreMedIng,
          tiempoIng: String(tiempoIng),
          dias: String(diasIng),
          estadoInfo: this.estadoInfo
        };
        let recordatoriosPorUsuario = {
          [usuario]: [recordatorio]
        };
        // Guarda la lista en NativeStorage
        this.nativeStorage.setItem('recordatoriosPorUsuario', recordatoriosPorUsuario).then(() => {
          this.changeDetectorRef.detectChanges();
          console.log('Datos guardados exitosamente');
        }).catch((error) => {
          console.log('Error al guardar los datos: ', error);
        });
      }else {
        this.presentToast('Ingreso inválido');
      }
    });
  }


  // Mensaje toast
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      cssClass: 'toast-centered'
    });
    toast.present();
  }


  
}
