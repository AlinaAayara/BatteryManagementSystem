import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransactionInfoCommonComponent } from './bank-transaction-info-common.component';

describe('BankTransactionInfoCommonComponent', () => {
  let component: BankTransactionInfoCommonComponent;
  let fixture: ComponentFixture<BankTransactionInfoCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankTransactionInfoCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankTransactionInfoCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
