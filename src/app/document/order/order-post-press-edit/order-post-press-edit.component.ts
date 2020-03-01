import { Component, OnInit, Inject, AfterContentInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { WorkService } from 'src/app/core/services/work.service';
import { Observable, of } from 'rxjs';
import { Work } from 'src/app/models/work';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/models/contact';
import { HandBookService } from 'src/app/core/services/handbook.service';

@Component({
  selector: 'app-order-post-press-edit',
  templateUrl: './order-post-press-edit.component.html',
  styleUrls: ['./order-post-press-edit.component.scss']
})
export class OrderPostPressEditComponent implements OnInit {
  fg = this.fb.group({
    work: [null, Validators.required],
    color: null,
    option: null,
    contact: [null, Validators.required],

    id: null
  });

  work$: Observable<Work[]> = this.workSrv.getList(this.data.postPressTypeId);
  performer$: Observable<Contact[]>;
  color$: Observable<any[]>;

  trigger: MatAutocompleteTrigger;

  constructor(
    public dialogRef: MatDialogRef<OrderPostPressEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private workSrv: WorkService,
    private contactSrv: ContactService,
    private handbookSrv: HandBookService,
  ) { }

  ngOnInit(): void {
    this.data.color = this.data.color1 &&  this.data.color1 + '+' + this.data.color2;

    this.performer$ = this.fg.get('contact').valueChanges.pipe(
      startWith(this.data.contact || ''),
      //debounceTime(1500),
      // distinctUntilChanged(),
      switchMap((val) => {
        val = (val && val.name) || val;
        return this.contactSrv.getList(val, null).pipe(
          tap(response => {
            const d = response.find(r => r.name === val);
            if (d && this.fg.get('contact').value.id !== d.id) {
              this.fg.get('contact').setValue(d, {emitEvent: false});
            }
            this.showAutocompletePanel();
          })
        );
      })
    );

    this.color$ = this.fg.get('work').valueChanges.pipe(
      startWith(this.data.work || null),
      switchMap((work) => work ?
      this.handbookSrv.getColorList({workId: work.id})
      : of([])),
      tap(data => {
        if (!data.some(v => v.name === this.fg.get('color').value)) { this.fg.get('color').reset(); }
      }),
    );

    //setTimeout(() => this.fg.patchValue(this.data));
    this.fg.patchValue(this.data);
  }

  displayFn(contact?: Contact): string | undefined {
    return contact ? contact.name : undefined;
  }

  save() {
    let pp = this.fg.value;
    pp = {...pp, contactId: pp.contact.id, workId: pp.work.id};
    if (pp.color) {
      const colors = pp.color.split('+');
      pp.color1 = +colors[0];
      pp.color2 = +colors[1];
    } else {
      pp.color1 = null;
      pp.color2 = null;
    }

    this.dialogRef.close(pp);
  }

  clearField(name, trig: MatAutocompleteTrigger) {
    this.fg.get(name).reset();
    this.trigger = trig;
  }

  showAutocompletePanel() {
    if (this.trigger) {
      this.trigger.openPanel();
      this.trigger = null;
    }
  }

  compareFn(option, value): boolean {
    return option && value && option.id === value.id;
  }

}
