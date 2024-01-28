import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorPriceInfoComponent } from './distributor-price-info.component';

describe('DistributorPriceInfoComponent', () => {
  let component: DistributorPriceInfoComponent;
  let fixture: ComponentFixture<DistributorPriceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorPriceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorPriceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
