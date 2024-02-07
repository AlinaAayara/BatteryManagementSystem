import { TestBed } from '@angular/core/testing';

import { BankTransactionInfoService } from './bank-transaction-info.service';

describe('BankTransactionInfoService', () => {
  let service: BankTransactionInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankTransactionInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
