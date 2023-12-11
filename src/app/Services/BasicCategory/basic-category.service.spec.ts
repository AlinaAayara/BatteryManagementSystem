import { TestBed } from '@angular/core/testing';

import { BasicCategoryService } from './basic-category.service';

describe('BasicCategoryService', () => {
  let service: BasicCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
