import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialNoTimeLineComponent } from './serial-no-time-line.component';

describe('SerialNoTimeLineComponent', () => {
  let component: SerialNoTimeLineComponent;
  let fixture: ComponentFixture<SerialNoTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialNoTimeLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerialNoTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
