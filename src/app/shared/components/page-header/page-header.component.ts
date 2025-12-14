import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() description?: string;
  @Input() onAction?: () => void;
  @Input() buttonLabel: string = 'Novo';
}
