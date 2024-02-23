import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBalanceChartComponent } from './customer-balance-chart.component';

describe('CustomerBalanceChartComponent', () => {
  let component: CustomerBalanceChartComponent;
  let fixture: ComponentFixture<CustomerBalanceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBalanceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
