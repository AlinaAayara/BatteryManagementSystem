import { TestBed } from '@angular/core/testing';

import { SaleInfoService } from './sale-info.service';

describe('SaleInfoService', () => {
  let service: SaleInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
