import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsdlListDetailComponent } from './dsdl-list-detail.component';

describe('DsdlListDetailComponent', () => {
  let component: DsdlListDetailComponent;
  let fixture: ComponentFixture<DsdlListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsdlListDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsdlListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
