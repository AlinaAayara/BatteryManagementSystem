import { TestBed } from '@angular/core/testing';

import { WarrantyInfoService } from './warranty-info.service';

describe('WarrantyInfoService', () => {
  let service: WarrantyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarrantyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
