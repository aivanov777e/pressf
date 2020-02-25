import { Component, OnInit, Inject, AfterContentInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { WorkService } from 'src/app/core/services/work.service';
import { Observable } from 'rxjs';
import { Work } from 'src/app/models/work';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-order-post-press-edit',
  templateUrl: './order-post-press-edit.component.html',
  styleUrls: ['./order-post-press-edit.component.scss']
})
export class OrderPostPressEditComponent implements OnInit {
  fg = this.fb.group({
    work: [null, Validators.required],
    option: null,
    contact: [null, Validators.required],
    
    id: null
  });

  work$: Observable<Work[]> = this.workSrv.getList();
  performer$: Observable<Contact[]>;

  trigger: MatAutocompleteTrigger;

  constructor(
    public dialogRef: MatDialogRef<OrderPostPressEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private workSrv: WorkService,
    private contactSrv: ContactService,
  ) { }

  ngOnInit(): void {
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
    //setTimeout(() => this.fg.patchValue(this.data));
    this.fg.patchValue(this.data);
  }

  displayFn(contact?: Contact): string | undefined {
    return contact ? contact.name : undefined;
  }

  save() {
    const pp = this.fg.value;
    this.dialogRef.close({...this.fg.value, contactId: pp.contact.id, workId: pp.work.id});
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
