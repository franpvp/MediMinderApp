import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showSpinner: boolean | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  user = {
    usuario: "",
    password: ""
  }

  ingresar() {
    
    const usuario = this.user.usuario;
    const contraseña = this.user.password;
    const showSpinner = false;

    if (usuario && contraseña) {

      if (usuario.length >= 5 && usuario.length <= 8 && /^[a-zA-Z0-9]+$/.test(usuario)) {
        if (contraseña.length == 4 && /^[0-9]{4}$/.test(contraseña)) {
          this.showSpinner = true; // Mostrar el spinner
          
          setTimeout(() => {
            let navigationExtras: NavigationExtras = {
              state: {
                user: this.user
              }
            };
          this.router.navigate(['/home'], navigationExtras);

          this.showSpinner = false;
        }, 2000);
  }
}
      
    } else {
      console.log('Por favor, completa todos los campos.');
    }
  }

}
