import { TestBed } from '@angular/core/testing';

import { OldBatteryInfoService } from './old-battery-info.service';

describe('OldBatteryInfoService', () => {
  let service: OldBatteryInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldBatteryInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
