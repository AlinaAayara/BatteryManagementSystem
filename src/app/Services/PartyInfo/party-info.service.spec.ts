import { TestBed } from '@angular/core/testing';

import { PartyInfoService } from './party-info.service';

describe('PartyInfoService', () => {
  let service: PartyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
