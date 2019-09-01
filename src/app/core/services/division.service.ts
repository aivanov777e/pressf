import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { Division } from 'src/app/models/division';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private http: HttpClient
  ) { }

  getList(mask: string, divisionId: string): Observable<Division[]> {
    const url = `${environment.apiUrl}api/division`;
    return this.http.get<Division[]>(`${environment.apiUrl}api/division`, {params: {mask, divisionId}});
    // return of([]);
  }
}
