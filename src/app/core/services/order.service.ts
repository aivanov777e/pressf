import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    const url = `${environment.apiUrl}api/order`;
    return this.http.get(`${environment.apiUrl}api/order`);
    // return of([]);
  }
}
