import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedTableComponent } from './formatted-table.component';

describe('FormattedTableComponent', () => {
  let component: FormattedTableComponent;
  let fixture: ComponentFixture<FormattedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormattedTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormattedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
