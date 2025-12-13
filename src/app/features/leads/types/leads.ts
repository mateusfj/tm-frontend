export type LeadStatus = 'NEW' | 'INITIAL_CONTACT' | 'NEGOTIATING' | 'CONVERTED' | 'LOST';

export interface ILeads {
  id: string;
  name: string;
  cpf: string;
  status: LeadStatus;
  comments: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
}
