import { TestBed } from '@angular/core/testing';

import { DealerInfoService } from './dealer-info.service';

describe('DealerInfoService', () => {
  let service: DealerInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
