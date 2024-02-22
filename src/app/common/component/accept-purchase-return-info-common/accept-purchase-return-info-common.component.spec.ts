import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptPurchaseReturnInfoCommonComponent } from './accept-purchase-return-info-common.component';

describe('AcceptPurchaseReturnInfoCommonComponent', () => {
  let component: AcceptPurchaseReturnInfoCommonComponent;
  let fixture: ComponentFixture<AcceptPurchaseReturnInfoCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptPurchaseReturnInfoCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptPurchaseReturnInfoCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
