import { Component, inject, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { PropertiesForm } from '../../components/properties-form/properties-form';
import { PropertiesService } from '../../services/properties-service';
import { IProperty, PropertyUI } from '../../types/properties';
import { CROP_LABEL_MAP } from '../../constants/crops';

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
      const data: IProperty[] = await this.propertiesService.getProperties();
      return data.map((property) => ({
        ...property,
        crop: CROP_LABEL_MAP[property.crop],
      }));
    },
    defaultValue: [],
  });

  columns: Array<{ field: keyof IProperty; header: string }> = [
    { field: 'lead_id', header: 'Lead ID' },
    { field: 'crop', header: 'Cultura' },
    { field: 'area', header: 'Área' },
    { field: 'geometry', header: 'Geometry' },
  ];

  handelShowDialog() {
    this.visible = true;
  }

  handleClose() {
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
