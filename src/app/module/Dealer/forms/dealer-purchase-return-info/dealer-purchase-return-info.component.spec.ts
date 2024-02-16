import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerPurchaseReturnInfoComponent } from './dealer-purchase-return-info.component';

describe('DealerPurchaseReturnInfoComponent', () => {
  let component: DealerPurchaseReturnInfoComponent;
  let fixture: ComponentFixture<DealerPurchaseReturnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerPurchaseReturnInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerPurchaseReturnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
