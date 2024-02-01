import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInwardInfoComponent } from './purchase-inward-info.component';

describe('PurchaseInwardInfoComponent', () => {
  let component: PurchaseInwardInfoComponent;
  let fixture: ComponentFixture<PurchaseInwardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInwardInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInwardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
