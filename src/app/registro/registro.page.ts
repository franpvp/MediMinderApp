import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MyPerfilService } from '../my-perfil.service';

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

  isEmailRequiredError: boolean = false;

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  togglePasswordVisibility(inputType: string) {
    if (inputType === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (inputType === 'confirmar') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
    

  datosUsuario: string[] = [];

  constructor(private router: Router, private _formBuilder: FormBuilder, private myPerfilService: MyPerfilService) { }

  ngOnInit() {
    this.emailFormControl.statusChanges.subscribe((status) => {
      this.isEmailRequiredError = status === 'INVALID' && this.emailFormControl.hasError('required');
    });
  }

  hide = true;
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


  confirmar() {

    let password = this.password;
    let confPassword = this.confPassword;

    if (this.myForm.valid && this.myForm.dirty) {
      if(password == confPassword && password != '' && confPassword != '') {
        this.router.navigateByUrl('/home');
        this.guardarDatos();
      }
      else {
        this.msgErrorPass = true;
      }
    }
    else {
      this.msgInputVacio = true;
    }
  }

  // Guardar datos del formulario de registro
  guardarDatos() {
    let usuario: string = this.usuario;
    let password: string = this.password;
    let nombre: string = this.nombre;
    let apellido: string = this.apellido;
    let correo: string = this.correo;
    let celular: string = this.celular;

    this.myPerfilService.setUsuario(usuario);
    this.myPerfilService.setContraseña(password);
    this.myPerfilService.setNombre(nombre);
    this.myPerfilService.setApellido(apellido);
    this.myPerfilService.setCorreo(correo);
    this.myPerfilService.setCelular(celular);

  }

  // Quitar avisos de error
  resetearDiv() {
    this.msgErrorPass = false;
    this.msgInputVacio = false;
  }

  
}
