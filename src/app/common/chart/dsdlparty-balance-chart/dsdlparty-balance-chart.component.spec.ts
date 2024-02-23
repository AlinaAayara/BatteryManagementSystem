import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSDLPartyBalanceChartComponent } from './dsdlparty-balance-chart.component';

describe('DSDLPartyBalanceChartComponent', () => {
  let component: DSDLPartyBalanceChartComponent;
  let fixture: ComponentFixture<DSDLPartyBalanceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DSDLPartyBalanceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DSDLPartyBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
