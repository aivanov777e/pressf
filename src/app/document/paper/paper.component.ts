import { Component, OnInit } from '@angular/core';
import { PaperService } from 'src/app/core/services/paper.service';
import * as moment from 'moment';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.less']
})
export class PaperComponent implements OnInit {
  displayedColumns: string[] = ['material', 'format', 'density', 'price'];
  dataSource$;

  constructor(
    private paperService: PaperService,
  ) { }

  ngOnInit() {
    this.dataSource$ = this.paperService.getList(moment());
  }

}
