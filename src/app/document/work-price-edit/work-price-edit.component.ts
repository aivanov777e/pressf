import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, Subject } from 'rxjs';
import { Format } from 'src/app/models/format';
import { HandBookService } from 'src/app/core/services/handbook.service';
import { WorkPrice } from 'src/app/models/work-price';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-work-price-edit',
  templateUrl: './work-price-edit.component.html',
  styleUrls: ['./work-price-edit.component.less']
})
export class WorkPriceEditComponent implements OnInit, OnDestroy {
  format$: Observable<Format[]> = this.handbookSrv.getFormatList();
  color$ = of([0, 1, 2, 3, 4]);

  fg = this.fb.group({
    //startDate: [null, Validators.required],
    formatId: null,
    color1: null,
    color2: null,
    adjustment: null,
    countFrom: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
    price: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  });

  private unsubscribe: Subject<void> = new Subject();
  
  constructor(
    public dialogRef: MatDialogRef<WorkPriceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkPrice,
    private fb: FormBuilder,
    private handbookSrv: HandBookService,
  ) { }

  ngOnInit() {
    this.fg.get('adjustment').valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(v => {
      //if (v) { this.fg.get('countFrom').setValue(null, { emitEvent: false }); }
      if (v) { 
        this.fg.get('countFrom').disable();
        this.fg.get('countFrom').setValue(null); 
      } else {
        this.fg.get('countFrom').enable();
      }
    });
    // this.fg.get('countFrom').valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(v => {
    //   if (v !== '') { this.fg.get('adjustment').setValue(null, { emitEvent: false }); }
    // });
    //this.fg.get('startDate').setValue(this.data.startDate && moment(this.data.startDate));
    this.fg.get('formatId').setValue(this.data.formatId);
    this.fg.get('color1').setValue(this.data.color1);
    this.fg.get('color2').setValue(this.data.color2);
    this.fg.get('adjustment').setValue(!this.data.countFrom);
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

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
