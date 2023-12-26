import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyReturnInfoComponent } from './warranty-return-info.component';

describe('WarrantyReturnInfoComponent', () => {
  let component: WarrantyReturnInfoComponent;
  let fixture: ComponentFixture<WarrantyReturnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantyReturnInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarrantyReturnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
