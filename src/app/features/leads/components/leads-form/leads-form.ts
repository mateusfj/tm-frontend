import { Component, EventEmitter, inject, Input, OnInit, Output, resource } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { LeadsService } from '../../services/leads-service';
import { ILeadCreate, ILeads, LeadStatusEnum } from '../../types/leads';
import { InputMask } from 'primeng/inputmask';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LEAD_STATUS_OPTIONS } from '../../constants/status';
import { Municipalities } from '../../../../shared/services/municipios/municipalities';

@Component({
  selector: 'app-leads-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    CardModule,
    InputMask,
    TextareaModule,
    SelectModule,
  ],
  templateUrl: './leads-form.html',
})
export class LeadsForm {
  leadsService = inject(LeadsService);
  toastService = inject(ToastService);
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  municipalitiesService: Municipalities = inject(Municipalities);

  @Input() leadId: string | null = null;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  submitted: boolean = false;
  statusOptions: typeof LEAD_STATUS_OPTIONS = LEAD_STATUS_OPTIONS;

  ngOnChanges(): void {
    if (this.leadId) {
      this.leadsService
        .getLeadById(this.leadId)
        .then((lead: ILeads) => {
          this.leadsForm.setValue({
            name: lead.name,
            cpf: lead.cpf,
            phone: lead.phone ?? '',
            email: lead.email ?? '',
            status: lead.status,
            city: lead.city ?? '',
            comments: lead.comments ?? '',
          });
        })
        .catch(() => {
          this.toastService.error('Erro', 'Não foi possível carregar os dados do cliente.');
          this.router.navigate(['/leads']);
        });
    }
  }

  municipalities = resource({
    loader: async (): Promise<{ id: number; nome: string }[]> => {
      const data = await this.municipalitiesService.getMunicipalities();
      return data.map((municipality: { id: number; nome: string }) => ({
        id: municipality.id,
        nome: municipality.nome,
      }));
    },
    defaultValue: [],
  });

  leadsForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    cpf: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    status: new FormControl<LeadStatusEnum | null>(null, { validators: [Validators.required] }),
    city: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    comments: new FormControl<string>('', { nonNullable: true }),
  });

  // Abstrair a lógica de submissão do formulário
  onSubmit(): void {
    this.submitted = true;
    if (this.leadsForm.invalid) {
      this.leadsForm.markAllAsTouched();
      return;
    }

    const raw = this.leadsForm.getRawValue();

    const data: ILeadCreate = {
      name: raw.name,
      cpf: raw.cpf,
      phone: raw.phone,
      email: raw.email,
      status: raw.status as LeadStatusEnum,
      city: raw.city,
      comments: raw.comments,
    };

    if (this.leadId) {
      this.leadsService
        .updateLead(this.leadId, data)
        .then((): void => {
          this.toastService.success('Sucesso', 'Cliente atualizado com sucesso.');
        })
        .catch((): void => {
          this.toastService.error('Erro', 'Ocorreu um erro ao salvar o cliente.');
        });
    } else {
      this.leadsService
        .createLead(data)
        .then((): void => {
          this.toastService.success('Sucesso', 'Cliente cadastrado com sucesso.');
        })
        .catch((): void => {
          this.toastService.error('Erro', 'Ocorreu um erro ao salvar o cliente.');
        });
    }

    this.onClose();
  }

  onClose(): void {
    this.submitted = false;
    this.leadsForm.reset();
    this.close.emit();
  }
}
