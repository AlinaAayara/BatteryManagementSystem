import { TestBed } from '@angular/core/testing';

import { DealerPriceInfoService } from './dealer-price-info.service';

describe('DealerPriceInfoService', () => {
  let service: DealerPriceInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerPriceInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
