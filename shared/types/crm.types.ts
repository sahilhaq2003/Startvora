export interface Contact {
  id: string;
  userId: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  userId: string;
  contactId?: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  source?: string;
  value?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  contactId?: string;
  leadId?: string;
  type: 'note' | 'email' | 'call' | 'meeting';
  title: string;
  description?: string;
  date: Date;
  createdAt: Date;
}

export interface LeadPipeline {
  new: Lead[];
  contacted: Lead[];
  qualified: Lead[];
  proposal: Lead[];
  won: Lead[];
  lost: Lead[];
}
