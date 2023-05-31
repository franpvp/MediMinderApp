import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

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

  datos = {
    usuario: '',
    nombre:'',
    apellido: '',
    correo: '',
    celular: '',


  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.emailFormControl.statusChanges.subscribe((status) => {
      this.isEmailRequiredError = status === 'INVALID' && this.emailFormControl.hasError('required');
    });
  }

  hide = true;
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  
}
