import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;
  public data;

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  printDocument(documentName: string, id: string, data = null) {
    this.isPrinting = true;
    this.data = data;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, id]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      //this.router.navigate([{ outlets: { print: null }}]);
      this.location.back();
    });
  }
}
