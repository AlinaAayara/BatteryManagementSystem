import { TestBed } from '@angular/core/testing';

import { DistributorPriceInfoService } from './distributor-price-info.service';

describe('DistributorPriceInfoService', () => {
  let service: DistributorPriceInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributorPriceInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
