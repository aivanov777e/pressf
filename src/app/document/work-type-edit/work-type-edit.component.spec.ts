import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTypeEditComponent } from './work-type-edit.component';

describe('WorkTypeEditComponent', () => {
  let component: WorkTypeEditComponent;
  let fixture: ComponentFixture<WorkTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
