import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { RecordatorioService } from './recordatorio.service';
import { DbService } from '../db-service/db.service';

describe('RecordatorioService', () => {
  let service: RecordatorioService;
  let dbServiceMock: jasmine.SpyObj<DbService>;

  beforeEach(() => {
    const dbServiceSpy = jasmine.createSpyObj('DbService', ['']);

    TestBed.configureTestingModule({
      providers: [
        RecordatorioService,
        { provide: DbService, useValue: dbServiceSpy }
      ]
    });
    service = TestBed.inject(RecordatorioService);
    dbServiceMock = TestBed.inject(DbService) as jasmine.SpyObj<DbService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add recordatorio to listaRecordatorios', () => {
    const nombreMed = 'Ibuprofen';
    const tiempoIng = '9:00 AM';
    const duracionDias = '7 days';

    service.addRecordatorio(nombreMed, tiempoIng, duracionDias);

    expect(service.listaRecordatorios).toEqual([nombreMed, tiempoIng, duracionDias]);
  });

  it('should send alert through alertSubject', () => {
    const alerta = { message: 'Alerta de recordatorio' };

    let alertaRecibida: any;
    service.getAlertSubject().subscribe((alert) => {
      alertaRecibida = alert;
    });

    service.enviarAlerta(alerta);

    expect(alertaRecibida).toEqual(alerta);
  });
});
