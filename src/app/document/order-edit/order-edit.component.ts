import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/models/order';

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
    // address: [null, Validators.required],
    // address2: null,
    // city: [null, Validators.required],
    // state: [null, Validators.required],
    // postalCode: [null, Validators.compose([
    //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ],
    // shipping: ['free', Validators.required]
  });
  // divisionFC = new FormControl('');

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  save() {
    const order: Order = {
      regDate: null,
      name: this.orderForm.get('name').value,
      number: this.orderForm.get('number').value,
      divisionId: this.orderForm.get('division').value.id,
      subdivisionId: null,
      contactId: null,
    };
    this.orderService.create(order).subscribe((resp) => {
      console.log(resp);
    });
  }
}
