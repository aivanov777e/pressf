import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  message: string;
  title: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.less']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    data.confirmBtnText = data.confirmBtnText || 'Да'; // 'Подтвердить';
    data.cancelBtnText = data.cancelBtnText || 'Нет'; // 'Отменить';
  }

  ngOnInit() {
  }
}
