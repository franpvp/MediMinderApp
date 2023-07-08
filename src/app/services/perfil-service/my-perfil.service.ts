import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyPerfilService {

  credenciales: string[] = [];

  usuario: string = '';

  constructor() { }

  setUsuario(usuario: string) {
    this.usuario = usuario;
  }
  getUsuario() {
    return this.usuario;
  }

}
