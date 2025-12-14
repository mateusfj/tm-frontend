import { Component, EventEmitter, inject, Input, OnInit, Output, resource } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { PropertiesService } from '../../services/properties-service';
import { Crop, IProperty, IPropertyCreate, PropertyType } from '../../types/properties';
import { ILeads } from '../../../leads/types/leads';
import { LeadsService } from '../../../leads/services/leads-service';
import { CROPS } from '../../constants/crops';
import { PROPERTY_TYPE } from '../../constants/property-type';

@Component({
  selector: 'app-properties-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    CardModule,
    TextareaModule,
    SelectModule,
  ],
  templateUrl: './properties-form.html',
})
export class PropertiesForm implements OnInit {
  leadsService = inject(LeadsService);
  propertiesService = inject(PropertiesService);
  toastService = inject(ToastService);
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  @Input() propertyId: string | null = null;
  @Input() leadId: string | null = null;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  crops: typeof CROPS = CROPS;
  propertyTypes: typeof PROPERTY_TYPE = PROPERTY_TYPE;

  leads = resource({
    loader: async (): Promise<{ label: string; value: string }[]> => {
      const leads: ILeads[] = await this.leadsService.getLeads();
      return leads.map((lead: ILeads) => ({ label: lead.name, value: lead.id }));
    },
    defaultValue: [],
  });

  propertiesForm = new FormGroup({
    leadId: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    property_type: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    crop: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    area: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.000001)],
    }),
    municipality: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
  });

  ngOnInit(): void {
    const leadIdFromQuery = this.route.snapshot.queryParamMap.get('leadId');
    const effectiveLeadId = this.leadId ?? leadIdFromQuery;
    if (effectiveLeadId) {
      this.propertiesForm.controls.leadId.setValue(effectiveLeadId);
    }

    const routeId = this.route.snapshot.paramMap.get('id');
    const effectivePropertyId = this.propertyId ?? routeId;

    if (effectivePropertyId) {
      this.propertiesService
        .getPropertyById(effectivePropertyId)
        .then((property: IProperty) => {
          this.propertiesForm.setValue({
            leadId: property.lead_id,
            name: property.name,
            property_type: property.property_type,
            crop: property.crop,
            area: property.area,
            municipality: property.municipality,
          });
        })
        .catch(() => {
          this.toastService.error('Erro', 'Não foi possível carregar os dados da propriedade.');
          this.router.navigate(['/properties']);
        });
    }
  }

  isInvalid(fieldName: string): boolean {
    const field = this.propertiesForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.propertiesForm.invalid) {
      this.propertiesForm.markAllAsTouched();
      return;
    }

    const raw = this.propertiesForm.getRawValue();

    const data: IPropertyCreate = {
      lead_id: raw.leadId,
      crop: raw.crop as Crop,
      area: raw.area as number,
      name: raw.name,
      property_type: raw.property_type as PropertyType,
      municipality: raw.municipality,
    };

    const routeId = this.route.snapshot.paramMap.get('id');
    const effectivePropertyId = this.propertyId ?? routeId;

    const request = effectivePropertyId
      ? this.propertiesService.updateProperty(effectivePropertyId, data)
      : this.propertiesService.createProperty(data);

    request
      .then(() => {
        if (effectivePropertyId) {
          this.toastService.success('Sucesso', 'Propriedade atualizada com sucesso.');
        } else {
          this.toastService.success('Sucesso', 'Propriedade cadastrada com sucesso.');
          this.propertiesForm.reset();
          if (this.leadId) this.propertiesForm.controls.leadId.setValue(this.leadId);
        }
        this.close.emit();
      })
      .catch((error) => {
        const messages = error?.error?.message;
        if (Array.isArray(messages)) {
          messages.forEach((errMsg: string) => this.toastService.error('Erro', errMsg));
          return;
        }
        this.toastService.error('Erro', 'Ocorreu um erro ao salvar a propriedade.');
      });
  }

  onCancel(): void {
    this.propertiesForm.reset();
    this.close.emit();
  }
}
