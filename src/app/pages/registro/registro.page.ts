import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';
import { DbService } from 'src/app/services/db-service/db.service';
import { ToastController } from '@ionic/angular';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario: string =  '';
  password: string = '';
  confPassword: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  celular: string = '';

  @ViewChild('myForm') myForm!: NgForm;

  msgErrorPass: boolean = false;
  msgInputVacio: boolean = false;
  hidePassword: boolean = true;

  mensaje: string = '';

  // Icono para dar visibilidad
  togglePasswordVisibility(inputType: string) {
    if (inputType === 'password') {
      this.hidePassword = !this.hidePassword;
    } 
  }
  constructor(private router: Router, private dbService: DbService, private toastController: ToastController, private myPerfilService: MyPerfilService) { 
    
  }

  ngOnInit() {
  }

  confirmar() {
    let usuario = this.usuario;
    let password = this.password;
    let confPassword = this.confPassword;

    if (this.myForm.valid && this.myForm.dirty) {
      if(password == confPassword && password != '' && confPassword != '') {
        this.dbService.createDatabase().then(() => {
          this.guardarDatosUsuario(usuario,password);
          this.myPerfilService.setUsuario(usuario);
        });
      }
      else {
        this.mensaje = 'Las contraseñas no coinciden.';
        let mensaje = this.mensaje;
        this.presentToast(mensaje);
      }
    }
    else {
      let mensaje = 'Debe llenar todos los campos.';
      this.presentToast(mensaje);
    }
  }
  // Guardar datos del formulario de registro
  guardarDatosUsuario(usuario: string, password: string) {
    // INSERTAR DATOS A LA TABLA PERFIL
    this.dbService.validarUsuario(usuario).then((data) => {
      if(!data) {
        let nombre = this.nombre;
        let apellido = this.apellido;
        let correo = this.correo;
        let celular = this.celular;
        this.dbService.agregarUsuario(usuario, password);
        this.dbService.agregarDatosPerfil(usuario, nombre, apellido, correo, celular);
        console.log('USUARIO VALIDADO');
        this.router.navigate(['/home']);
      }else {
        let mensaje = 'Usuario ya existe';
        this.presentToast(mensaje);
        console.log('NO SE HA GUARDADO EL USUARIO');
      }
    }).catch(error => {
      console.log('ERROR AL VALIDAR USUARIO: ', error);
    })
    
  }
  resetearDiv() {
    this.msgErrorPass = false;
    this.msgInputVacio = false;
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
