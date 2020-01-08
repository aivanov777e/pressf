import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';
import { Paper } from 'src/app/models/paper';
import * as moment from 'moment';
//const moment = moment.Moment;

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  constructor(
    private http: HttpClient
  ) { }

  getList(at: moment.Moment): Observable<Paper[]> {    
    return this.http.get<Paper[]>(`${environment.apiUrl}api/paper`, {params: {at: at.toISOString()}});
    // return of([]);
  }

  get(id: string): Observable<Paper> {
    return this.http.get<Paper>(`${environment.apiUrl}api/paper`, {params: {id}}); // /${id}
  }

  create(paper: Paper): Observable<Paper> {
    return this.http.post<any>(`${environment.apiUrl}api/paper`, paper); // , { observe: 'response' }
  }

  update(paper: Paper): Observable<Paper> {
    return this.http.put<any>(`${environment.apiUrl}api/paper`, paper); // , { observe: 'response' }
  }
}
