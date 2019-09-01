import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['customer', 'division', 'contact', 'regDate', 'number'];
  dataSource$;
  // dataSource = [
  //   {customer: 'ДИ', division: 'ПЧ-2', contact: 'Васечкин А.Б. 4-56-38', date: new Date('2016.01.24 18:34'), name: 'Hydrogen', id: 1},
  //   {customer: 'ДИ', division: null, contact: 'Васечкин А.Б. 4-56-38', date:  new Date('2018.01.24 18:34'), name: 'Helium', id:  2},
  // ];

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.dataSource$ = this.orderService.getList();
  }

}
