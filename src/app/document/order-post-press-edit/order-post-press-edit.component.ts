import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-order-post-press-edit',
  templateUrl: './order-post-press-edit.component.html',
  styleUrls: ['./order-post-press-edit.component.scss']
})
export class OrderPostPressEditComponent implements OnInit {
  fg = this.fb.group({
    workId: [null, Validators.required],
    option: null,
    contactId: [null, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<OrderPostPressEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.fg.setValue(this.data);
  }

  save() {
    this.dialogRef.close({
      startDate: (this.fg.get('startDate').value as moment.Moment).toISOString(),
      price: this.fg.get('price').value,
    });
  }
}
