import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  getList(mask: string, divisionId: string): Observable<Contact[]> {
    const url = `${environment.apiUrl}api/contact`;
    const params: any = {};
    if (mask) { params.mask = mask; }
    if (divisionId) { params.divisionId = divisionId; }
    return this.http.get<Contact[]>(`${environment.apiUrl}api/contact`, {params});
  }
}
