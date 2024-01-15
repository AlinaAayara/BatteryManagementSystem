import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyTransactionInfoComponent } from './party-transaction-info.component';

describe('PartyTransactionInfoComponent', () => {
  let component: PartyTransactionInfoComponent;
  let fixture: ComponentFixture<PartyTransactionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyTransactionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyTransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
