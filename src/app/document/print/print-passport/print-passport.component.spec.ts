import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPassportComponent } from './print-passport.component';

describe('PrintPassportComponent', () => {
  let component: PrintPassportComponent;
  let fixture: ComponentFixture<PrintPassportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPassportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
