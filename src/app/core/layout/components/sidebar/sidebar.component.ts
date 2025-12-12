import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Input() isDesktop = false;
  @Output() readonly requestClose = new EventEmitter<void>();

  close(): void {
    this.requestClose.emit();
  }
}
