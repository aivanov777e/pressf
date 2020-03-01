import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, merge } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { ContactService } from 'src/app/core/services/contact.service';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { HandBookService } from 'src/app/core/services/handbook.service';
import { OrderService } from 'src/app/core/services/order.service';
import { PaperService } from 'src/app/core/services/paper.service';
import { Contact } from 'src/app/models/contact';
import { Equipment } from 'src/app/models/equipment';
import { Format } from 'src/app/models/format';
import { Order } from 'src/app/models/order';
import { Paper } from 'src/app/models/paper';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Material } from 'src/app/models/material';
import { MatDialog } from '@angular/material/dialog';
import { OrderPressEditComponent } from 'src/app/document/order/order-press-edit/order-press-edit.component';
import { WorkType } from 'src/app/models/order-post-press';

// export function selectedValueValidator(): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     //const forbidden = nameRe.test(control.value);
//     //return control ? {'1selectedValueValidator': {value: control.value}} : null;
//     return null;
//   };
// }

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.less']
})
export class OrderEditComponent implements OnInit {
  orderForm = this.fb.group({
    id: undefined,
    division: [null, Validators.required],
    subdivision: [null],
    name: [null, Validators.required],
    number: [null, Validators.required],
    regDate: [null, Validators.required],
    contact: [null],
    contactTel: [null],

    countOfItem: null,
    sheetsInItem: null,
    format: null,
    formatId: null,
    width: null,
    height: null,
    // contact: this.fb.group({
    //   name: [null, Validators.required],
    //   tel: [null, Validators.required],
    // }),
    // cover: this.fb.group({
    //   id: undefined,
    //   contact: [null],
    //   equipmentId: [null],
    //   formatId: [null],
    //   paperId: [null],
    //   count: [null],
    //   countAdj: [null],
    //   color: [null],
    //   color1: [null],
    //   color2: [null],
    //   pricePaper: [null],
    //   pricePress: [null],
    //   materialId: null,
    // }),
    // block: this.fb.group({
    //   id: undefined,
    //   contact: [null],
    //   equipmentId: [null],
    //   formatId: [null],
    //   paperId: [null],
    //   count: [null],
    //   countAdj: [null],
    //   color: [null],
    //   color1: [null],
    //   color2: [null],
    //   pricePaper: [null],
    //   pricePress: [null],
    //   materialId: null,
    // }),



    // coverPrinterId: [],
    // coverFormatId: [],
    // coverMaterialId: [],
    // coverColor1Id: [],
    // coverColor2Id: [],
    // coverCount: [],
    // coverCountAdj: [],
    // coverPerformerId: []
    // address2: null,
    // city: [null, Validators.required],
    // state: [null, Validators.required],
    // postalCode: [null, Validators.compose([
    //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ],
    // shipping: ['free', Validators.required]
  });
  // divisionFC = new FormControl('');
  order: Order = {} as Order;
  @ViewChild('cover') private coverComp: OrderPressEditComponent;
  @ViewChild('block') private blockComp: OrderPressEditComponent;

  // divisionId: string;
  // divisionId$ = new Subject<string>();
  contact$: Observable<Contact[]>;

  // equipment$: Observable<Equipment[]>;
  format$: Observable<Format[]> = this.handbookSrv.getFormatList();
  // color$: Observable<any[]>;
  // material$: Observable<Material[]>;
  // paper$: Observable<Paper[]>;
  // performer$: Observable<Contact[]>;

  // equipment2$: Observable<Equipment[]>;
  // format2$: Observable<Format[]>;
  // color2$: Observable<any[]>;
  // material2$: Observable<Material[]>;
  // paper2$: Observable<Paper[]>;
  // performer2$: Observable<Contact[]>;

  //@ViewChild('formatCov') formatCov: MatSelect;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private orderService: OrderService,
    private contactSrv: ContactService,
    private handbookSrv: HandBookService,
    private equipmentSrv: EquipmentService,
    private paperService: PaperService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.orderService.get(params.get('id')))
    )
    .subscribe(data => {
      this.fillFields(data);
    });

    this.orderForm.get('division').valueChanges.subscribe(data => {
      const subdivision = this.orderForm.get('subdivision').value;
      if (subdivision && subdivision.id && subdivision.divisionId !== (data && data.id)) {
        this.orderForm.get('subdivision').reset();
      } else { this.orderForm.get('subdivision').updateValueAndValidity(); }
    });

    this.orderForm.get('subdivision').valueChanges.subscribe(data => {
      const contact = this.orderForm.get('contact').value;
      if (contact && contact.id && contact.divisionId !== (data && data.id)) {
        this.orderForm.get('contact').reset();
      } else { this.orderForm.get('contact').updateValueAndValidity(); }
    });

    this.orderForm.get('contact').valueChanges.subscribe(data => {
      const contact = data; // this.orderForm.get('contact').value;
      if (contact && contact.tel) {
        this.orderForm.get('contactTel').setValue(contact.tel);
      } else { this.orderForm.get('contactTel').reset(); }
    });

    this.contact$ = this.orderForm.get('contact').valueChanges.pipe(
      startWith(''),
      // debounceTime(environment.debounceTime),
      // distinctUntilChanged(),
      switchMap((val) => {
        val = (val && val.name) || val;
        const division = this.orderForm.get('division').value;
        const subdivision = this.orderForm.get('subdivision').value;
        const divisionId = subdivision ? subdivision.id : (division && division.id);
        if (!divisionId) {
          return of([]);
        }
        return this.contactSrv.getList(val, divisionId).pipe(
          tap(response => {
            const d = response.find(r => r.name === val);
            if (d && this.orderForm.get('contact').value.id !== d.id) {
              this.orderForm.get('contact').setValue(d, {emitEvent: false});
              this.orderForm.get('contactTel').setValue(d.tel, {emitEvent: false});
            }
          })
        );
      })
    );

    this.orderForm.get('format').valueChanges.subscribe(format => {
      if (format) {
        this.orderForm.patchValue({formatId: format.id, width: format.width, height: format.height}, {emitEvent: false});
      }
    });

    merge(this.orderForm.get('width').valueChanges, this.orderForm.get('height').valueChanges).subscribe(v => {
      this.orderForm.patchValue({formatId: null, format: null}, {emitEvent: false});
    });

  //   this.equipment$ = this.equipmentSrv.getList(null);
  //   this.equipment2$ = this.equipmentSrv.getList(null);

  //   this.format$ = this.orderForm.get('cover.equipmentId').valueChanges.pipe(
  //     switchMap(() => this.orderForm.get('cover.equipmentId').value ? this.handbookSrv.getFormatList(this.orderForm.get('cover.equipmentId').value) : of([])),
  //     tap(data => {
  //       if (!data.some(v => v.id === this.orderForm.get('cover.formatId').value)) { this.orderForm.get('cover.formatId').reset(); }
  //     }),
  //   );
  //   this.format2$ = this.orderForm.get('block.equipmentId').valueChanges.pipe(
  //     //tap(() => this.orderForm.get('block.formatId').reset()),
  //     switchMap(() => this.orderForm.get('block.equipmentId').value ? this.handbookSrv.getFormatList(this.orderForm.get('block.equipmentId').value) : of([])),
  //     tap(data => {
  //       if (!data.some(v => v.id === this.orderForm.get('block.formatId').value)) { this.orderForm.get('block.formatId').reset(); }
  //     }),
  //   );

  //   //this.material$ = this.paperService.getList(null);
  //   this.material$ = this.orderForm.get('cover.formatId').valueChanges.pipe(
  //     //tap(() => this.orderForm.get('cover.materialId').reset()),
  //     switchMap(() => this.orderForm.get('cover.formatId').value ? this.handbookSrv.getMaterialList(this.orderForm.get('cover.formatId').value) : of([])),
  //     tap(data => {
  //       if (!data.some(v => v.id === this.orderForm.get('cover.materialId').value)) { this.orderForm.get('cover.materialId').reset(); }
  //     }),
  //   );
  //   this.material2$ = this.orderForm.get('block.formatId').valueChanges.pipe(
  //     //tap(() => this.orderForm.get('block.materialId').reset()),
  //     switchMap(() => this.orderForm.get('block.formatId').value ? this.handbookSrv.getMaterialList(this.orderForm.get('block.formatId').value) : of([])),
  //     tap(data => {
  //       if (!data.some(v => v.id === this.orderForm.get('block.materialId').value)) { this.orderForm.get('block.materialId').reset(); }
  //     }),
  //   );

  //   this.paper$ = this.orderForm.get('cover.materialId').valueChanges.pipe(
  //     //tap(() => this.orderForm.get('cover.paperId').reset()),
  //     switchMap(() => this.orderForm.get('cover.materialId').value
  //       ? this.paperService.getList({formatId: this.orderForm.get('cover.formatId').value, materialId: this.orderForm.get('cover.materialId').value})
  //       : of([])
  //     ),
  //     tap(data => {
  //       if (!data.some(v => v.id === this.orderForm.get('cover.paperId').value)) { this.orderForm.get('cover.paperId').reset(); }
  //     }),
  //   );
  //   this.paper2$ = this.orderForm.get('block.materialId').valueChanges.pipe(
  //     //tap(() => this.orderForm.get('block.paperId').reset()),
  //     switchMap(() => this.orderForm.get('block.materialId').value
  //       ? this.paperService.getList({formatId: this.orderForm.get('block.formatId').value, materialId: this.orderForm.get('block.materialId').value})
  //       : of([])
  //     ),
  //     tap(data => {
  //       if (!data.some(v => v.id === this.orderForm.get('block.paperId').value)) { this.orderForm.get('block.paperId').reset(); }
  //     }),
  //   );

  //   this.color$ = this.orderForm.get('cover.formatId').valueChanges.pipe(
  //     //tap(() => this.orderForm.get('cover.color').reset()),
  //     switchMap(() => this.orderForm.get('cover.formatId').value
  //       ? this.handbookSrv.getColorList(this.orderForm.get('cover.equipmentId').value, this.orderForm.get('cover.formatId').value)
  //       : of([])
  //     ),
  //     tap(data => {
  //       if (!data.some(v => v.name === this.orderForm.get('cover.color').value)) { this.orderForm.get('cover.color').reset(); }
  //     }),
  //   );
  //   this.color2$ = this.orderForm.get('block.formatId').valueChanges.pipe(
  //     //tap(() => this.orderForm.get('block.color').reset()),
  //     switchMap(() => this.orderForm.get('block.formatId').value
  //       ? this.handbookSrv.getColorList(this.orderForm.get('block.equipmentId').value, this.orderForm.get('block.formatId').value)
  //       : of([])
  //     ),
  //     tap(data => {
  //       if (!data.some(v => v.name === this.orderForm.get('block.color').value)) { this.orderForm.get('block.color').reset(); }
  //     }),
  //   );

  //   this.performer$ = this.orderForm.get('cover.contact').valueChanges.pipe(
  //     startWith(''),
  //     // debounceTime(environment.debounceTime),
  //     // distinctUntilChanged(),
  //     switchMap((val) => {
  //       val = (val && val.name) || val;
  //       return this.contactSrv.getList(val, null).pipe(
  //         tap(response => {
  //           const d = response.find(r => r.name === val);
  //           if (d && this.orderForm.get('cover.contact').value.id !== d.id) {
  //             this.orderForm.get('cover.contact').setValue(d, {emitEvent: false});
  //           }
  //         })
  //       );
  //     })
  //   );
  //   this.performer2$ = this.orderForm.get('block.contact').valueChanges.pipe(
  //     startWith(''),
  //     // debounceTime(environment.debounceTime),
  //     // distinctUntilChanged(),
  //     switchMap((val) => {
  //       val = (val && val.name) || val;
  //       return this.contactSrv.getList(val, null).pipe(
  //         tap(response => {
  //           const d = response.find(r => r.name === val);
  //           if (d && this.orderForm.get('block.contact').value.id !== d.id) {
  //             this.orderForm.get('block.contact').setValue(d, {emitEvent: false});
  //           }
  //         })
  //       );
  //     })
  //   );
  }

  fillFields(data: Order) {
    //this.orderForm.setValue(data);
    data = data || {} as Order;

    // data.cover.postPress = data.postPress.filter((v) => v.workType === WorkType.cover);
    // data.block.postPress = data.postPress.filter((v) => v.workType === WorkType.block);
    data.contactTel = data.contact && data.contact.tel;

    this.order = data;

    // if (data.cover) {
    //   //data.cover.color = {name: data.cover.color1 + '+' + data.cover.color2, color1: data.cover.color1, color2: data.cover.color2}
    //   data.cover.color = data.cover.color1 + '+' + data.cover.color2;
    // }
    // if (data.block) {
    //   data.block.color = data.block.color1 + '+' + data.block.color2;
    // }
    // this.orderForm.patchValue({
    //   ...data,
    //   //contact: data.contact || {},
    //   // cover: data.cover || {},
    //   // block: data.block || {}
    // });
    this.orderForm.patchValue(data, {emitEvent: false});
    // this.orderForm.get('name').setValue(data.name);
    // this.orderForm.get('number').setValue(data.number);
    // this.orderForm.get('regDate').setValue(data.regDate || new Date());
    // this.orderForm.get('division').setValue(data.division);
    // this.orderForm.get('subdivision').setValue(data.subdivision);
    // this.orderForm.get('contact').setValue(data.contact);
    // this.orderForm.get('contactTel').setValue(data.contact && data.contact.tel);
  }

//   ngAfterViewInit() {
//     this.formatCov.stateChanges.subscribe(res => {
//       console.log(res);
//     });
//   }

//   changeValue($event: EventEmitter<MatSelectChange>) {
//     //this.__myService.myValue.next($event.value);
//     //console.log($event);
// }

  back() {
    this.location.back();
  }

  save() {
    //if (!this.formatCov.toggle().au.autofilled) { return; }
    //this.formatCov.toggle();
    const cover = this.coverComp.fg.value;
    const block = this.blockComp.fg.value;
    const order1 = this.orderForm.value;
    const order2: Order = {
      ...order1,
      ...{
        id: order1.id || undefined,
        divisionId: order1.division.id,
        subdivisionId: order1.subdivision && order1.subdivision.id,
        contactId: order1.contact && order1.contact.id,
        //cover: {...order1.cover, ...{id: order1.cover.id || undefined, contactId: order1.cover.contact && order1.cover.contact.id}},
        cover: {...cover, ...{id: cover.id || undefined, contactId: cover.contact && cover.contact.id}},
        block: {...block, ...{id: block.id || undefined, contactId: block.contact && block.contact.id}}
      }
    };
    if (order2.cover.color) {
      const colors = order2.cover.color.split('+');
      order2.cover.color1 = +colors[0];
      order2.cover.color2 = +colors[1];
    } else {
      order2.cover.color1 = null;
      order2.cover.color2 = null;
    }
    if (order2.block.color) {
      const colors = order2.block.color.split('+');
      order2.block.color1 = +colors[0];
      order2.block.color2 = +colors[1];
    } else {
      order2.block.color1 = null;
      order2.block.color2 = null;
    }

    if (order2.id) {
      this.orderService.update(order2).subscribe((resp) => {
        // console.log(resp);
        //this.order = resp;
        // this.order = {...this.order, ...resp};
        this.fillFields(resp);
      });
    } else {
      this.orderService.create(order2).subscribe((resp) => {
        // console.log(resp);
        //this.order = resp;
        // this.order = {...this.order, ...resp};
        this.fillFields(resp);
      });
    }

    // const division = this.orderForm.get('division').value;
    // const subdivision = this.orderForm.get('subdivision').value;
    // const contact = this.orderForm.get('contact').value;
    // const order: Order = {
    //   ...this.order,
    //   ...{
    //     regDate: this.orderForm.get('regDate').value,
    //     name: this.orderForm.get('name').value,
    //     number: this.orderForm.get('number').value,
    //     division: {
    //       id: division.id,
    //       name: division.name || division},
    //     divisionId: division.id,
    //     subdivision: {
    //       id: subdivision && subdivision.id,
    //       name: subdivision && (subdivision.name || subdivision)},
    //     subdivisionId: subdivision && subdivision.id,
    //     contact: {
    //       id: contact.id,
    //       name: contact.name || contact,
    //       tel: this.orderForm.get('contactTel').value},
    //     contactId: contact.id,
    //     //cover:
    //   }
    // };
    // if (this.order.id) {
    //   this.orderService.update(order).subscribe((resp) => {
    //     // console.log(resp);
    //     this.order = resp;
    //     // this.order = {...this.order, ...resp};
    //     this.fillFields(this.order);
    //   });
    // } else {
    //   this.orderService.create(order).subscribe((resp) => {
    //     // console.log(resp);
    //     this.order = resp;
    //     // this.order = {...this.order, ...resp};
    //     this.fillFields(this.order);
    //   });
    // }
  }

  displayFn(contact?: Contact): string | undefined {
    return contact ? contact.name : undefined;
  }

  compareFn(option, value): boolean {
    return option && value ? option.id === value.id : option === value;
  }
  // editPostPress(price = null, index = null) {
  //   const dialogRef = this.dialog.open(PaperPriceEditComponent, {
  //     disableClose: true,
  //     //width: '250px',
  //     //data: {name: this.name, animal: this.animal}
  //     data: price || {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       if (price) {
  //         this.paper.paperPrices[index] = result;
  //       } else {
  //         this.paper.paperPrices.push(result);
  //       }
  //       this.paper.paperPrices.sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
  //       this.table.renderRows();
  //     }
  //   });
  // }

  // deletePostPress(index) {
  //   const confDialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     data: {title: 'Внимание', message: 'Вы дейсвительно хотите удалить цену?'} as ConfirmDialogData
  //   });

  //   confDialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.paper.paperPrices.splice(index, 1);
  //       this.table.renderRows();
  //     }
  //   });
  // }

}
