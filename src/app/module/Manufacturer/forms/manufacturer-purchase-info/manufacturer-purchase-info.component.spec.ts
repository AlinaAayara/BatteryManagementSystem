import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerPurchaseInfoComponent } from './manufacturer-purchase-info.component';

describe('ManufacturerPurchaseInfoComponent', () => {
  let component: ManufacturerPurchaseInfoComponent;
  let fixture: ComponentFixture<ManufacturerPurchaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerPurchaseInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerPurchaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
