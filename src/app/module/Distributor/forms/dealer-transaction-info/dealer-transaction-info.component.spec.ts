import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTransactionInfoComponent } from './dealer-transaction-info.component';

describe('DealerTransactionInfoComponent', () => {
  let component: DealerTransactionInfoComponent;
  let fixture: ComponentFixture<DealerTransactionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerTransactionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerTransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
