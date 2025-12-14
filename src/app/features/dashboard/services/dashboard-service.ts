import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardMetrics } from '../types/metrics.interface';
import { environment } from '../../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { LeadsByStatusItem } from '../types/leads-by-status.interface';
import { TopMunicipalityItem } from '../types/top-municipality.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getMetrics(): Promise<DashboardMetrics> {
    return firstValueFrom(
      this.http.get<DashboardMetrics>(`${environment.apiUrl}/dashboard/metrics`)
    );
  }

  getLeadsByStatus(): Promise<LeadsByStatusItem[]> {
    return firstValueFrom(
      this.http.get<LeadsByStatusItem[]>(`${environment.apiUrl}/dashboard/leads-by-status`)
    );
  }

  getTopCities(): Promise<TopMunicipalityItem[]> {
    return firstValueFrom(
      this.http.get<TopMunicipalityItem[]>(`${environment.apiUrl}/dashboard/top-municipality`)
    );
  }
}
