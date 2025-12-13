import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { ILeadCreate, ILeads } from '../types/leads';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  constructor(private http: HttpClient) {}

  getLeads(): Promise<ILeads[]> {
    return firstValueFrom(this.http.get<ILeads[]>(`${environment.apiUrl}/leads`));
  }

  getLeadById(id: string): Promise<ILeads> {
    return firstValueFrom(this.http.get<ILeads>(`${environment.apiUrl}/leads/${id}`));
  }

  createLead(lead: ILeadCreate): Promise<ILeads> {
    return firstValueFrom(this.http.post<ILeads>(`${environment.apiUrl}/leads`, lead));
  }

  updateLead(id: string, lead: ILeadCreate): Promise<ILeads> {
    return firstValueFrom(this.http.patch<ILeads>(`${environment.apiUrl}/leads/${id}`, lead));
  }

  deleteLead(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${environment.apiUrl}/leads/${id}`));
  }
}
