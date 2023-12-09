import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAccordionComponent } from './simple-accordion.component';

describe('SimpleAccordionComponent', () => {
  let component: SimpleAccordionComponent;
  let fixture: ComponentFixture<SimpleAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
