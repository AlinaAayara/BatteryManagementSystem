import { TestBed } from '@angular/core/testing';

import { PurchaseInwardInfoService } from './purchase-inward-info.service';

describe('PurchaseInwardInfoService', () => {
  let service: PurchaseInwardInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseInwardInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
