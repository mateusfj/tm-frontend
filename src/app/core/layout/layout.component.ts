import { Component, HostListener, OnInit, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet, HeaderComponent, SidebarComponent, ToastModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  readonly isDesktop = signal(this.getIsDesktop());
  readonly isSidebarOpen = signal(this.getIsDesktop());

  readonly sidebarClasses = computed(() => {
    if (this.isDesktop()) {
      return {
        'relative z-30 h-full shrink-0 overflow-hidden transition-all duration-300 ease-in-out':
          true,
        'w-72': this.isSidebarOpen(),
        'w-0': !this.isSidebarOpen(),
      };
    }

    return {
      'fixed inset-y-0 left-0 z-40 h-full max-w-xs w-4/5 overflow-hidden bg-white transition-all duration-300 ease-in-out will-change-transform shadow-xl':
        true,
      'translate-x-0': this.isSidebarOpen(),
      '-translate-x-full': !this.isSidebarOpen(),
    };
  });

  ngOnInit(): void {
    this.syncWithViewport();
  }

  @HostListener('window:resize')
  onResize() {
    this.syncWithViewport();
  }

  toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  handleSidebarClose(): void {
    this.isSidebarOpen.set(false);
  }

  private syncWithViewport(): void {
    const desktop = this.getIsDesktop();
    this.isDesktop.set(desktop);
    this.isSidebarOpen.set(desktop ? true : false);
  }

  private getIsDesktop(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
  }
}
