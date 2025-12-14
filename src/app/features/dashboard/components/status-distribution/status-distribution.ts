import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';
import { LeadsByStatusItemUI } from '../../types/leads-by-status.interface';

@Component({
  selector: 'app-status-distribution',
  standalone: true,
  imports: [Card],
  templateUrl: './status-distribution.html',
})
export class StatusDistributionComponent {
  @Input({ required: true }) data!: LeadsByStatusItemUI[];
}
