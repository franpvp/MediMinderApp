import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyPerfilService {

  credenciales: string[] = [];

  usuario: string = '';
  contraseña: string = '';
  nombre: string  = '';
  apellido: string = '';
  correo: string = '';
  celular: string = '';

  constructor() { }

  setUsuario(usuario: string) {
    this.usuario = usuario;
  }
  setContraseña(contraseña: string) {
    this.contraseña = contraseña;
  }
  setNombre(nombre: string) {
    this.nombre = nombre;
  }
  setApellido(apellido: string) {
    this.apellido = apellido;
  }
  setCorreo(correo: string) {
    this.correo = correo;
  }
  setCelular(celular: string) {
    this.celular = celular;
  }

  getUsuario() {
    return this.usuario;
  }
  getContraseña() {
    return this.contraseña;
  }
  getNombre() {
    return this.nombre;
  }

  getApellido() {
    return this.apellido;
  }
  getCorreo() {
    return this.correo;
  }
  getCelular() {
    return this.celular;
  }

}
