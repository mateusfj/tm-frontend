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
import { DialogModule } from 'primeng/dialog';
import { LeadsForm } from '../../components/leads-form/leads-form';
@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [PageHeaderComponent, TableModule, RouterLink, Button, DialogModule, LeadsForm],
  templateUrl: './leads-list.html',
})
export class LeadsList {
  leadsService = inject(LeadsService);
  toastService = inject(ToastService);
  visible: boolean = false;

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

  handelShowDialog() {
    this.visible = true;
  }

  handleClose() {
    this.visible = false;
    this.leads.reload();
  }

  handleDeleteLead(id: string) {
    this.leadsService.deleteLead(id).then(() => {
      this.toastService.success('Lead deletado com sucesso.');
      this.leads.reload();
    });
  }

  columns: DataTableColumn<LeadUI>[] = [
    { field: 'name', header: 'Nome' },
    { field: 'cpf', header: 'CPF' },
    { field: 'phone', header: 'Contato' },
    { field: 'city', header: 'Município' },
    { field: 'status', header: 'Status' },
  ];
}
