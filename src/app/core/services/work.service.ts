import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';
import { Work } from 'src/app/models/work';
import { WorkPrice } from 'src/app/models/work-price';
import * as moment from 'moment';
//const moment = moment.Moment;

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(
    private http: HttpClient
  ) { }

  getList(): Observable<Work[]> {
    return this.http.get<Work[]>(`${environment.apiUrl}api/work`);
    // return of([]);
  }

  get(id: string): Observable<Work> {
    return this.http.get<Work>(`${environment.apiUrl}api/work`, {params: {id}}); // /${id}
  }

  create(work: Work): Observable<Work> {
    return this.http.post<any>(`${environment.apiUrl}api/work`, work); // , { observe: 'response' }
  }

  update(work: Work): Observable<Work> {
    return this.http.put<any>(`${environment.apiUrl}api/work`, work); // , { observe: 'response' }
  }

  createPrice(workPrice: WorkPrice): Observable<WorkPrice> {
    return this.http.post<any>(`${environment.apiUrl}api/work/price`, workPrice); // , { observe: 'response' }
  }

  updatePrice(workPrice: WorkPrice): Observable<WorkPrice> {
    return this.http.put<any>(`${environment.apiUrl}api/work/price`, workPrice); // , { observe: 'response' }
  }

  deletePrice(workPrice: WorkPrice): Observable<WorkPrice> {
    return this.http.put<any>(`${environment.apiUrl}api/work/price/delete`, workPrice); // , { observe: 'response' }
  }
}
