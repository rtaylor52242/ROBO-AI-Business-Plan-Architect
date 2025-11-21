export interface BusinessInputData {
  businessName: string;
  industry: string;
  description: string;
  targetMarket: string;
  productsServices: string;
  usp: string;
  fundingRequest: string;
  teamExperience: string;
  visionMission: string;
}

export interface PlanSection {
  title: string;
  content: string; // Markdown supported content
}

export type BusinessPlan = PlanSection[];

export interface SavedPlan {
  id: string;
  createdAt: number;
  businessName: string;
  plan: BusinessPlan;
}

export enum AppStatus {
  INPUT = 'INPUT',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}