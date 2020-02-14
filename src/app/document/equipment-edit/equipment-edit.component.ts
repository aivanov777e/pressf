import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipment } from 'src/app/models/equipment';
import { Validators, FormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import {Location} from '@angular/common';
import * as moment from 'moment';
import { WorkService } from 'src/app/core/services/work.service';
import { Observable, Subject } from 'rxjs';
import { Work } from 'src/app/models/work';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Format } from 'src/app/models/format';
import { HandBookService } from 'src/app/core/services/handbook.service';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.less']
})
export class EquipmentEditComponent implements OnInit {
  equipment: Equipment = {} as Equipment;
  work$: Observable<Work[]> = this.workSrv.getList();
  format$: Observable<Format[]> = this.handbookSrv.getFormatList();

  fg = this.fb.group({
    name: [null, Validators.required],
    workId: [null, Validators.required],
  });

  private unsubscribe: Subject<void> = new Subject();

  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = ['select', 'name'];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private workSrv: WorkService,
    private route: ActivatedRoute,
    private router: Router,
    private equipmentService: EquipmentService,
    private handbookSrv: HandBookService,
    //public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntil(this.unsubscribe),
      switchMap(params => this.equipmentService.get(params.get('id')))
    )
    .subscribe(data => {
      // if (data && data.workPrices) {
      //   this.sort(data.workPrices);
      // }
      this.equipment = data || {} as Equipment;
      this.fillFields(this.equipment);
    });
  }

  fillFields(data: Equipment) {
    this.fg.get('name').setValue(data.name);
    this.fg.get('workId').setValue(data.workId);
  }

  save() {
    const equipment: Equipment = {
      id: this.equipment.id,
      name: this.fg.get('name').value,
      workId: this.fg.get('workId').value,
      equipmentFormats: this.equipment.equipmentFormats,
      //equipmentPrices: this.equipment.equipmentPrices
    };
    if (this.equipment.id) {
      this.equipmentService.update(equipment).subscribe((resp) => {
        //this.sort(resp.equipmentPrices);
        //resp.equipmentPrices = this.equipment.equipmentPrices;
        this.equipment = resp;
        this.fillFields(this.equipment);
      });
    } else {
      this.equipmentService.create(equipment).subscribe((resp) => {
        // this.equipment = resp;
        // this.fillFields(this.equipment);
        this.router.navigate([resp.id], {relativeTo: this.route.parent, replaceUrl: true}); // , queryParamsHandling: 'merge'
      });
    }
  }

  isSelected(f) {
    return this.equipment.equipmentFormats && this.equipment.equipmentFormats.some(v => v.formatId === f.id)
  }

  toggle(f) {
    const ef = this.equipment.equipmentFormats || [];
    const index = ef.findIndex(v => v.formatId === f.id);
    if (index >= 0) { ef.splice(index, 1); } else { ef.push({formatId: f.id, equipmentId: this.equipment.id}); } 
    this.equipment.equipmentFormats = ef;
    this.table.renderRows();
  }


  back() {
    this.location.back();
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
