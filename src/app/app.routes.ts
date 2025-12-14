import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { LeadsList } from './features/leads/pages/leads-list/leads-list';
import { LeadsForm } from './features/leads/components/leads-form/leads-form';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'leads',
    children: [
      {
        path: '',
        component: LeadsList,
      },
      {
        path: 'form',
        component: LeadsForm,
      },
      {
        path: 'form/:id',
        component: LeadsForm,
      },
    ],
  },
];
