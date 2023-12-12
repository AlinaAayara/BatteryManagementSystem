import { TestBed } from '@angular/core/testing';

import { SmartFormService } from './smart-form.service';

describe('SmartFormService', () => {
  let service: SmartFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
