import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBranchComponent } from './basic-branch.component';

describe('BasicBranchComponent', () => {
  let component: BasicBranchComponent;
  let fixture: ComponentFixture<BasicBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
