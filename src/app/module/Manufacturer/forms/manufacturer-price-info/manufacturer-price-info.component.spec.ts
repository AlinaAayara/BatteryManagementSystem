import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerPriceInfoComponent } from './manufacturer-price-info.component';

describe('ManufacturerPriceInfoComponent', () => {
  let component: ManufacturerPriceInfoComponent;
  let fixture: ComponentFixture<ManufacturerPriceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerPriceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerPriceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
