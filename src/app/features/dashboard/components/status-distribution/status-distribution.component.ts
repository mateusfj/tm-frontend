import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-distribution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-distribution.component.html',
  styleUrls: ['./status-distribution.component.css'],
})
export class StatusDistributionComponent {
  @Input({ required: true }) data!: Array<{ label: string; count: number; percentage: number }>;
}
