import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { ILeads } from '../types/leads';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  constructor(private http: HttpClient) {}

  getLeads(): Promise<ILeads[]> {
    return firstValueFrom(this.http.get<ILeads[]>(`${environment.apiUrl}/leads`));
  }
}
