import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
// Servicios
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';
import { DbService } from '../../services/db-service/db.service';
// Native Storage
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showSpinner: boolean | undefined;
  datosUsuario: string[] = [];
  mostrarMensaje: boolean = false;
  textoVacio: boolean = false;

  estaLogeado: boolean = false;

  constructor(private router: Router, private dbService: DbService, private myPerfilService: MyPerfilService, private toastController: ToastController, private nativeStorage: NativeStorage) { }

  ngOnInit() {
  }

  user = {
    usuario: "",
    password: ""
  }

  hidePassword: boolean = true;
  // Visibilidad de Contraseña
  togglePasswordVisibility(inputType: string) {
    if (inputType === 'password') {
      this.hidePassword = !this.hidePassword;
    } 
  }

  ingresar() {
    const usuario: string = this.user.usuario;
    const contrasena: string = this.user.password;
    
    const showSpinner: boolean = false;

    if(usuario != '' && contrasena != ''){
      this.dbService.createDatabase()
      .then(() => {
        this.dbService.obtenerDatosUsuario(usuario)
        .then((data) => {
          console.log('DATA: ', data);
          if(data.rows.length > 0) {
            let datosUsuario = data.rows.item(0);
            console.log('DATOS USUARIO: ', datosUsuario);
            let usuarioDb = datosUsuario.username;
            let contrasenaDb = datosUsuario.contrasena;
            console.log('USUARIO: ',usuarioDb);
            console.log('CONTRASEÑA: ',contrasenaDb);
            if(usuario == String(usuarioDb) && contrasena == String(contrasenaDb)) {
              this.showSpinner = true;
              setTimeout(() => {
                const navigationExtras: NavigationExtras = {
                  state: {
                    user: this.user
                  }
                }
                // SETEAR DATOS EN PERFIL SERVICE
                this.myPerfilService.setUsuario(usuario);
                this.router.navigate(['/home'], navigationExtras);
                this.estaLogeado = true;
                this.guardarEstadoSesion();
                this.showSpinner = false;
              }, 1500);
              console.log('CREDENCIALES CORRECTAS');
            }else {
              this.mostrarMensaje = true;
            }
          } else {
            this.presentToast('Nombre de usuario o contraseña incorrectos.');
            console.log('NO SE HA ENCONTRADO USUARIO');
          }
        }).catch(error => {
          console.log('ERROR AL OBTENER DATOS: ', error);
        });
      }).catch(error => {
        console.log('ERROR AL ABRIR LA BASE DE DATOS: ', error);
      }) 
    }
  }

  guardarEstadoSesion() {
    this.nativeStorage.setItem('estadoSesion', { estaLogeado: this.estaLogeado })
    .then(() => {
      console.log('Estado de sesión guardado correctamente', this.estaLogeado);
    }).catch((error) => {
      console.log('Error al guardar el estado de sesión: ', error);
    })
  }

  resetearDiv() {
    this.mostrarMensaje = false;
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



  


