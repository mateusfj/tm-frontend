import { Component, inject, resource } from '@angular/core';
import { LeadsService } from '../../services/leads-service';
import { ILeads, LeadUI } from '../../types/leads';
import { TableModule } from 'primeng/table';
import { DataTableColumn } from '../../../../shared/components/data-table/data-table.types';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { LEAD_STATUS_LABEL_MAP } from '../../constants/status';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [PageHeaderComponent, TableModule, RouterLink, Button],
  templateUrl: './leads-list.html',
})
export class LeadsList {
  leadsService = inject(LeadsService);
  toastService = inject(ToastService);

  leads = resource({
    loader: async (): Promise<LeadUI[]> => {
      const data: ILeads[] = await this.leadsService.getLeads();
      return data.map((lead: ILeads) => ({
        ...lead,
        status: LEAD_STATUS_LABEL_MAP[lead.status],
      }));
    },
    defaultValue: [],
  });

  deleteLead(id: string) {
    this.leadsService.deleteLead(id).then(() => {
      console.log('Lead deleted:', id);
      this.toastService.success('Lead deletado com sucesso.');
      this.leads.reload();
    });
  }

  columns: DataTableColumn<LeadUI>[] = [
    { field: 'name', header: 'Nome' },
    { field: 'cpf', header: 'CPF' },
    { field: 'status', header: 'Status' },
    { field: 'phone', header: 'Telefone' },
    { field: 'email', header: 'Email' },
    { field: 'city', header: 'Cidade' },
  ];
}
