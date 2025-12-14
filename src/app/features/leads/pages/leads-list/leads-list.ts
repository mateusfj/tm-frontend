import { Component, inject, resource } from '@angular/core';
import { LeadsService } from '../../services/leads-service';
import { ILeads, LeadStatusEnum, LeadUI } from '../../types/leads';
import { TableModule } from 'primeng/table';
import { DataTableColumn } from '../../../../shared/components/data-table/data-table.types';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LEAD_STATUS_LABEL_MAP, LEAD_STATUS_OPTIONS } from '../../constants/status';
import { LeadsForm } from '../../components/leads-form/leads-form';
import { LeadsFilters } from '../../components/leads-filters/leads-filters';
import { Card } from 'primeng/card';
import { Municipalities } from '../../../../shared/services/municipios/municipalities';
@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [PageHeaderComponent, TableModule, Button, DialogModule, LeadsForm, LeadsFilters, Card],
  templateUrl: './leads-list.html',
})
export class LeadsList {
  leadsService = inject(LeadsService);
  toastService = inject(ToastService);
  municipalitiesService = inject(Municipalities);
  visible: boolean = false;

  leadId: string | null = null;

  search: string = '';
  status?: LeadStatusEnum;
  municipality: string = '';

  statusOptions = LEAD_STATUS_OPTIONS;

  municipalities = resource({
    loader: async (): Promise<Array<{ label: string; value: string }>> => {
      const data = await this.municipalitiesService.getMunicipalities();
      return data.map((municipality: { id: number; nome: string }) => ({
        label: municipality.nome,
        value: municipality.nome,
      }));
    },
    defaultValue: [],
  });

  leads = resource({
    loader: async (): Promise<LeadUI[]> => {
      const data: ILeads[] = await this.leadsService.getLeads({
        search: this.search || undefined,
        status: this.status || undefined,
        municipality: this.municipality || undefined,
      });
      return data.map((lead: ILeads) => ({
        ...lead,
        status: LEAD_STATUS_LABEL_MAP[lead.status],
      }));
    },
    defaultValue: [],
  });

  handelShowDialog(): void {
    this.visible = true;
  }

  handleClose(): void {
    this.visible = false;
    this.leadId = null;
    this.leads.reload();
  }

  setLeadId(leadId: string): void {
    this.leadId = leadId;
  }

  handleEditLead(leadId: string): void {
    this.setLeadId(leadId);
    this.handelShowDialog();
  }

  handleDeleteLead(id: string): void {
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

  onFiltersChange(): void {
    this.leads.reload();
  }
}
