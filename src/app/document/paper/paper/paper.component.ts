import { Component, OnInit, ViewChild } from '@angular/core';
import { PaperService } from 'src/app/core/services/paper.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { PaperEditDialogComponent } from '../paper-edit-dialog/paper-edit-dialog.component';
import { Paper } from 'src/app/models/paper';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.less']
})
export class PaperComponent implements OnInit {
  displayedColumns: string[] = ['material', 'format', 'density', 'price'];
  dataSource$;
  @ViewChild(MatTable) private table: MatTable<any>;

  constructor(
    private paperService: PaperService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dataSource$ = this.paperService.getList();
  }

  editPaper(item = null, index = null) {
    const data = item || {};
    //data.postPressTypeId = this.postPressType;
    const dialogRef = this.dialog.open(PaperEditDialogComponent, {
      disableClose: true,
      //width: '250px',
      //data: {name: this.name, animal: this.animal}
      data
    });

    dialogRef.afterClosed().subscribe((result: Paper) => {
      if (result) {
        result.id = result.id || undefined;
        //result.orderPressId = this.press.id || undefined;
        if (item && index) {
          this.table.dataSource[index] = result;
        } else {
          (this.table.dataSource as Array<any>).push(result);
        }
        //this.press.postPress.sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
        this.table.renderRows();
        //this.fg.get('postPress').updateValueAndValidity();
      }
    });
  }
}
