import { Component, inject, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { PropertiesForm } from '../../components/properties-form/properties-form';
import { PropertiesFilters } from '../../components/properties-filters/properties-filters';
import { PropertiesService } from '../../services/properties-service';
import { IPropertyWithLead, PropertyUI } from '../../types/properties';
import { CROP_LABEL_MAP, CROPS } from '../../constants/crops';
import { PROPERTY_TYPE_LABEL_MAP } from '../../constants/property-type';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LeadsService } from '../../../leads/services/leads-service';
import { ILeads } from '../../../leads/types/leads';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    PageHeaderComponent,
    TableModule,
    RouterLink,
    Button,
    DialogModule,
    PropertiesForm,
    PropertiesFilters,
    SelectModule,
    InputTextModule,
    FormsModule,
    Card,
  ],
  templateUrl: './properties-list.html',
})
export class PropertiesList {
  propertiesService = inject(PropertiesService);
  leadsService = inject(LeadsService);
  toastService = inject(ToastService);

  visible: boolean = false;

  CROPS: typeof CROPS = CROPS;
  search: string = '';
  crop?: IPropertyWithLead['crop'];
  municipality: string = '';
  lead_id: string = '';

  leads = resource({
    loader: async (): Promise<Array<{ id: string; name: string }>> => {
      const leads: ILeads[] = await this.leadsService.getLeads();
      return leads.map((lead: ILeads) => ({ id: lead.id, name: lead.name }));
    },
    defaultValue: [],
  });

  properties = resource({
    loader: async (): Promise<PropertyUI[]> => {
      const data: IPropertyWithLead[] = await this.propertiesService.getProperties({
        search: this.search ?? undefined,
        crop: this.crop ?? undefined,
        municipality: this.municipality ?? undefined,
        lead_id: this.lead_id ?? undefined,
      });
      return data.map((property: IPropertyWithLead) => ({
        ...property,
        crop: CROP_LABEL_MAP[property.crop],
        property_type: PROPERTY_TYPE_LABEL_MAP[property.property_type],
        lead_name: property.lead.name,
      }));
    },
    defaultValue: [],
  });

  columns: Array<{ field: keyof PropertyUI; header: string }> = [
    { field: 'lead_name', header: 'Lead ID' },
    { field: 'name', header: 'Nome' },
    { field: 'property_type', header: 'Tipo de Propriedade' },
    { field: 'crop', header: 'Cultura' },
    { field: 'area', header: 'Área' },
    { field: 'municipality', header: 'Município' },
  ];

  handelShowDialog(): void {
    this.visible = true;
  }

  handleClose(): void {
    this.visible = false;
    this.properties.reload();
  }

  handleDeleteProperty(id: string) {
    this.propertiesService.deleteProperty(id).then(() => {
      this.toastService.success('Propriedade deletada com sucesso.');
      this.properties.reload();
    });
  }

  // Trigger reload when any filter changes
  onFiltersChange(): void {
    this.properties.reload();
  }
}
