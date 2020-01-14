import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-paper-price-edit',
  templateUrl: './paper-price-edit.component.html',
  styleUrls: ['./paper-price-edit.component.less']
})
export class PaperPriceEditComponent implements OnInit {
  fg = this.fb.group({
    startDate: [null, Validators.required],
    price: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  });

  constructor(
    public dialogRef: MatDialogRef<PaperPriceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.fg.get('startDate').setValue(this.data.startDate && moment(this.data.startDate));
    this.fg.get('price').setValue(this.data.price);
  }

  save() {
    this.dialogRef.close({
      startDate: (this.fg.get('startDate').value as moment.Moment).toISOString(),
      price: this.fg.get('price').value,
    });
  }
}
