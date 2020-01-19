import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/core/services/contact.service';
import { Equipment } from 'src/app/models/equipment';
import { HandBookService } from 'src/app/core/services/handbook.service';
import { Format } from 'src/app/models/format';
import { Color } from 'src/app/models/color';
import { Material } from 'src/app/models/material';
import { EquipmentService } from 'src/app/core/services/equipment.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.less']
})
export class OrderEditComponent implements OnInit {
  orderForm = this.fb.group({
    division: [null, Validators.required],
    subdivision: [null],
    name: [null, Validators.required],
    number: [null, Validators.required],
    regDate: [null, Validators.required],
    contact: [null, Validators.required],
    contactTel: [null, Validators.required],
    coverPrinterId: [],
    coverFormatId: [],
    coverMaterialId: [],
    coverColor1Id: [],
    coverColor2Id: [],
    coverCount: [],
    coverCountAdj: [],
    coverPerformerId: []
    // address2: null,
    // city: [null, Validators.required],
    // state: [null, Validators.required],
    // postalCode: [null, Validators.compose([
    //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ],
    // shipping: ['free', Validators.required]
  });
  // divisionFC = new FormControl('');
  order: Order;
  // divisionId: string;
  // divisionId$ = new Subject<string>();
  contact$: Observable<Contact[]>;
  printer$: Observable<Equipment[]>;
  format$: Observable<Format[]>;
  color$: Observable<Color[]>;
  material$: Observable<Material[]>;
  performer$: Observable<Contact[]>;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private orderService: OrderService,
    private contactSrv: ContactService,
    private handbookSrv: HandBookService,
    private equipmentSrv: EquipmentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.orderService.get(params.get('id')))
    )
    .subscribe(data => {
      this.order = data;
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

    this.contact$ = this.orderForm.get('contact').valueChanges
      .pipe(
        // startWith(''),
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
          return this.contactSrv.getList(val, divisionId)
            .pipe(
              tap(response => {
                const d = response.find(r => r.name === val);
                if (d && this.orderForm.get('contact').value.id !== d.id) {
                  this.orderForm.get('contact').setValue(d, {emitEvent: false});
                  this.orderForm.get('contactTel').setValue(d.tel, {emitEvent: false});
                }
            }));
        })
      );

    this.printer$ = this.equipmentSrv.getList(null);
    this.format$ = this.orderForm.get('coverPrinterId').valueChanges.pipe(
      switchMap(() => this.handbookSrv.getFormatList(this.orderForm.get('coverPrinterId').value))
    );
    this.color$ = this.handbookSrv.getColorList(null);
    this.material$ = this.handbookSrv.getMaterialList(null);

  }

  fillFields(data: Order) {
    this.orderForm.get('name').setValue(data.name);
    this.orderForm.get('number').setValue(data.number);
    this.orderForm.get('regDate').setValue(data.regDate || new Date());
    this.orderForm.get('division').setValue(data.division);
    this.orderForm.get('subdivision').setValue(data.subdivision);
    this.orderForm.get('contact').setValue(data.contact);
    this.orderForm.get('contactTel').setValue(data.contact && data.contact.tel);
  }

  back() {
    this.location.back();
  }

  save() {
    const division = this.orderForm.get('division').value;
    const subdivision = this.orderForm.get('subdivision').value;
    const contact = this.orderForm.get('contact').value;
    const order: Order = {
      ...this.order,
      ...{
        regDate: this.orderForm.get('regDate').value,
        name: this.orderForm.get('name').value,
        number: this.orderForm.get('number').value,
        division: {
          id: division.id,
          name: division.name || division},
        divisionId: division.id,
        subdivision: {
          id: subdivision && subdivision.id,
          name: subdivision && (subdivision.name || subdivision)},
        subdivisionId: subdivision && subdivision.id,
        contact: {
          id: contact.id,
          name: contact.name || contact,
          tel: this.orderForm.get('contactTel').value},
        contactId: contact.id,
      }
    };
    if (this.order.id) {
      this.orderService.update(order).subscribe((resp) => {
        // console.log(resp);
        this.order = resp;
        // this.order = {...this.order, ...resp};
        this.fillFields(this.order);
      });
    } else {
      this.orderService.create(order).subscribe((resp) => {
        // console.log(resp);
        this.order = resp;
        // this.order = {...this.order, ...resp};
        this.fillFields(this.order);
      });
    }
  }

  displayFn(contact?: Contact): string | undefined {
    return contact ? contact.name : undefined;
  }
}
