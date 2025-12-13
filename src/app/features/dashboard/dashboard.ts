import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  imports: [Button],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  meuNome = 'Mateus';
  isAdmin = true;

  toggleAdmin(): void {
    this.isAdmin = !this.isAdmin;
    console.log('isAdmin:', this.isAdmin);
  }
}
