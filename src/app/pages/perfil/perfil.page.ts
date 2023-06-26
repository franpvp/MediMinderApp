import { Component, OnInit } from '@angular/core';
import { MyPerfilService } from '../../services/perfil-service/my-perfil.service';
import { DbService } from 'src/app/services/db-service/db.service';
import { ActivatedRoute } from '@angular/router';

import { Camera, CameraResultType, CameraOptions } from '@capacitor/camera';
import { ApirestService } from 'src/app/services/apirest-service/apirest.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

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

  src: string = '';

  constructor(private dbService: DbService, private route: ActivatedRoute, private myPerfilService: MyPerfilService, private nativeStorage: NativeStorage) {
      this.obtenerDatosPerfil();
   }

  ngOnInit() {
    const usuario = this.myPerfilService.getUsuario();
    this.obtenerImagenUsuarioLogeado(usuario).then((imagenDataUrl) => {
      this.src = imagenDataUrl || '';
    });
  }
  // MÉTODO PARA OBTENER DATOS ALMACENADOS EN TABLA PERFIL
  obtenerDatosPerfil() {
    this.dbService.createDatabase().then(() => {
      let usuario = this.myPerfilService.getUsuario();
      this.dbService.obtenerDatosPerfil(usuario)
      .then((data) => {
        console.log('DATA PERFIL: ', data);
        if(data.rows.length > 0) {
          let row = data.rows.item(0);
          this.usuario = row.username;
          this.nombre = row.nombre;
          this.apellido = row.apellido;
          this.correo = row.correo;
          this.celular = row.celular;
          
        } else {
          console.log('NO HAY DATOS DEL USUARIO');
        }
      }).catch(error => {
        console.log('ERROR AL OBTENER DATOS PERFIL: ', error);
      })
    })
  }
  
  
  // MÉTODO PARA TOMAR Y OBTENER UNA FOTO
  // async takePicture() {
  //   let options:CameraOptions = {
  //     quality: 100,
  //     resultType: CameraResultType.DataUrl,
  //     saveToGallery: true
  //   }
  //   Camera.getPhoto(options).then((result) => {
  //     if(result.dataUrl) {
  //       this.src = result.dataUrl
  //     }
      
  //   }).catch(error => {
  //     console.log('Se ha cancelado seleccion');
  //   })
  // }

  async guardarImagenUsuarioLogeado(usuario: string) {
    let options: CameraOptions = {
      quality: 100,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true
    };
    try {
      const result = await Camera.getPhoto(options);
      if (result.dataUrl) {
        this.src = result.dataUrl;
        const claveImagen = `imagen_${usuario}`;
        // Guardar la imagen seleccionada en nativeStorage
        await this.nativeStorage.setItem(claveImagen, this.src)
        .then(() => {
          console.log('Imagen guardada exitosamente para el usuario:', usuario);
          console.log(this.src);
        })
        .catch((error) => {
          console.log('Error al guardar la imagen para el usuario:', usuario, error);
        });
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen: ', error);
    }
  }

  obtenerImagenUsuarioLogeado(usuario: string): Promise<string> {
    const claveImagen = `imagen_${usuario}`;
    return this.nativeStorage.getItem(claveImagen)
      .then((data) => {
        if (data) {
          const imagenDataUrl = data as string;
          console.log('Imagen obtenida exitosamente para el usuario:', usuario);
          return imagenDataUrl;
        } else {
          console.log('No se encontró la imagen para el usuario:', usuario);
          return '';
        }
      })
      .catch((error) => {
        console.log('Error al obtener la imagen para el usuario:', usuario, error);
        return '';
      });
  }

  


  

  


}
