import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransactionInfoComponent } from './bank-transaction-info.component';

describe('BankTransactionInfoComponent', () => {
  let component: BankTransactionInfoComponent;
  let fixture: ComponentFixture<BankTransactionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankTransactionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankTransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
