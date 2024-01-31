import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleInfoCommonComponent } from './sale-info-common.component';

describe('SaleInfoCommonComponent', () => {
  let component: SaleInfoCommonComponent;
  let fixture: ComponentFixture<SaleInfoCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleInfoCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleInfoCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
