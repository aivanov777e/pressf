import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDivisionComponent } from './select-division.component';

describe('SelectDivisionComponent', () => {
  let component: SelectDivisionComponent;
  let fixture: ComponentFixture<SelectDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
