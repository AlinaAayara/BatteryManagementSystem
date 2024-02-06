import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBankCommonComponent } from './basic-bank-common.component';

describe('BasicBankCommonComponent', () => {
  let component: BasicBankCommonComponent;
  let fixture: ComponentFixture<BasicBankCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicBankCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicBankCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
