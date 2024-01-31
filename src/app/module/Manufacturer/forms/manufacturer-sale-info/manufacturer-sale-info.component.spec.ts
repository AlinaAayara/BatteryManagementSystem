import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerSaleInfoComponent } from './manufacturer-sale-info.component';

describe('ManufacturerSaleInfoComponent', () => {
  let component: ManufacturerSaleInfoComponent;
  let fixture: ComponentFixture<ManufacturerSaleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerSaleInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerSaleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
