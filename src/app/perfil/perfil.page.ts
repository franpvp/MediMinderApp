import { Component, OnInit } from '@angular/core';
import { MyPerfilService } from '../my-perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  celular: string = '';

  constructor(private myPerfilService: MyPerfilService) { }

  ngOnInit() {

    this.usuario = this.myPerfilService.getUsuario();
    this.nombre = this.myPerfilService.getNombre();
    this.apellido = this.myPerfilService.getApellido();
    this.correo = this.myPerfilService.getCorreo();
    this.celular = this.myPerfilService.getCelular();

  }

  

  


}
