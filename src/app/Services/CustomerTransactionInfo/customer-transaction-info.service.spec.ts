import { TestBed } from '@angular/core/testing';

import { CustomerTransactionInfoService } from './customer-transaction-info.service';

describe('CustomerTransactionInfoService', () => {
  let service: CustomerTransactionInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerTransactionInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
