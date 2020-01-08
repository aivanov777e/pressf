import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Format } from 'src/app/models/format';
import { Material } from 'src/app/models/material';
import {Location} from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { HandBookService } from 'src/app/core/services/handbook.service';
import { ActivatedRoute } from '@angular/router';
import { PaperService } from 'src/app/core/services/paper.service';
import { switchMap, tap } from 'rxjs/operators';
import { Paper } from 'src/app/models/paper';
import * as moment from 'moment';
import { MatDialog, MatTable } from '@angular/material';
import { PaperPriceEditComponent } from '../paper-price-edit/paper-price-edit.component';

@Component({
  selector: 'app-paper-edit',
  templateUrl: './paper-edit.component.html',
  styleUrls: ['./paper-edit.component.less']
})
export class PaperEditComponent implements OnInit {
  format$: Observable<Format[]> = this.handbookSrv.getFormatList();
  material$: Observable<Material[]> = this.handbookSrv.getMaterialList(null);

  paper: Paper;

  fg = this.fb.group({
    formatId: [null, Validators.required],
    materialId: [null, Validators.required],
    density: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  displayedColumns: string[] = ['startDate', 'price', 'options'];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private handbookSrv: HandBookService,
    private route: ActivatedRoute,
    private paperService: PaperService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
//      const id = params.get('id');
//      tap(p => this.fG. = ()),
      switchMap(params => this.paperService.get(params.get('id')))
    )
    .subscribe(data => {
      //data.paperPrices = data.paperPrices
      //.map(v => {return {startDate: moment(v.startDate), endDate: v.endDate, price: v.price}})
      //.sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());
      if (data && data.paperPrices) {
        data.paperPrices.sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
      }
      this.paper = data;
      this.fillFields(data);
    });
  }

  fillFields(data: Paper) {
    this.fg.get('formatId').setValue(data.formatId);
    this.fg.get('materialId').setValue(data.materialId);
    this.fg.get('density').setValue(data.density);
    //if (data.id && data.id !== '-1') {this.fG.disable()} else {this.fG.enable()}
    if (data.id && data.id !== '-1') {
      this.fg.get('formatId').disable();
      this.fg.get('materialId').disable();
      this.fg.get('density').disable();
      } else {this.fg.enable()}
    //this.fG.updateValueAndValidity();
  }

  save() {
    this.paper.paperPrices.forEach((v, i, a) => {
      v.endDate = a[i+1] && a[i+1].startDate;
      v.paperId = this.paper.id;
    });
    const paper: Paper = {
      id: this.paper.id,
      formatId: this.fg.get('formatId').value,
      materialId: this.fg.get('materialId').value,
      density: this.fg.get('density').value,
      paperPrices: this.paper.paperPrices
    };
    if (this.paper.id) {
      this.paperService.update(paper).subscribe((resp) => {
        this.paper = resp;
        this.fillFields(this.paper);
      });
    } else {
      this.paperService.create(paper).subscribe((resp) => {
        this.paper = resp;
        this.fillFields(this.paper);
      });
    }
  }

  editPrice(price = null, index = null) {
    const dialogRef = this.dialog.open(PaperPriceEditComponent, {
      disableClose: true,
      //width: '250px',
      //data: {name: this.name, animal: this.animal}
      data: price || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (price) {
          this.paper.paperPrices[index] = result;
        } else {
          this.paper.paperPrices.push(result);
        }
        this.paper.paperPrices.sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
        this.table.renderRows();
      }
    });
  }

  deletePrice(index) {
    this.paper.paperPrices.splice(index, 1)
    this.table.renderRows();
  }

  back() {
    this.location.back();
  }
}
