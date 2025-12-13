import { Component, inject, resource } from '@angular/core';
import { LeadsService } from '../../services/leads-service';
import { ILeads } from '../../types/leads';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { DataTableColumn } from '../../../../shared/components/data-table/data-table.types';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './leads-list.html',
})
export class LeadsList {
  leadsService = inject(LeadsService);
  leads = resource({
    loader: (): Promise<ILeads[]> => this.leadsService.getLeads(),
    defaultValue: [],
  });

  columns: DataTableColumn<ILeads>[] = [
    { field: 'name', header: 'Nome' },
    { field: 'cpf', header: 'CPF' },
    { field: 'status', header: 'Status' },
    { field: 'phone', header: 'Telefone' },
    { field: 'email', header: 'Email' },
    { field: 'city', header: 'Cidade' },
  ];
}
