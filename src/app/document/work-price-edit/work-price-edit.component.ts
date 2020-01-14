import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Format } from 'src/app/models/format';
import { HandBookService } from 'src/app/core/services/handbook.service';
import { WorkPrice } from 'src/app/models/work-price';

@Component({
  selector: 'app-work-price-edit',
  templateUrl: './work-price-edit.component.html',
  styleUrls: ['./work-price-edit.component.less']
})
export class WorkPriceEditComponent implements OnInit {
  format$: Observable<Format[]> = this.handbookSrv.getFormatList();
  color$ = of([0, 1, 2, 3, 4]);

  fg = this.fb.group({
    //startDate: [null, Validators.required],
    formatId: null,
    color1: null,
    color2: null,
    countFrom: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
    price: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  });

  constructor(
    public dialogRef: MatDialogRef<WorkPriceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkPrice,
    private fb: FormBuilder,
    private handbookSrv: HandBookService,
  ) { }

  ngOnInit() {
    //this.fg.get('startDate').setValue(this.data.startDate && moment(this.data.startDate));
    this.fg.get('formatId').setValue(this.data.formatId);
    this.fg.get('color1').setValue(this.data.color1);
    this.fg.get('color2').setValue(this.data.color2);
    this.fg.get('countFrom').setValue(this.data.countFrom);
    this.fg.get('price').setValue(this.data.price);
  }

  save() {
    this.dialogRef.close({
      id: this.data.id,
      workId: this.data.workId,
      formatId: this.fg.get('formatId').value,
      color1: this.fg.get('color1').value,
      color2: this.fg.get('color2').value,
      countFrom: this.fg.get('countFrom').value,
      price: this.fg.get('price').value,
    });
  }
}
