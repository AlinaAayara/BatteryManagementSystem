import { TestBed } from '@angular/core/testing';

import { PurchaseReturnInfoService } from './purchase-return-info.service';

describe('PurchaseReturnInfoService', () => {
  let service: PurchaseReturnInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseReturnInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
