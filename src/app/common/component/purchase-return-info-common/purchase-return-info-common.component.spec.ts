import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnInfoCommonComponent } from './purchase-return-info-common.component';

describe('PurchaseReturnInfoCommonComponent', () => {
  let component: PurchaseReturnInfoCommonComponent;
  let fixture: ComponentFixture<PurchaseReturnInfoCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReturnInfoCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseReturnInfoCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
