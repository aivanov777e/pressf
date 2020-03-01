import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperEditDialogComponent } from './paper-edit-dialog.component';

describe('PaperEditDialogComponent', () => {
  let component: PaperEditDialogComponent;
  let fixture: ComponentFixture<PaperEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
