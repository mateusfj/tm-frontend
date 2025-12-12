import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

const COMPONENTS = [ButtonModule];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [...COMPONENTS],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() readonly menuToggle = new EventEmitter<void>();

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}
