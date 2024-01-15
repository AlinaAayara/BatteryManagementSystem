import { TestBed } from '@angular/core/testing';

import { ExpenseInfoService } from './expense-info.service';

describe('ExpenseInfoService', () => {
  let service: ExpenseInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
