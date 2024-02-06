import { TestBed } from '@angular/core/testing';

import { BasicBankService } from './basic-bank.service';

describe('BasicBankService', () => {
  let service: BasicBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
