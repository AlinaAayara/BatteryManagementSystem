import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicGroupComponent } from './basic-group.component';

describe('BasicGroupComponent', () => {
  let component: BasicGroupComponent;
  let fixture: ComponentFixture<BasicGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
