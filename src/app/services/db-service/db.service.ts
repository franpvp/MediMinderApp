import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  database!: SQLiteObject;

  constructor(private sqlite: SQLite) {
  }
  // MÉTODO PARA CREAR BASE DE DATOS
  async createDatabase() {
    await this.sqlite.create({
      name: 'dbMediMinder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db;
    }).catch(error => {
      alert("ERROR AL ABRIR LA BASE DE DATOS: " + JSON.stringify(error));
    });
    await this.crearTablas();
  }
  // MÉTODO PARA CREAR TODAS LAS TABLAS
  async crearTablas() {
    // TABLA USUARIO
    await this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS USUARIO(id INTEGER PRIMARY KEY autoincrement, username VARCHAR(15) NOT NULL, contrasena VARCHAR(15) NOT NULL)`, []
    ).then(() => {
      console.log('TABLA USUARIO CREADA');
    }).catch(error => {
      console.log('ERROR AL CREAR TABLA USUARIO: ', error);
    });
    // TABLA PERFIL
    await this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS PERFIL(id INTEGER PRIMARY KEY autoincrement, username VARCHAR(15) NOT NULL, nombre VARCHAR(30) NOT NULL, apellido VARCHAR(30) NOT NULL, correo VARCHAR(30) NOT NULL, celular VARCHAR(9) NOT NULL)`,[]
    ).then(() => {
      console.log('TABLA PERFIL CREADA');   
    }).catch(error => {
      console.log('ERROR AL CREAR TABLA PERFIL: ', error);
    });
  }
  // MÉTODO PARA OBTENER LOS DATOS ALMACENADOS EN TABLA USUARIO
  async obtenerDatosUsuario(usuario: string) { 
    return this.database.executeSql(
      `SELECT * FROM USUARIO WHERE username = ?`, [usuario]
    ).then((data) => {
      return data;
    }).catch(error => {
      console.log('ERROR AL OBTENER DATOS DEL USUARIO: ', error);
    })
  }
  // MÉTODO PARA AGREGAR DATOS A TABLA PERFIL
  async agregarDatosPerfil(usuario: string, nombre: string, apellido: string, correo: string, celular: string) {
    return this.database.executeSql(
      `INSERT INTO PERFIL(username, nombre, apellido, correo, celular) VALUES(?, ?, ? ,? ,?)`, [usuario, nombre, apellido, correo, celular]
    ).then(() => {
      console.log('DATOS PERFIL ALMACENADOS');
    }).catch(error => {
      console.log('ERROR NO SE HAN INSERTADO DATOS PERFIL: ', error);
    })
  }
  // MÉTODO PARA OBTENER DATOS DEL PERFIL DE USUARIO
  async obtenerDatosPerfil(usuario: string) {
    return this.database.executeSql(
      `SELECT * FROM PERFIL WHERE username = ?`, [usuario]
    ).then((data) => {
      return data;
    }).catch(error => {
      console.log('ERROR AL OBTENER DATOS PERFIL: ', error);
    })
  }
  async agregarUsuario(usuario: string, contrasena: string) {
    return this.database.executeSql(
      `INSERT INTO USUARIO(username, contrasena) VALUES(?, ?)` , [usuario, contrasena]
    ).then(() => {
      console.log('USUARIO ALMACENADO');
    }).catch(error => {
      console.log('ERROR AL ALMACENAR USUARIO: ', error);
    })
  }
  async validarUsuario(usuario: string) {
    return this.sqlite.create({
      name: 'dbMediMinder.db',
      location: 'default'  
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT COUNT(username) AS CANTIDAD FROM USUARIO WHERE username = ?', [usuario])
        .then((data) => {
          if (data.rows.item(0).CANTIDAD === 0){
            return false; // USUARIO NO EXISTE
          }
          console.log('ESTOY EN EL SEGUNDO TRUE');
          return true;
          
        }).catch(e => {
          console.log('ESTOY EN EL SEGUNDO TRUE - Error al ejecutar la consulta SQL: ', e);
          return true;
        })
    }).catch(e => {
      console.log('ESTOY EN EL TERCER TRUE', e);
      return true;
    });
  }
  
}
