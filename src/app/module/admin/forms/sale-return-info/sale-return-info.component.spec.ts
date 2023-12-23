import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleReturnInfoComponent } from './sale-return-info.component';

describe('SaleReturnInfoComponent', () => {
  let component: SaleReturnInfoComponent;
  let fixture: ComponentFixture<SaleReturnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleReturnInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleReturnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
