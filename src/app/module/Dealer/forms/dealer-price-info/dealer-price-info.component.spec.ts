import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerPriceInfoComponent } from './dealer-price-info.component';

describe('DealerPriceInfoComponent', () => {
  let component: DealerPriceInfoComponent;
  let fixture: ComponentFixture<DealerPriceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerPriceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerPriceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
