import { TestBed } from '@angular/core/testing';

import { FirmInfoService } from './firm-info.service';

describe('FirmInfoService', () => {
  let service: FirmInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
