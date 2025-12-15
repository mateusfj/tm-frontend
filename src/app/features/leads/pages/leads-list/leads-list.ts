import { Component, inject, resource } from '@angular/core';
import { LeadsService } from '../../services/leads-service';
import { ILeads, LeadStatusEnum, LeadUI } from '../../types/leads';
import { TableModule } from 'primeng/table';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LEAD_STATUS_LABEL_MAP, LEAD_STATUS_OPTIONS } from '../../constants/status';
import { LeadsForm } from '../../components/leads-form/leads-form';
import { LeadsFilters } from '../../components/leads-filters/leads-filters';
import { Card } from 'primeng/card';
import { MunicipalitiesService } from '../../../../shared/services/municipios/municipalities';
import { DataTableColumn } from '../../../../shared/types/data-table/data-table.types';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [PageHeaderComponent, TableModule, Button, DialogModule, LeadsForm, LeadsFilters, Card],
  templateUrl: './leads-list.html',
})
export class LeadsList {
  leadsService = inject(LeadsService);
  toastService = inject(ToastService);
  MunicipalitiesServiceService: MunicipalitiesService = inject(MunicipalitiesService);
  visible: boolean = false;

  leadId: string | null = null;

  search: string = '';
  status?: LeadStatusEnum;
  municipality: string = '';

  statusOptions = LEAD_STATUS_OPTIONS;

  MunicipalitiesService = resource({
    loader: async (): Promise<Array<{ label: string; value: string }>> => {
      const data = await this.MunicipalitiesServiceService.getMunicipalitiesService();
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

  columns: DataTableColumn<LeadUI>[] = [
    { field: 'name', header: 'Nome' },
    { field: 'cpf', header: 'CPF' },
    { field: 'phone', header: 'Contato' },
    { field: 'city', header: 'Município' },
    { field: 'status', header: 'Status' },
  ];

  handelShowDialog(): void {
    this.visible = true;
  }

  handleClose(): void {
    this.visible = false;
    this.leadId = null;
    this.leads.reload();
  }

  handleEditLead(leadId: string): void {
    this.leadId = leadId;
    this.handelShowDialog();
  }

  handleDeleteLead(id: string): void {
    this.leadsService.deleteLead(id).then((): void => {
      this.toastService.success('Lead deletado com sucesso.');
      this.leads.reload();
    });
  }

  onFiltersChange(): void {
    this.leads.reload();
  }
}
