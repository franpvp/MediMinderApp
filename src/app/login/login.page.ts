import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MyPerfilService } from '../my-perfil.service';

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

  constructor(private router: Router, private myPerfilService: MyPerfilService) { }

  ngOnInit() {
  }

  user = {
    usuario: "",
    password: ""
  }

  ingresar() {
    
    const usuario: string = this.user.usuario;
    const contraseña: string = this.user.password;
    
    const showSpinner: boolean = false;

    const usuarioService = this.myPerfilService.getUsuario();
    const passService = this.myPerfilService.getContraseña();

    if(usuario != '' && contraseña != ''){
      if(usuario == usuarioService && contraseña == passService) {
        this.showSpinner = true;
        setTimeout(() => {
          let navigationExtras: NavigationExtras = {
            state: {
              user: this.user
            }
          };
        this.router.navigate(['/home'], navigationExtras);
  
          this.showSpinner = false;
        }, 1500);
      }
      else {
        this.mostrarMensaje = true;
      }
    }
  }

  resetearDiv() {
    this.mostrarMensaje = false;
  }

}



  


