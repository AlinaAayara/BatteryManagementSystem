import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmInfoComponent } from './firm-info.component';

describe('FirmInfoComponent', () => {
  let component: FirmInfoComponent;
  let fixture: ComponentFixture<FirmInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
