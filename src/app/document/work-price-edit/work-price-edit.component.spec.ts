import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPriceEditComponent } from './work-price-edit.component';

describe('WorkPriceEditComponent', () => {
  let component: WorkPriceEditComponent;
  let fixture: ComponentFixture<WorkPriceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPriceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPriceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
