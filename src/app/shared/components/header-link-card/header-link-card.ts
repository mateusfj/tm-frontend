import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-header-link-card',
  standalone: true,
  imports: [RouterLink, Button],
  templateUrl: './header-link-card.html',
})
export class HeaderLinkCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) route!: string;
  @Input() icon: string = 'pi pi-arrow-right';
}
