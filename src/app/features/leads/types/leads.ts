export interface ILeads {
  id: string;
  name: string;
  cpf: string;
  status: LeadStatusEnum;
  comments: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
}

export type LeadUI = Omit<ILeads, 'status'> & {
  status: string;
};

export type ILeadCreate = Omit<ILeads, 'id'>;

export enum LeadStatusEnum {
  NEW = 'NEW',
  INITIAL_CONTACT = 'INITIAL_CONTACT',
  NEGOTIATING = 'NEGOTIATING',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST',
}
