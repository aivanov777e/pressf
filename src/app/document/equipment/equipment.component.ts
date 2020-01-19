import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/core/services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.less']
})
export class EquipmentComponent implements OnInit {
  displayedColumns: string[] = ['name', 'workId'];
  dataSource$;

  constructor(
    private equipmentService: EquipmentService,
  ) { }

  ngOnInit() {
    this.dataSource$ = this.equipmentService.getList('');
  }
}
