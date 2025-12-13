import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { LeadsList } from './features/leads/pages/leads-list/leads-list';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'leads',
    component: LeadsList,
  },
];
