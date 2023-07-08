import { TestBed } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbService } from './db.service';

describe('DbService', () => {
  let dbService: DbService;
  let sqliteMock: jasmine.SpyObj<SQLite>;

  beforeEach(() => {
    const sqliteSpy = jasmine.createSpyObj('SQLite', ['create']);
    TestBed.configureTestingModule({
      providers: [
        DbService,
        { provide: SQLite, useValue: sqliteSpy }
      ]
    });
    dbService = TestBed.inject(DbService);
    sqliteMock = TestBed.inject(SQLite) as jasmine.SpyObj<SQLite>;
  });

  it('should create the database and tables', async () => {
    const sqliteObjectMock: jasmine.SpyObj<SQLiteObject> = jasmine.createSpyObj('SQLiteObject', ['executeSql']);
    sqliteMock.create.and.resolveTo(sqliteObjectMock);

    await dbService.createDatabase();

    expect(sqliteMock.create).toHaveBeenCalledWith({
      name: 'dbMediMinder.db',
      location: 'default'
    });

    expect(sqliteObjectMock.executeSql).toHaveBeenCalledWith(
      `CREATE TABLE IF NOT EXISTS USUARIO(id INTEGER PRIMARY KEY autoincrement, username VARCHAR(15) NOT NULL, contrasena VARCHAR(15) NOT NULL)`,
      []
    );

    expect(sqliteObjectMock.executeSql).toHaveBeenCalledWith(
      `CREATE TABLE IF NOT EXISTS PERFIL(id INTEGER PRIMARY KEY autoincrement, username VARCHAR(15) NOT NULL, nombre VARCHAR(30) NOT NULL, apellido VARCHAR(30) NOT NULL, correo VARCHAR(30) NOT NULL, celular VARCHAR(9) NOT NULL)`,
      []
    );
  });

  it('should obtain user data', async () => {
    const executeSqlMock = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    dbService.database = { executeSql: executeSqlMock } as unknown as SQLiteObject;

    const username = 'testuser';

    await dbService.obtenerDatosUsuario(username);

    expect(executeSqlMock).toHaveBeenCalledWith(
      `SELECT * FROM USUARIO WHERE username = ?`,
      [username]
    );
  });

  it('should add profile data', async () => {
    const executeSqlMock = jasmine.createSpy().and.returnValue(Promise.resolve());
    dbService.database = { executeSql: executeSqlMock } as unknown as SQLiteObject;

    const usuario = 'testuser';
    const nombre = 'John';
    const apellido = 'Doe';
    const correo = 'john.doe@example.com';
    const celular = '123456789';

    await dbService.agregarDatosPerfil(usuario, nombre, apellido, correo, celular);

    expect(executeSqlMock).toHaveBeenCalledWith(
      `INSERT INTO PERFIL(username, nombre, apellido, correo, celular) VALUES(?, ?, ? ,? ,?)`,
      [usuario, nombre, apellido, correo, celular]
    );
  });

  it('should obtain profile data', async () => {
    const executeSqlMock = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    dbService.database = { executeSql: executeSqlMock } as unknown as SQLiteObject;

    const username = 'testuser';

    await dbService.obtenerDatosPerfil(username);

    expect(executeSqlMock).toHaveBeenCalledWith(
      `SELECT * FROM PERFIL WHERE username = ?`,
      [username]
    );
  });

  it('should add a user', async () => {
    const executeSqlMock = jasmine.createSpy().and.returnValue(Promise.resolve());
    dbService.database = { executeSql: executeSqlMock } as unknown as SQLiteObject;

    const username = 'testuser';
    const password = 'password';

    await dbService.agregarUsuario(username, password);

    expect(executeSqlMock).toHaveBeenCalledWith(
      `INSERT INTO USUARIO(username, contrasena) VALUES(?, ?)`,
      [username, password]
    );
  });

  it('should validate a user', async () => {
    const executeSqlMock = jasmine.createSpy().and.returnValue(Promise.resolve({ rows: { item: (index: number) => ({ CANTIDAD: index }) } }));
    const sqliteObjectMock: jasmine.SpyObj<SQLiteObject> = jasmine.createSpyObj('SQLiteObject', ['executeSql']);
    sqliteObjectMock.executeSql.and.callFake(executeSqlMock);
    sqliteMock.create.and.resolveTo(sqliteObjectMock);

    const username = 'testuser';

    const resultTrue = await dbService.validarUsuario(username);
    expect(resultTrue).toBeTrue();

    const resultFalse = await dbService.validarUsuario(username);
    expect(resultFalse).toBeFalse();
  });
});

function executeSqlMock(statement: string, params?: any[]): Promise<any> {
  throw new Error('Function not implemented.');
}
