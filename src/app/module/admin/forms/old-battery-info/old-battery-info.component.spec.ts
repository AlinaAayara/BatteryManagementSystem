import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldBatteryInfoComponent } from './old-battery-info.component';

describe('OldBatteryInfoComponent', () => {
  let component: OldBatteryInfoComponent;
  let fixture: ComponentFixture<OldBatteryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldBatteryInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldBatteryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
