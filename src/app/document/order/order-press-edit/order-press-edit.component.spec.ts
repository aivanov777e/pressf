import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPressEditComponent } from './order-press-edit.component';

describe('PressEditComponent', () => {
  let component: OrderPressEditComponent;
  let fixture: ComponentFixture<OrderPressEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPressEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
