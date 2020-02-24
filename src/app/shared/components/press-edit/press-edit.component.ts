import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Equipment } from 'src/app/models/equipment';
import { Format } from 'src/app/models/format';
import { Material } from 'src/app/models/material';
import { Paper } from 'src/app/models/paper';
import { Contact } from 'src/app/models/contact';
import { OrderPress } from 'src/app/models/order-press';
import { ContactService } from 'src/app/core/services/contact.service';
import { HandBookService } from 'src/app/core/services/handbook.service';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { PaperService } from 'src/app/core/services/paper.service';
import { startWith, switchMap, tap, debounceTime } from 'rxjs/operators';
import { OrderPostPressEditComponent } from 'src/app/document/order-post-press-edit/order-post-press-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { MatTable } from '@angular/material/table';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-press-edit',
  templateUrl: './press-edit.component.html',
  styleUrls: ['./press-edit.component.scss']
})
export class PressEditComponent implements OnInit {
  @Input() name: string;

  _press: OrderPress = {} as OrderPress;
  @Input()
  set press(val: OrderPress) {
    this._press = val || {} as OrderPress;
    this._press.color = this._press.color1 + '+' + this._press.color2;
    this.fg.patchValue(this._press);
  }
  get press() { return this._press; }

  @ViewChild(MatTable) table: MatTable<any>;

  equipment$: Observable<Equipment[]>;
  format$: Observable<Format[]>;
  color$: Observable<any[]>;
  material$: Observable<Material[]>;
  paper$: Observable<Paper[]>;
  performer$: Observable<Contact[]>;

  fg = this.fb.group({
      id: undefined,
      contact: [null],
      equipmentId: [null],
      formatId: [null],
      paperId: [null],
      count: [null],
      countAdj: [null],
      color: [null],
      color1: [null],
      color2: [null],
      pricePaper: [null],
      pricePress: [null],
      materialId: null,
    });

  constructor(
    private fb: FormBuilder,
    private contactSrv: ContactService,
    private handbookSrv: HandBookService,
    private equipmentSrv: EquipmentService,
    private paperService: PaperService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.equipment$ = this.equipmentSrv.getList(null);

    this.format$ = this.fg.get('equipmentId').valueChanges.pipe(
      switchMap(() => this.fg.get('equipmentId').value ? this.handbookSrv.getFormatList(this.fg.get('equipmentId').value) : of([])),
      tap(data => {
        if (!data.some(v => v.id === this.fg.get('formatId').value)) { this.fg.get('formatId').reset(); }
      }),
    );

    this.material$ = this.fg.get('formatId').valueChanges.pipe(
      switchMap(() => this.fg.get('formatId').value ? this.handbookSrv.getMaterialList(this.fg.get('formatId').value) : of([])),
      tap(data => {
        if (!data.some(v => v.id === this.fg.get('materialId').value)) { this.fg.get('materialId').reset(); }
      }),
    );

    this.paper$ = this.fg.get('materialId').valueChanges.pipe(
      switchMap(() => this.fg.get('materialId').value
        ? this.paperService.getList({formatId: this.fg.get('formatId').value, materialId: this.fg.get('materialId').value})
        : of([])
      ),
      tap(data => {
        if (!data.some(v => v.id === this.fg.get('paperId').value)) { this.fg.get('paperId').reset(); }
      }),
    );

    this.color$ = this.fg.get('formatId').valueChanges.pipe(
      switchMap(() => this.fg.get('formatId').value
        ? this.handbookSrv.getColorList(this.fg.get('equipmentId').value, this.fg.get('formatId').value)
        : of([])
      ),
      tap(data => {
        if (!data.some(v => v.name === this.fg.get('color').value)) { this.fg.get('color').reset(); }
      }),
    );

    this.performer$ = this.fg.get('contact').valueChanges.pipe(
      startWith(''),
      //debounceTime(500),
      // distinctUntilChanged(),
      switchMap((val) => {
        val = (val && val.name) || val;
        return this.contactSrv.getList(val, null).pipe(
          tap(response => {
            const d = response.find(r => r.name === val);
            if (d && this.fg.get('contact').value.id !== d.id) {
              this.fg.get('contact').setValue(d, {emitEvent: false});
            }
          })
        );
      })
    );
  }

  displayFn(contact?: Contact): string | undefined {
    return contact ? contact.name : undefined;
  }

  editPostPress(postPress = null, index = null) {
    const dialogRef = this.dialog.open(OrderPostPressEditComponent, {
      disableClose: true,
      //width: '250px',
      //data: {name: this.name, animal: this.animal}
      data: postPress || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (postPress) {
          this.press.postPress[index] = result;
        } else {
          this.press.postPress.push(result);
        }
        //this.press.postPress.sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
        this.table.renderRows();
      }
    });
  }

  deletePostPress(index) {
    const confDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Внимание', message: 'Вы дейсвительно хотите удалить?'} as ConfirmDialogData
    });

    confDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.press.postPress.splice(index, 1);
        this.table.renderRows();
      }
    });
  }

  clearField(name, trig: MatAutocompleteTrigger) {
    //trig.closePanel();
    this.fg.get(name).reset();
    //trig.panelClosingActions.subscribe((v) => console.log(v));
    //trig.openPanel();
    setTimeout(() => {
      //this.fg.get(name).reset();
      trig.openPanel();
      //trig..blur();
    });
    //trig.writeValue(null);
  }
}
