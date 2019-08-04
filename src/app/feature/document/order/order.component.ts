import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['date', 'name'];
  dataSource = [
    {date: new Date('2016.01.24 18:34'), name: 'Hydrogen', id: 1},
    {date:  new Date('2018.01.24 18:34'), name: 'Helium', id:  2},
  ];

  constructor() { }

  ngOnInit() {
  }

}
