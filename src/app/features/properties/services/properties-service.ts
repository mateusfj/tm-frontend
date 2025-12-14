import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IProperty, IPropertyCreate, IPropertyWithLead } from '../types/properties';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  constructor(private http: HttpClient) {}

  getProperties(filters?: {
    search?: string;
    crop?: IProperty['crop'];
    municipality?: string;
    lead_id?: string;
  }): Promise<IPropertyWithLead[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.search) params = params.set('search', filters.search);
      if (filters.crop) params = params.set('crop', String(filters.crop));
      if (filters.municipality) params = params.set('municipality', filters.municipality);
      if (filters.lead_id) params = params.set('lead_id', filters.lead_id);
    }

    return firstValueFrom(
      this.http.get<IPropertyWithLead[]>(`${environment.apiUrl}/properties`, { params })
    );
  }

  getPropertyById(id: string): Promise<IProperty> {
    return firstValueFrom(this.http.get<IProperty>(`${environment.apiUrl}/properties/${id}`));
  }

  createProperty(property: IPropertyCreate): Promise<IProperty> {
    return firstValueFrom(this.http.post<IProperty>(`${environment.apiUrl}/properties`, property));
  }

  updateProperty(id: string, property: IPropertyCreate): Promise<IProperty> {
    return firstValueFrom(
      this.http.patch<IProperty>(`${environment.apiUrl}/properties/${id}`, property)
    );
  }

  deleteProperty(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${environment.apiUrl}/properties/${id}`));
  }
}
