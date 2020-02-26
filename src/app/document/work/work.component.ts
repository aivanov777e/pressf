import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/core/services/work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {
  displayedColumns: string[] = ['name', 'postPressType'];
  dataSource$;

  constructor(
    private workService: WorkService,
  ) { }

  ngOnInit() {
    this.dataSource$ = this.workService.getList();
  }

}
