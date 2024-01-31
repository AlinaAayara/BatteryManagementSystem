import { TestBed } from '@angular/core/testing';

import { ManufacturerPurchaseInfoService } from './manufacturer-purchase-info.service';

describe('ManufacturerPurchaseInfoService', () => {
  let service: ManufacturerPurchaseInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManufacturerPurchaseInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
