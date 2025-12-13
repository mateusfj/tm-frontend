import { LeadStatusEnum } from '../types/leads';

export const LEAD_STATUS_OPTIONS = [
  { label: 'Novo', value: LeadStatusEnum.NEW },
  { label: 'Em Contato', value: LeadStatusEnum.INITIAL_CONTACT },
  { label: 'Qualificado', value: LeadStatusEnum.NEGOTIATING },
  { label: 'Proposta', value: LeadStatusEnum.CONVERTED },
  { label: 'Perdido', value: LeadStatusEnum.LOST },
];

export const LEAD_STATUS_LABEL_MAP: Record<LeadStatusEnum, string> = {
  [LeadStatusEnum.NEW]: 'Novo',
  [LeadStatusEnum.INITIAL_CONTACT]: 'Em Contato',
  [LeadStatusEnum.NEGOTIATING]: 'Qualificado',
  [LeadStatusEnum.CONVERTED]: 'Proposta',
  [LeadStatusEnum.LOST]: 'Perdido',
};
