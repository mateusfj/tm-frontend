import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IProperty, IPropertyCreate, IPropertyWithLead } from '../types/properties';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  constructor(private http: HttpClient) {}

  getProperties(): Promise<IPropertyWithLead[]> {
    return firstValueFrom(this.http.get<IPropertyWithLead[]>(`${environment.apiUrl}/properties`));
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
