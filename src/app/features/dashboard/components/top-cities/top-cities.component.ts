import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-cities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-cities.component.html',
})
export class TopCitiesComponent {
  @Input({ required: true }) cities!: Array<{ city: string; count: number }>;
}
