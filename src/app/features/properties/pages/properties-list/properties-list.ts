import { Component, inject, resource } from '@angular/core';
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
import { MunicipalitiesService } from '../../../../shared/services/municipios/municipalities';
import { DataTableColumn } from '../../../../shared/types/data-table/data-table.types';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    PageHeaderComponent,
    TableModule,
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
  MunicipalitiesServiceService: MunicipalitiesService = inject(MunicipalitiesService);

  property_id: string | null = null;
  visible: boolean = false;
  search: string = '';
  crop?: IPropertyWithLead['crop'];
  municipality: string = '';
  lead_id: string = '';

  CROPS: typeof CROPS = CROPS;

  leads = resource({
    loader: async (): Promise<Array<{ id: string; name: string }>> => {
      const leads: ILeads[] = await this.leadsService.getLeads();
      return leads.map((lead: ILeads) => ({ id: lead.id, name: lead.name }));
    },
    defaultValue: [],
  });

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

  columns: DataTableColumn<PropertyUI>[] = [
    { field: 'name', header: 'Nome' },
    { field: 'lead_name', header: 'Proprietário' },
    { field: 'property_type', header: 'Tipo de Propriedade' },
    { field: 'crop', header: 'Cultura' },
    { field: 'area', header: 'Área' },
    { field: 'municipality', header: 'Município' },
  ];

  handelShowDialog(): void {
    this.visible = true;
  }

  handleClose(): void {
    this.property_id = null;
    this.visible = false;
    this.properties.reload();
  }

  handleEditProperty(id: string) {
    this.property_id = id;
    this.handelShowDialog();
  }

  handleDeleteProperty(id: string) {
    this.propertiesService.deleteProperty(id).then(() => {
      this.toastService.success('Propriedade deletada com sucesso.');
      this.properties.reload();
    });
  }

  onFiltersChange(): void {
    this.properties.reload();
  }
}
