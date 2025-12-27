export interface BusinessIdea {
  id: string;
  userId: string;
  title: string;
  description: string;
  estimatedCost: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  marketDemand: number; // 1-10 scale
  competitionLevel: number; // 1-10 scale
  potentialRevenue: {
    min: number;
    max: number;
  };
  requiredSkills: string[];
  isFavorite: boolean;
  createdAt: Date;
}

export interface BusinessPlan {
  id: string;
  userId: string;
  businessName: string;
  status: 'draft' | 'in_progress' | 'completed';
  executiveSummary?: ExecutiveSummary;
  marketAnalysis?: MarketAnalysis;
  productsServices?: ProductsServices;
  financialProjections?: FinancialProjections;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExecutiveSummary {
  tagline?: string;
  vision?: string;
  mission?: string;
  objectives: string[];
  elevatorPitch?: string;
}

export interface MarketAnalysis {
  industryOverview?: string;
  targetMarket?: {
    demographics: string;
    psychographics: string;
    marketSize: number;
  };
  customerPersonas: CustomerPersona[];
  competitors: Competitor[];
}

export interface CustomerPersona {
  name: string;
  age: number;
  occupation: string;
  income: number;
  painPoints: string[];
  goals: string[];
}

export interface Competitor {
  name: string;
  website?: string;
  strengths: string[];
  weaknesses: string[];
}

export interface ProductsServices {
  offerings: Offering[];
  pricingStrategy?: string;
  valueProposition?: string;
}

export interface Offering {
  name: string;
  description: string;
  price: number;
  type: 'product' | 'service';
}

export interface FinancialProjections {
  startupCosts: number;
  monthlyRevenue: number[];
  monthlyExpenses: number[];
  breakEvenMonth: number;
  projectionYears: number;
}

export interface SWOTAnalysis {
  id: string;
  userId: string;
  businessPlanId?: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  createdAt: Date;
  updatedAt: Date;
}
