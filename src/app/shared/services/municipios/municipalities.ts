import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Municipalities {
  constructor(private http: HttpClient) {}

  getMunicipalities(): Promise<any> {
    return firstValueFrom(this.http.get<string[]>(environment.municipalitiesApi));
  }
}
