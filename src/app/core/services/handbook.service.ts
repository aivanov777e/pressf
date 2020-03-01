import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { Equipment } from 'src/app/models/equipment';
import { Format } from 'src/app/models/format';
import { Color } from 'src/app/models/color';
import { Material } from 'src/app/models/material';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HandBookService {

  constructor(
    private http: HttpClient
  ) { }

  getFormatList(equipmentId: string = null): Observable<Format[]> {
    const params: any = {};
    if (equipmentId) { params.equipmentId = equipmentId; }
    return this.http.get<Format[]>(`${environment.apiUrl}api/handbook/format`, {params});
  }

  getColorList(options: {equipmentId?: string, formatId?: string, workId?: string}): Observable<any[]> {
    const params = options;
    //const params: any = {};
    // if (printerId) { params.printerId = printerId; }
    return this.http.get<any[]>(`${environment.apiUrl}api/handbook/color`, {params});
  }

  getMaterialList(formatId: string): Observable<Material[]> {
    const params: any = {};
    params.at = (params.at || moment()).toISOString();
    if (formatId) { params.formatId = formatId; }
    return this.http.get<Material[]>(`${environment.apiUrl}api/handbook/material`, {params});
  }

  getPostPressTypeList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}api/handbook/postPressType`);
  }
}
