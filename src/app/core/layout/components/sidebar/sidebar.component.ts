import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

const COMPONENTS = [ButtonModule];
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [...COMPONENTS, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  sidebarItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/' },
    { label: 'Clientes', icon: 'pi pi-users', route: '/leads' },
  ];
  @Input() isOpen = true;
  @Input() isDesktop = false;
  @Output() readonly requestClose = new EventEmitter<void>();

  close(): void {
    this.requestClose.emit();
  }
}
