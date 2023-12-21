import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceCustomerSearchComponent } from './advance-customer-search.component';

describe('AdvanceCustomerSearchComponent', () => {
  let component: AdvanceCustomerSearchComponent;
  let fixture: ComponentFixture<AdvanceCustomerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceCustomerSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceCustomerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
