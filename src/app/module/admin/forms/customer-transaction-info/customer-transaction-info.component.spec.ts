import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransactionInfoComponent } from './customer-transaction-info.component';

describe('CustomerTransactionInfoComponent', () => {
  let component: CustomerTransactionInfoComponent;
  let fixture: ComponentFixture<CustomerTransactionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTransactionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
