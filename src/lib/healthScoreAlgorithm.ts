// Health Score Algorithm - Production Ready
// Calculates comprehensive health score based on daily metrics

export interface DailyHealthData {
  sleep: number; // hours (0-12)
  exercise: {
    minutes: number;
    type: 'cardio' | 'strength' | 'yoga' | 'sports' | 'none';
  };
  steps: number;
  water: number; // glasses
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  medications: {
    taken: string[];
    prescribed: string[];
  };
  mood?: 'happy' | 'neutral' | 'sad' | 'stressed' | 'anxious';
  notes?: string;
}

export interface ScoreBreakdown {
  sleep: number;
  exercise: number;
  steps: number;
  water: number;
  medication: number;
  nutrition: number;
}

export interface HealthScoreResult {
  totalScore: number;
  breakdown: ScoreBreakdown;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement';
  color: string;
}

// Scoring weights
const WEIGHTS = {
  sleep: 25,
  exercise: 20,
  steps: 15,
  water: 10,
  medication: 20,
  nutrition: 10,
};

// Calculate sleep score (25 points max)
// Optimal: 7-9 hours
function calculateSleepScore(hours: number): number {
  if (hours >= 7 && hours <= 9) {
    return WEIGHTS.sleep; // Perfect score
  } else if (hours >= 6 && hours < 7) {
    return Math.round(WEIGHTS.sleep * 0.8);
  } else if (hours > 9 && hours <= 10) {
    return Math.round(WEIGHTS.sleep * 0.85);
  } else if (hours >= 5 && hours < 6) {
    return Math.round(WEIGHTS.sleep * 0.6);
  } else if (hours > 10) {
    return Math.round(WEIGHTS.sleep * 0.7);
  } else if (hours >= 4 && hours < 5) {
    return Math.round(WEIGHTS.sleep * 0.4);
  } else {
    return Math.round(WEIGHTS.sleep * (hours / 7) * 0.5);
  }
}

// Calculate exercise score (20 points max)
// Target: 30+ minutes
function calculateExerciseScore(minutes: number, type: string): number {
  if (type === 'none' || minutes === 0) {
    return 0;
  }
  
  let baseScore = 0;
  if (minutes >= 30) {
    baseScore = WEIGHTS.exercise;
  } else if (minutes >= 20) {
    baseScore = Math.round(WEIGHTS.exercise * 0.8);
  } else if (minutes >= 15) {
    baseScore = Math.round(WEIGHTS.exercise * 0.6);
  } else if (minutes >= 10) {
    baseScore = Math.round(WEIGHTS.exercise * 0.4);
  } else {
    baseScore = Math.round(WEIGHTS.exercise * (minutes / 30));
  }
  
  // Bonus for varied exercise types
  const typeMultiplier = {
    cardio: 1.0,
    strength: 1.0,
    yoga: 0.95,
    sports: 1.05,
    none: 0,
  };
  
  return Math.min(WEIGHTS.exercise, Math.round(baseScore * (typeMultiplier[type as keyof typeof typeMultiplier] || 1)));
}

// Calculate steps score (15 points max)
// Target: 10,000 steps
function calculateStepsScore(steps: number): number {
  if (steps >= 10000) {
    return WEIGHTS.steps;
  } else if (steps >= 7500) {
    return Math.round(WEIGHTS.steps * 0.85);
  } else if (steps >= 5000) {
    return Math.round(WEIGHTS.steps * 0.7);
  } else if (steps >= 2500) {
    return Math.round(WEIGHTS.steps * 0.5);
  } else {
    return Math.round(WEIGHTS.steps * (steps / 10000));
  }
}

// Calculate water score (10 points max)
// Target: 8 glasses
function calculateWaterScore(glasses: number): number {
  if (glasses >= 8) {
    return WEIGHTS.water;
  } else if (glasses >= 6) {
    return Math.round(WEIGHTS.water * 0.8);
  } else if (glasses >= 4) {
    return Math.round(WEIGHTS.water * 0.6);
  } else {
    return Math.round(WEIGHTS.water * (glasses / 8));
  }
}

// Calculate medication adherence score (20 points max)
function calculateMedicationScore(taken: string[], prescribed: string[]): number {
  if (prescribed.length === 0) {
    return WEIGHTS.medication; // No medications = full score
  }
  
  const adherenceRate = taken.length / prescribed.length;
  return Math.round(WEIGHTS.medication * adherenceRate);
}

// Calculate nutrition score (10 points max)
function calculateNutritionScore(meals: { breakfast: boolean; lunch: boolean; dinner: boolean }): number {
  const mealsLogged = [meals.breakfast, meals.lunch, meals.dinner].filter(Boolean).length;
  return Math.round(WEIGHTS.nutrition * (mealsLogged / 3));
}

// Get rating based on total score
function getRating(score: number): 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement' {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Needs Improvement';
}

// Get color based on rating
function getColor(rating: string): string {
  switch (rating) {
    case 'Excellent':
      return 'hsl(142, 76%, 36%)'; // Green
    case 'Good':
      return 'hsl(199, 89%, 48%)'; // Blue
    case 'Fair':
      return 'hsl(45, 93%, 47%)'; // Yellow/Orange
    case 'Needs Improvement':
      return 'hsl(0, 84%, 60%)'; // Red
    default:
      return 'hsl(215, 20%, 65%)'; // Gray
  }
}

// Main function to calculate health score
export function calculateHealthScore(data: DailyHealthData): HealthScoreResult {
  const breakdown: ScoreBreakdown = {
    sleep: calculateSleepScore(data.sleep),
    exercise: calculateExerciseScore(data.exercise.minutes, data.exercise.type),
    steps: calculateStepsScore(data.steps),
    water: calculateWaterScore(data.water),
    medication: calculateMedicationScore(data.medications.taken, data.medications.prescribed),
    nutrition: calculateNutritionScore(data.meals),
  };

  const totalScore = Object.values(breakdown).reduce((sum, score) => sum + score, 0);
  const rating = getRating(totalScore);
  const color = getColor(rating);

  return {
    totalScore,
    breakdown,
    rating,
    color,
  };
}

// Export weights for display purposes
export const SCORE_WEIGHTS = WEIGHTS;
