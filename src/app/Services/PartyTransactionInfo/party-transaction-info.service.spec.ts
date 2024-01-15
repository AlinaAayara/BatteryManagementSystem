import { TestBed } from '@angular/core/testing';

import { PartyTransactionInfoService } from './party-transaction-info.service';

describe('PartyTransactionInfoService', () => {
  let service: PartyTransactionInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyTransactionInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
