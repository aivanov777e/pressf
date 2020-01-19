import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { Format } from 'src/app/models/format';
import { Work } from 'src/app/models/work';
import { Validators, FormBuilder } from '@angular/forms';
import { MatTable, MatDialog } from '@angular/material';
import { HandBookService } from 'src/app/core/services/handbook.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkService } from 'src/app/core/services/work.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import {Location} from '@angular/common';
import { WorkPriceEditComponent } from '../work-price-edit/work-price-edit.component';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { WorkPrice } from 'src/app/models/work-price';

@Component({
  selector: 'app-work-edit',
  templateUrl: './work-edit.component.html',
  styleUrls: ['./work-edit.component.less']
})
export class WorkEditComponent implements OnInit, OnDestroy {
  //format$: Observable<Format[]> = this.handbookSrv.getFormatList();

  work: Work;

  fg = this.fb.group({
    name: [null, Validators.required],
    postPressCover: [null],
    postPressBlock: [null],
  });

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  displayedColumns: string[] = ['format', 'color', 'countFrom', 'price', 'options'];

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private location: Location,
    private fb: FormBuilder,
    //private handbookSrv: HandBookService,
    private route: ActivatedRoute,
    private router: Router,
    private workService: WorkService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntil(this.unsubscribe),
      switchMap(params => this.workService.get(params.get('id')))
    )
    .subscribe(data => {
      if (data && data.workPrices) {
        this.sort(data.workPrices);
      }
      this.work = data;
      this.fillFields(data);
    });
  }

  fillFields(data: Work) {
    this.fg.get('name').setValue(data.name);
    this.fg.get('postPressCover').setValue(data.postPressCover);
    this.fg.get('postPressBlock').setValue(data.postPressBlock);
  }

  save() {
    const work: Work = {
      id: this.work.id,
      name: this.fg.get('name').value,
      postPressCover: this.fg.get('postPressCover').value,
      postPressBlock: this.fg.get('postPressBlock').value,
      workPrices: this.work.workPrices
    };
    if (this.work.id) {
      this.workService.update(work).subscribe((resp) => {
        //this.sort(resp.workPrices);
        resp.workPrices = this.work.workPrices;
        this.work = resp;
        this.fillFields(this.work);
      });
    } else {
      this.workService.create(work).subscribe((resp) => {
        // this.work = resp;
        // this.fillFields(this.work);
        this.router.navigate([resp.id], {relativeTo: this.route.parent, replaceUrl: true}); // , queryParamsHandling: 'merge'
      });
    }
  }

  editPrice(price = null, index = null) {
    const dialogRef = this.dialog.open(WorkPriceEditComponent, {
      disableClose: true,
      width: '400px',
      // data: {name: this.name, animal: this.animal}
      data: price || {workId: this.work.id}
    });

    dialogRef.afterClosed().subscribe((result: WorkPrice) => {
      if (result) {
        if (price) {
          this.workService.updatePrice(result).subscribe((resp) => {
            this.work.workPrices[index] = resp;
            this.sort(this.work.workPrices);
            this.table.renderRows();
              });
        } else {
          this.workService.createPrice(result).subscribe((resp) => {
            this.work.workPrices.push(resp);
            this.sort(this.work.workPrices);
            this.table.renderRows();
          });
        }
      }
    });
  }

  sort(t) {
    t.sort((a, b) => {
      let s = (a.format && a.format.name || '').localeCompare(b.format && b.format.name || '');
      if (s === 0) { s = a.color1 - b.color1; }
      if (s === 0) { s = a.color2 - b.color2; }
      if (s === 0) { s = a.countFrom - b.countFrom; }
      return s;
    });
  }

  deletePrice(index) {
    const confDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Внимание', message: 'Вы дейсвительно хотите удалить цену?'} as ConfirmDialogData
    });

    confDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workService.deletePrice(result).subscribe((resp) => {
          this.work.workPrices.splice(index, 1);
          this.table.renderRows();
        });
      }
    });
  }

  back() {
    this.location.back();
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
