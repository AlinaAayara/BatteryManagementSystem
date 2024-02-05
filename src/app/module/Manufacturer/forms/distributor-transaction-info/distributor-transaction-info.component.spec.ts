import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorTransactionInfoComponent } from './distributor-transaction-info.component';

describe('DistributorTransactionInfoComponent', () => {
  let component: DistributorTransactionInfoComponent;
  let fixture: ComponentFixture<DistributorTransactionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorTransactionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorTransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
