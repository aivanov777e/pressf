import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { Equipment } from 'src/app/models/equipment';
import { Format } from 'src/app/models/format';
import { Color } from 'src/app/models/color';
import { Material } from 'src/app/models/material';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(
    private http: HttpClient
  ) { }

  getList(mask: string): Observable<Equipment[]> {
    const params: any = {};
    if (mask) { params.mask = mask; }
    return this.http.get<Equipment[]>(`${environment.apiUrl}api/equipment`, {params});
  }

  get(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${environment.apiUrl}api/equipment`, {params: {id}}); // /${id}
  }

  create(equipment: Equipment): Observable<Equipment> {
    return this.http.post<any>(`${environment.apiUrl}api/equipment`, equipment); // , { observe: 'response' }
  }

  update(equipment: Equipment): Observable<Equipment> {
    return this.http.put<any>(`${environment.apiUrl}api/equipment`, equipment); // , { observe: 'response' }
  }
}