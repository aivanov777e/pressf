import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(message: string, className: string = 'green-snackbar') {
    this.snackBar.open(message, 'Закрыть', {
      duration: 10000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [className],
    });
  }
}
