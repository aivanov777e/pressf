import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperPriceEditComponent } from './paper-price-edit.component';

describe('PaperPriceEditComponent', () => {
  let component: PaperPriceEditComponent;
  let fixture: ComponentFixture<PaperPriceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperPriceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperPriceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
