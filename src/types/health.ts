export interface HealthData {
  age: number;
  biologicalSex: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'low' | 'moderate' | 'high';
  sleepDuration: number; // hours
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  stressLevel: 'low' | 'medium' | 'high';
  dietPattern: 'balanced' | 'high_sugar' | 'high_fat' | 'irregular';
  waterIntake: 'low' | 'adequate' | 'high';
  smokingAlcohol: 'none' | 'occasional' | 'frequent';
  existingConditions: string;
  currentSymptoms: string;
  restingHeartRate: number | null;
  screenTime: number; // hours per day
}

export interface RiskCategory {
  name: string;
  level: 'low' | 'moderate' | 'high';
  score: number;
  factors: string[];
  icon: string;
}

export interface HealthAssessment {
  overallScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  categories: RiskCategory[];
  recommendations: string[];
  shouldConsultProfessional: boolean;
}
