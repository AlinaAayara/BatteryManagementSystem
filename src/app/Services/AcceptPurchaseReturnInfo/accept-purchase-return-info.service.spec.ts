import { TestBed } from '@angular/core/testing';

import { AcceptPurchaseReturnInfoService } from './accept-purchase-return-info.service';

describe('AcceptPurchaseReturnInfoService', () => {
  let service: AcceptPurchaseReturnInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptPurchaseReturnInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
