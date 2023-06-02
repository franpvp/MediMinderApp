import { TestBed } from '@angular/core/testing';

import { MyPerfilService } from './my-perfil.service';

describe('MyPerfilService', () => {
  let service: MyPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
