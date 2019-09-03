import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  getList(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}api/order`);
    // return of([]);
  }

  get(id: string): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}api/order`, {params: {id}}); // /${id}
  }

  create(order: Order): Observable<Order> {
    return this.http.post<any>(`${environment.apiUrl}api/order`, order); // , { observe: 'response' }
  }

  update(order: Order): Observable<Order> {
    return this.http.put<any>(`${environment.apiUrl}api/order`, order); // , { observe: 'response' }
  }
}
