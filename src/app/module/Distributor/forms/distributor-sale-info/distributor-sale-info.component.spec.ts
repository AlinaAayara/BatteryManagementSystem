import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorSaleInfoComponent } from './distributor-sale-info.component';

describe('DistributorSaleInfoComponent', () => {
  let component: DistributorSaleInfoComponent;
  let fixture: ComponentFixture<DistributorSaleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorSaleInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorSaleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
