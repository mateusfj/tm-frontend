import { Component, inject, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { PropertiesForm } from '../../components/properties-form/properties-form';
import { PropertiesService } from '../../services/properties-service';
import { IPropertyWithLead, PropertyUI } from '../../types/properties';
import { CROP_LABEL_MAP } from '../../constants/crops';
import { PROPERTY_TYPE_LABEL_MAP } from '../../constants/property-type';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [PageHeaderComponent, TableModule, RouterLink, Button, DialogModule, PropertiesForm],
  templateUrl: './properties-list.html',
})
export class PropertiesList {
  propertiesService = inject(PropertiesService);
  toastService = inject(ToastService);

  visible: boolean = false;

  properties = resource({
    loader: async (): Promise<PropertyUI[]> => {
      const data: IPropertyWithLead[] = await this.propertiesService.getProperties();
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
}
