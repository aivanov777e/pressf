import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressEditComponent } from './press-edit.component';

describe('PressEditComponent', () => {
  let component: PressEditComponent;
  let fixture: ComponentFixture<PressEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
