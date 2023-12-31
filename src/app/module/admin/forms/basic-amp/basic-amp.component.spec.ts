import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAmpComponent } from './basic-amp.component';

describe('BasicAmpComponent', () => {
  let component: BasicAmpComponent;
  let fixture: ComponentFixture<BasicAmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicAmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicAmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
