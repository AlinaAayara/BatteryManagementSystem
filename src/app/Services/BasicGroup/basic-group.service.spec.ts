import { TestBed } from '@angular/core/testing';

import { BasicGroupService } from './basic-group.service';

describe('BasicGroupService', () => {
  let service: BasicGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
