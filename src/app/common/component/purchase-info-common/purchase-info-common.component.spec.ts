import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInfoCommonComponent } from './purchase-info-common.component';

describe('PurchaseInfoCommonComponent', () => {
  let component: PurchaseInfoCommonComponent;
  let fixture: ComponentFixture<PurchaseInfoCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInfoCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInfoCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
