import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private orderService: OrderService,
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
  }

  fillFields(data: Order) {
    this.orderForm.get('name').setValue(data.name);
    this.orderForm.get('number').setValue(data.number);
    this.orderForm.get('regDate').setValue(data.regDate || new Date());
    this.orderForm.get('division').setValue(data.division);
  }

  back() {
    this.location.back();
  }

  save() {
    const order: Order = {
      ...this.order,
      ...{
        regDate: this.orderForm.get('regDate').value,
        name: this.orderForm.get('name').value,
        number: this.orderForm.get('number').value,
        division: {
          id: this.orderForm.get('division').value.id,
          name: this.orderForm.get('division').value.name || this.orderForm.get('division').value,
          divisionId: null},
        divisionId: this.orderForm.get('division').value.id,
        subdivisionId: null,
        contactId: null,
      }
    };
    if (this.order.id) {
      this.orderService.update(order).subscribe((resp) => {
        console.log(resp);
        this.order = resp;
        // this.order = {...this.order, ...resp};
        this.fillFields(this.order);
      });
    } else {
      this.orderService.create(order).subscribe((resp) => {
        console.log(resp);
        this.order = resp;
        // this.order = {...this.order, ...resp};
        this.fillFields(this.order);
      });
    }
  }
}
