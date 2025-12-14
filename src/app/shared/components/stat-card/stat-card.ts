import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './stat-card.html',
})
export class StatCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input() subtitle?: string;
  @Input() icon?: string;
}
