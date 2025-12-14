import { LeadStatusEnum } from '../../leads/types/leads';

export interface LeadsByStatusItem {
  status: LeadStatusEnum;
  total: number;
  percentage: number;
}

export interface LeadsByStatusItemUI extends Omit<LeadsByStatusItem, 'status'> {
  status: string;
}
