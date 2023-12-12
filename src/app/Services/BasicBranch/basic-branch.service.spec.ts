import { TestBed } from '@angular/core/testing';

import { BasicBranchService } from './basic-branch.service';

describe('BasicBranchService', () => {
  let service: BasicBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
