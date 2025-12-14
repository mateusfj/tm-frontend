import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { ILeadCreate, ILeads, LeadStatusEnum } from '../types/leads';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  constructor(private http: HttpClient) {}

  getLeads(params?: {
    search?: string;
    status?: LeadStatusEnum;
    municipality?: string;
  }): Promise<ILeads[]> {
    const query: Record<string, string> = {};

    if (params?.search) {
      query['search'] = params.search;
    }
    if (params?.status) {
      query['status'] = params.status;
    }
    if (params?.municipality) {
      query['municipality'] = params.municipality;
    }

    return firstValueFrom(
      this.http.get<ILeads[]>(`${environment.apiUrl}/leads`, {
        params: query,
      })
    );
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
