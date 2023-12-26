import { TestBed } from '@angular/core/testing';

import { WarrantyReturnInfoService } from './warranty-return-info.service';

describe('WarrantyReturnInfoService', () => {
  let service: WarrantyReturnInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarrantyReturnInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
