import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/pages/dashboard';
import { LeadsList } from './features/leads/pages/leads-list/leads-list';
import { PropertiesList } from './features/properties/pages/properties-list/properties-list';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'leads',
    component: LeadsList,
    title: 'Clientes',
  },
  {
    path: 'properties',
    component: PropertiesList,
    title: 'Propriedades',
  },
];
