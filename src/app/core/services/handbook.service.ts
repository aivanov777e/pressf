import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { Printer } from 'src/app/models/printer';

@Injectable({
  providedIn: 'root'
})
export class HandBookService {

  constructor(
    private http: HttpClient
  ) { }

  getPrinterList(mask: string): Observable<Printer[]> {
    const url = `${environment.apiUrl}api/contact`;
    const params: any = {};
    if (mask) { params.mask = mask; }
    return this.http.get<Printer[]>(`${environment.apiUrl}api/handbook/printer`, {params});
  }
}
