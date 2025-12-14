import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { SIDEBAR_ITEMS } from '../../constants/sidebarItems';

const COMPONENTS = [ButtonModule];
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [...COMPONENTS, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  sidebarItems = SIDEBAR_ITEMS;
  @Input() isOpen = true;
  @Input() isDesktop = false;
  @Output() readonly requestClose = new EventEmitter<void>();

  close(): void {
    this.requestClose.emit();
  }
}
