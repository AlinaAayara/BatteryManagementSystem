import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInwardInfoCommonComponent } from './purchase-inward-info-common.component';

describe('PurchaseInwardInfoCommonComponent', () => {
  let component: PurchaseInwardInfoCommonComponent;
  let fixture: ComponentFixture<PurchaseInwardInfoCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInwardInfoCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInwardInfoCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
