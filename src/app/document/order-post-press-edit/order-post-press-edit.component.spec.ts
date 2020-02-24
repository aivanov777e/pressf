import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPostPressEditComponent } from './order-post-press-edit.component';

describe('OrderPostPressEditComponent', () => {
  let component: OrderPostPressEditComponent;
  let fixture: ComponentFixture<OrderPostPressEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPostPressEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPostPressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
