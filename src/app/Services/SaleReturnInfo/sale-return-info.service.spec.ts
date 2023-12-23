import { TestBed } from '@angular/core/testing';

import { SaleReturnInfoService } from './sale-return-info.service';

describe('SaleReturnInfoService', () => {
  let service: SaleReturnInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleReturnInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
