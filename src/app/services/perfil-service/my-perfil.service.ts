import { Injectable } from '@angular/core';
import { DbService } from '../db-service/db.service';

@Injectable({
  providedIn: 'root'
})
export class MyPerfilService {

  credenciales: string[] = [];

  usuario: string = '';

  constructor(private dbService: DbService) { }

  setUsuario(usuario: string) {
    this.usuario = usuario;
  }
  getUsuario() {
    return this.usuario;
  }

}
