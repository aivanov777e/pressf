import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from 'src/app/core/services/print.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-print-passport',
  templateUrl: './print-passport.component.html',
  styleUrls: ['./print-passport.component.scss']
})
export class PrintPassportComponent implements OnInit {
  public order: Order;

  constructor(
    private route: ActivatedRoute,
    private printService: PrintService
  ) { }

  ngOnInit(): void {
    //this.route.data
    this.order = this.printService.data;
    this.printService.onDataReady();
  }

}
