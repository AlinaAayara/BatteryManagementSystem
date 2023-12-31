import { TestBed } from '@angular/core/testing';

import { BasicAmpService } from './basic-amp.service';

describe('BasicAmpService', () => {
  let service: BasicAmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicAmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
