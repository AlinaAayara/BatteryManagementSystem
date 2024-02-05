import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyTransactionInfoCommonComponent } from './party-transaction-info-common.component';

describe('PartyTransactionInfoCommonComponent', () => {
  let component: PartyTransactionInfoCommonComponent;
  let fixture: ComponentFixture<PartyTransactionInfoCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyTransactionInfoCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyTransactionInfoCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
