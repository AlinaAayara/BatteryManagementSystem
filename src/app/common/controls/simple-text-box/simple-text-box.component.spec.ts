import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextBoxComponent } from './simple-text-box.component';

describe('SimpleTextBoxComponent', () => {
  let component: SimpleTextBoxComponent;
  let fixture: ComponentFixture<SimpleTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTextBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
