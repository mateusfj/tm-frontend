import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';
import { TopMunicipalityItem } from '../../types/top-municipality.interface';

@Component({
  selector: 'app-top-cities',
  standalone: true,
  imports: [Card],
  templateUrl: './top-cities.html',
})
export class TopCitiesComponent {
  @Input({ required: true }) cities!: TopMunicipalityItem[];
}
