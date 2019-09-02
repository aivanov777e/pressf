import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get(`${environment.apiUrl}api/order`);
    // return of([]);
  }

  create(order: Order) {
    return this.http.post<any>(`${environment.apiUrl}api/order`, order, { observe: 'response' });
  }
}
