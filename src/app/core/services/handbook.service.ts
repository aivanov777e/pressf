import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { Printer } from 'src/app/models/printer';
import { Format } from 'src/app/models/format';
import { Color } from 'src/app/models/color';
import { Material } from 'src/app/models/material';

@Injectable({
  providedIn: 'root'
})
export class HandBookService {

  constructor(
    private http: HttpClient
  ) { }

  getPrinterList(mask: string): Observable<Printer[]> {
    const params: any = {};
    if (mask) { params.mask = mask; }
    return this.http.get<Printer[]>(`${environment.apiUrl}api/handbook/printer`, {params});
  }

  getFormatList(printerId: string = null): Observable<Format[]> {
    const params: any = {};
    if (printerId) { params.printerId = printerId; }
    return this.http.get<Format[]>(`${environment.apiUrl}api/handbook/format`, {params});
  }

  getColorList(printerId: string): Observable<Color[]> {
    const params: any = {};
    // if (printerId) { params.printerId = printerId; }
    return this.http.get<Color[]>(`${environment.apiUrl}api/handbook/color`, {params});
  }

  getMaterialList(printerId: string): Observable<Material[]> {
    const params: any = {};
    // if (printerId) { params.printerId = printerId; }
    return this.http.get<Material[]>(`${environment.apiUrl}api/handbook/material`, {params});
  }
}
