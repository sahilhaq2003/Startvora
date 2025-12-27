export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  businessProfile?: BusinessProfile;
  subscription?: Subscription;
}

export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string;
  industry: string;
  website?: string;
  logo?: string;
  description?: string;
  businessStage: 'idea' | 'planning' | 'startup' | 'growth' | 'established';
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'canceled' | 'expired';
  startDate: Date;
  endDate?: Date;
}
