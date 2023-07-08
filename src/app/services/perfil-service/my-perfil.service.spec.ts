import { TestBed } from '@angular/core/testing';

import { MyPerfilService } from './my-perfil.service';
import { DbService } from '../db-service/db.service';

describe('MyPerfilService', () => {
  let myPerfilService: MyPerfilService;
  let dbServiceMock: jasmine.SpyObj<DbService>;

  beforeEach(() => {
    const dbServiceSpy = jasmine.createSpyObj('DbService', ['obtenerDatosPerfil']);
    TestBed.configureTestingModule({
      providers: [
        MyPerfilService,
        { provide: DbService, useValue: dbServiceSpy }
      ]
    });
    myPerfilService = TestBed.inject(MyPerfilService);
    dbServiceMock = TestBed.inject(DbService) as jasmine.SpyObj<DbService>;
  });

  it('Debería guardar y obtener al usuario', () => {
    const usuario = 'testuser';

    myPerfilService.setUsuario(usuario);
    const result = myPerfilService.getUsuario();

    expect(result).toBe(usuario);
  });

  it('should get datos perfil from db service', async () => {
    const usuario = 'testuser';
    const datosPerfil = { nombre: 'Francisca', apellido: 'Valdivia' };
    dbServiceMock.obtenerDatosPerfil.and.returnValue(Promise.resolve(datosPerfil));

    const result = await dbServiceMock.obtenerDatosPerfil(usuario);

    expect(result).toEqual(datosPerfil);
    expect(dbServiceMock.obtenerDatosPerfil).toHaveBeenCalledWith(usuario);
  });
});
