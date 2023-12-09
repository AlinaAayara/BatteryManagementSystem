import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTabsComponent } from './simple-tabs.component';

describe('SimpleTabsComponent', () => {
  let component: SimpleTabsComponent;
  let fixture: ComponentFixture<SimpleTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
