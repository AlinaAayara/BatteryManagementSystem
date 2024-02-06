import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBankComponent } from './basic-bank.component';

describe('BasicBankComponent', () => {
  let component: BasicBankComponent;
  let fixture: ComponentFixture<BasicBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
