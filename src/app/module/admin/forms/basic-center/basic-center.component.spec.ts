import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCenterComponent } from './basic-center.component';

describe('BasicCenterComponent', () => {
  let component: BasicCenterComponent;
  let fixture: ComponentFixture<BasicCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
