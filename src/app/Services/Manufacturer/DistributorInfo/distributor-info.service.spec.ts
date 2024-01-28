import { TestBed } from '@angular/core/testing';

import { DistributorInfoService } from './distributor-info.service';

describe('DistributorInfoService', () => {
  let service: DistributorInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributorInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
