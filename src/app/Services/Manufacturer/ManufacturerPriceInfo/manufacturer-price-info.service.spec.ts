import { TestBed } from '@angular/core/testing';

import { ManufacturerPriceInfoService } from './manufacturer-price-info.service';

describe('ManufacturerPriceInfoService', () => {
  let service: ManufacturerPriceInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManufacturerPriceInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
