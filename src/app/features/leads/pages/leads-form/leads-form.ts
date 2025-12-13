import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { LeadsService } from '../../services/leads-service';
import { ILeadCreate, LeadStatusEnum } from '../../types/leads';
import { InputMask } from 'primeng/inputmask';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LEAD_STATUS_OPTIONS } from '../../constants/status';

@Component({
  selector: 'app-leads-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    CardModule,
    PageHeaderComponent,
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
  route = inject(ActivatedRoute);
  leadId: string | null = null;
  statusOptions = LEAD_STATUS_OPTIONS;

  constructor() {
    this.leadId = this.route.snapshot.paramMap.get('id');
    if (this.leadId) {
      this.leadsService
        .getLeadById(this.leadId)
        .then((lead) => {
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

  get pageTitle(): string {
    return this.leadId ? 'Editar Cliente' : 'Cadastrar Cliente';
  }

  get pageDescription(): string {
    return this.leadId
      ? 'Formulário para editar os dados do cliente'
      : 'Formulário para cadastrar um novo cliente';
  }

  isInvalid(fieldName: string): boolean {
    const field = this.leadsForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Abstrair a lógica de submissão do formulário
  onSubmit() {
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

    const request = this.leadId
      ? this.leadsService.updateLead(this.leadId, data)
      : this.leadsService.createLead(data);

    request
      .then(() => {
        if (this.leadId) {
          this.toastService.success('Sucesso', 'Cliente atualizado com sucesso.');
        } else {
          this.toastService.success('Sucesso', 'Cliente cadastrado com sucesso.');
          this.leadsForm.reset();
        }
        this.router.navigate(['/leads']);
      })
      .catch((error) => {
        const messages = error?.error?.message;
        // TODO : Padronizar retorno de erros na API
        if (Array.isArray(messages)) {
          messages.forEach((errMsg: string) => this.toastService.error('Erro', errMsg));
          return;
        }
        this.toastService.error('Erro', 'Ocorreu um erro ao salvar o cliente.');
      });
  }
}
