import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { LeadsList } from './features/leads/pages/leads-list/leads-list';
import { LeadsForm } from './features/leads/components/leads-form/leads-form';
import { PropertiesList } from './features/properties/pages/properties-list/properties-list';
import { PropertiesForm } from './features/properties/components/properties-form/properties-form';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'leads',
    component: LeadsList,
  },
  {
    path: 'properties',
    component: PropertiesList,
  },
];
