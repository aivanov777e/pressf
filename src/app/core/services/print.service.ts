import { Injectable, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class PrintService {// implements OnInit
  isPrinting = false;
  public data;
  //mediaQueryList;

  constructor(
    private router: Router,
    private location: Location,
    public breakpointObserver: BreakpointObserver
  ) {
    // if (window.matchMedia) {
    //   var mediaQueryList = window.matchMedia('print');
    //   mediaQueryList.addListener(function(mql) {
    //       if (mql.matches) {
    //           beforePrint();
    //       } else {
    //           afterPrint();
    //       }
    //   });
    // }

    // window.onbeforeprint = beforePrint;
    // window.onafterprint = afterPrint;

    this.breakpointObserver
    .observe(['print'])
    .subscribe((state: BreakpointState) => {
      if (!state.matches) {
        //console.log('Viewport is not print!');
        if (this.isPrinting){
          this.isPrinting = false;
          //this.router.navigate([{ outlets: { print: null }}]);
          this.location.back();
        }
      }
    });
  }
  // ngOnInit(): void {
  // }

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
    });
  }

  // beforePrint(){}

  // afterPrint() {
  //   this.isPrinting = false;
  //   //this.router.navigate([{ outlets: { print: null }}]);
  //   this.location.back();
  // }
}
