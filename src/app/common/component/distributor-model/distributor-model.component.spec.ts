import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorModelComponent } from './distributor-model.component';

describe('DistributorModelComponent', () => {
  let component: DistributorModelComponent;
  let fixture: ComponentFixture<DistributorModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
