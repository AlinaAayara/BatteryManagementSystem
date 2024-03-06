import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldSerialNoListComponent } from './old-serial-no-list.component';

describe('OldSerialNoListComponent', () => {
  let component: OldSerialNoListComponent;
  let fixture: ComponentFixture<OldSerialNoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldSerialNoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldSerialNoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
