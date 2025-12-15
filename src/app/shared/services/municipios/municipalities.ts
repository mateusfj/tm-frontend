import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MunicipalitiesService {
  constructor(private http: HttpClient) {}

  getMunicipalitiesService(): Promise<any> {
    return firstValueFrom(this.http.get<string[]>(environment.MunicipalitiesServiceApi));
  }
}
