import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.less']
})
export class OrderEditComponent implements OnInit {
  orderForm = this.fb.group({
    division: null,
    // firstName: [null, Validators.required],
    // lastName: [null, Validators.required],
    // address: [null, Validators.required],
    // address2: null,
    // city: [null, Validators.required],
    // state: [null, Validators.required],
    // postalCode: [null, Validators.compose([
    //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ],
    // shipping: ['free', Validators.required]
  });

  constructor(private location: Location, private fb: FormBuilder) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
