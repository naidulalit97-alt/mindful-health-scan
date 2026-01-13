import { HealthData, HealthAssessment, RiskCategory } from '@/types/health';

export function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

export function calculateHealthAssessment(data: HealthData): HealthAssessment {
  const bmi = calculateBMI(data.height, data.weight);
  const bmiCategory = getBMICategory(bmi);
  
  // Calculate individual risk scores (0-100 scale)
  const cardiovascularRisk = calculateCardiovascularRisk(data, bmi);
  const metabolicRisk = calculateMetabolicRisk(data, bmi);
  const mentalHealthRisk = calculateMentalHealthRisk(data);
  const sleepFatigueRisk = calculateSleepFatigueRisk(data);
  const lifestyleRisk = calculateLifestyleRisk(data, bmi);

  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (cardiovascularRisk.score * 0.25 +
      metabolicRisk.score * 0.2 +
      mentalHealthRisk.score * 0.2 +
      sleepFatigueRisk.score * 0.15 +
      lifestyleRisk.score * 0.2)
  );

  const riskLevel = overallScore <= 30 ? 'low' : overallScore <= 60 ? 'moderate' : 'high';

  const categories: RiskCategory[] = [
    cardiovascularRisk,
    metabolicRisk,
    mentalHealthRisk,
    sleepFatigueRisk,
    lifestyleRisk,
  ].filter(cat => cat.factors.length > 0);

  const recommendations = generateRecommendations(data, categories, bmi);
  const shouldConsultProfessional = overallScore > 60 || 
    data.currentSymptoms.length > 0 ||
    categories.some(cat => cat.level === 'high');

  return {
    overallScore,
    riskLevel,
    categories,
    recommendations,
    shouldConsultProfessional,
  };
}

function calculateCardiovascularRisk(data: HealthData, bmi: number): RiskCategory {
  let score = 0;
  const factors: string[] = [];

  // Age factor
  if (data.age > 45) {
    score += 15;
    factors.push('Age over 45 years');
  } else if (data.age > 35) {
    score += 8;
  }

  // BMI factor
  if (bmi >= 30) {
    score += 25;
    factors.push('BMI indicates obesity');
  } else if (bmi >= 25) {
    score += 15;
    factors.push('BMI indicates overweight');
  }

  // Activity level
  if (data.activityLevel === 'low') {
    score += 20;
    factors.push('Low physical activity');
  } else if (data.activityLevel === 'moderate') {
    score += 8;
  }

  // Smoking/alcohol
  if (data.smokingAlcohol === 'frequent') {
    score += 25;
    factors.push('Frequent smoking or alcohol use');
  } else if (data.smokingAlcohol === 'occasional') {
    score += 10;
  }

  // Resting heart rate
  if (data.restingHeartRate && data.restingHeartRate > 100) {
    score += 15;
    factors.push('Elevated resting heart rate');
  } else if (data.restingHeartRate && data.restingHeartRate > 80) {
    score += 8;
  }

  const level = score <= 30 ? 'low' : score <= 60 ? 'moderate' : 'high';

  return {
    name: 'Cardiovascular',
    level,
    score: Math.min(score, 100),
    factors,
    icon: '❤️',
  };
}

function calculateMetabolicRisk(data: HealthData, bmi: number): RiskCategory {
  let score = 0;
  const factors: string[] = [];

  // Diet pattern
  if (data.dietPattern === 'high_sugar') {
    score += 30;
    factors.push('High sugar diet');
  } else if (data.dietPattern === 'high_fat') {
    score += 25;
    factors.push('High fat diet');
  } else if (data.dietPattern === 'irregular') {
    score += 20;
    factors.push('Irregular eating patterns');
  }

  // BMI
  if (bmi >= 30) {
    score += 25;
    factors.push('BMI in obesity range');
  } else if (bmi >= 25) {
    score += 15;
  } else if (bmi < 18.5) {
    score += 15;
    factors.push('BMI indicates underweight');
  }

  // Water intake
  if (data.waterIntake === 'low') {
    score += 15;
    factors.push('Low water intake');
  }

  // Activity level
  if (data.activityLevel === 'low') {
    score += 15;
    factors.push('Sedentary lifestyle');
  }

  const level = score <= 30 ? 'low' : score <= 60 ? 'moderate' : 'high';

  return {
    name: 'Metabolic',
    level,
    score: Math.min(score, 100),
    factors,
    icon: '⚡',
  };
}

function calculateMentalHealthRisk(data: HealthData): RiskCategory {
  let score = 0;
  const factors: string[] = [];

  // Stress level
  if (data.stressLevel === 'high') {
    score += 35;
    factors.push('High stress levels');
  } else if (data.stressLevel === 'medium') {
    score += 15;
    factors.push('Moderate stress');
  }

  // Screen time
  if (data.screenTime > 10) {
    score += 25;
    factors.push('Excessive screen time (10+ hours)');
  } else if (data.screenTime > 6) {
    score += 15;
    factors.push('High screen time');
  }

  // Sleep quality affects mental health
  if (data.sleepQuality === 'poor') {
    score += 20;
    factors.push('Poor sleep quality affects mood');
  } else if (data.sleepQuality === 'fair') {
    score += 10;
  }

  // Activity helps mental health
  if (data.activityLevel === 'low') {
    score += 15;
    factors.push('Limited physical activity');
  }

  const level = score <= 30 ? 'low' : score <= 60 ? 'moderate' : 'high';

  return {
    name: 'Mental Health & Stress',
    level,
    score: Math.min(score, 100),
    factors,
    icon: '🧠',
  };
}

function calculateSleepFatigueRisk(data: HealthData): RiskCategory {
  let score = 0;
  const factors: string[] = [];

  // Sleep duration
  if (data.sleepDuration < 6) {
    score += 35;
    factors.push('Insufficient sleep (under 6 hours)');
  } else if (data.sleepDuration < 7) {
    score += 20;
    factors.push('Slightly low sleep duration');
  } else if (data.sleepDuration > 9) {
    score += 15;
    factors.push('Excessive sleep may indicate issues');
  }

  // Sleep quality
  if (data.sleepQuality === 'poor') {
    score += 30;
    factors.push('Poor sleep quality');
  } else if (data.sleepQuality === 'fair') {
    score += 15;
    factors.push('Fair sleep quality');
  }

  // Screen time affects sleep
  if (data.screenTime > 8) {
    score += 15;
    factors.push('High screen time may affect sleep');
  }

  // Stress affects sleep
  if (data.stressLevel === 'high') {
    score += 15;
    factors.push('High stress can disrupt sleep');
  }

  const level = score <= 30 ? 'low' : score <= 60 ? 'moderate' : 'high';

  return {
    name: 'Sleep & Fatigue',
    level,
    score: Math.min(score, 100),
    factors,
    icon: '😴',
  };
}

function calculateLifestyleRisk(data: HealthData, bmi: number): RiskCategory {
  let score = 0;
  const factors: string[] = [];

  // Activity level
  if (data.activityLevel === 'low') {
    score += 25;
    factors.push('Low daily physical activity');
  } else if (data.activityLevel === 'moderate') {
    score += 10;
  }

  // Diet
  if (data.dietPattern !== 'balanced') {
    score += 20;
    factors.push('Unbalanced diet pattern');
  }

  // Water
  if (data.waterIntake === 'low') {
    score += 15;
    factors.push('Insufficient hydration');
  }

  // Smoking/alcohol
  if (data.smokingAlcohol === 'frequent') {
    score += 30;
    factors.push('Frequent substance use');
  } else if (data.smokingAlcohol === 'occasional') {
    score += 12;
    factors.push('Occasional substance use');
  }

  // Screen time
  if (data.screenTime > 8) {
    score += 15;
    factors.push('Extended screen time');
  }

  const level = score <= 30 ? 'low' : score <= 60 ? 'moderate' : 'high';

  return {
    name: 'Lifestyle',
    level,
    score: Math.min(score, 100),
    factors,
    icon: '🌿',
  };
}

function generateRecommendations(
  data: HealthData,
  categories: RiskCategory[],
  bmi: number
): string[] {
  const recommendations: string[] = [];

  // Activity recommendations
  if (data.activityLevel === 'low') {
    recommendations.push('Start with 10-15 minute daily walks and gradually increase');
  } else if (data.activityLevel === 'moderate') {
    recommendations.push('Consider adding strength training 2-3 times per week');
  }

  // Sleep recommendations
  if (data.sleepDuration < 7 || data.sleepQuality === 'poor') {
    recommendations.push('Establish a consistent sleep schedule, aim for 7-9 hours');
    recommendations.push('Reduce screen time 1 hour before bed');
  }

  // Diet recommendations
  if (data.dietPattern !== 'balanced') {
    recommendations.push('Focus on adding more vegetables and whole grains to meals');
  }

  // Hydration
  if (data.waterIntake === 'low') {
    recommendations.push('Aim for 8 glasses of water daily, keep a bottle nearby');
  }

  // Stress management
  if (data.stressLevel === 'high') {
    recommendations.push('Try 5-10 minutes of deep breathing or meditation daily');
    recommendations.push('Consider scheduling regular breaks during work');
  }

  // Screen time
  if (data.screenTime > 8) {
    recommendations.push('Take a 5-minute break from screens every hour');
  }

  // Weight management
  if (bmi >= 25) {
    recommendations.push('Small portion adjustments can make a big difference over time');
  }

  // Smoking/alcohol
  if (data.smokingAlcohol === 'frequent') {
    recommendations.push('Consider speaking with a healthcare provider about reducing use');
  }

  return recommendations.slice(0, 5); // Limit to 5 actionable recommendations
}
