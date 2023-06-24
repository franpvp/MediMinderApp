import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';
import { DbService } from '../../services/db-service/db.service';

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

  constructor(private router: Router, private dbService: DbService, private myPerfilService: MyPerfilService) { }

  ngOnInit() {
  }

  user = {
    usuario: "",
    password: ""
  }

  ingresar() {
    const usuario: string = this.user.usuario;
    const contrasena: string = this.user.password;
    
    const showSpinner: boolean = false;

    if(usuario != '' && contrasena != ''){
      this.dbService.createDatabase()
      .then(() => {
        this.dbService.obtenerDatosUsuario(usuario, contrasena)
        .then((data) => {
          console.log('LLEGUÉ AQUI ANTES DEL IF');
          console.log('DATA: ', data);
          if(data.rows.length > 0) {
            console.log('LLEGUÉ AQUI');
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
                this.showSpinner = false;
              }, 1500);
              console.log('CREDENCIALES CORRECTAS');
            }else {
              this.mostrarMensaje = true;
            }
          } else {
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
  resetearDiv() {
    this.mostrarMensaje = false;
  }

}



  


