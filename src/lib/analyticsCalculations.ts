import { HealthEntry } from '@/hooks/useHealthTracker';
import { format, subDays, isWeekend, getDay } from 'date-fns';

export interface AnalyticsData {
  avgScore: number;
  bestScore: { score: number; date: string };
  streak: number;
  trend: number;
  dailyData: Array<{
    date: string;
    totalScore: number;
    sleep: number;
    exercise: number;
    steps: number;
    water: number;
    medication: number;
    nutrition: number;
  }>;
  componentAnalysis: {
    sleep: ComponentAnalysisData;
    exercise: ComponentAnalysisData;
    steps: ComponentAnalysisData;
    water: ComponentAnalysisData;
    medication: ComponentAnalysisData;
    nutrition: ComponentAnalysisData;
  };
  patterns: {
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  };
}

export interface ComponentAnalysisData {
  metric: 'sleep' | 'exercise' | 'steps' | 'water' | 'medication' | 'nutrition';
  average: number;
  target: string;
  unit: string;
  best: { value: number; date: string };
  worst: { value: number; date: string };
  daysMetTarget: number;
  totalDays: number;
  trend: number;
  insight: string;
  alert?: string;
}

const TARGETS = {
  sleep: { min: 7, max: 9, unit: 'hrs/night', target: '7-9 hours' },
  exercise: { min: 30, max: 300, unit: 'min', target: '30+ min' },
  steps: { min: 10000, max: 50000, unit: 'steps', target: '10,000' },
  water: { min: 8, max: 12, unit: 'glasses', target: '8 glasses' },
  medication: { min: 100, max: 100, unit: '%', target: '100%' },
  nutrition: { min: 100, max: 100, unit: '%', target: '3 meals' },
};

export function calculateAnalytics(
  entries: Record<string, HealthEntry>,
  startDate: Date,
  endDate: Date
): AnalyticsData {
  // Format dates for comparison (YYYY-MM-DD strings)
  const startDateStr = format(startDate, 'yyyy-MM-dd');
  const endDateStr = format(endDate, 'yyyy-MM-dd');
  
  // Filter entries within date range using string comparison to avoid timezone issues
  const filteredEntries = Object.entries(entries)
    .filter(([date]) => {
      return date >= startDateStr && date <= endDateStr;
    })
    .sort(([a], [b]) => a.localeCompare(b));

  if (filteredEntries.length === 0) {
    return getEmptyAnalytics();
  }

  const entriesArray = filteredEntries.map(([date, entry]) => ({ date, ...entry }));

  // Calculate average score
  const avgScore = entriesArray.reduce((sum, e) => sum + (e.score?.totalScore || 0), 0) / entriesArray.length;

  // Find best day
  const bestEntry = entriesArray.reduce((best, current) =>
    (current.score?.totalScore || 0) > (best.score?.totalScore || 0) ? current : best
  );

  // Calculate streak (consecutive days with score >= 70)
  let streak = 0;
  for (let i = entriesArray.length - 1; i >= 0; i--) {
    if ((entriesArray[i].score?.totalScore || 0) >= 70) {
      streak++;
    } else {
      break;
    }
  }

  // Calculate trend vs previous period
  const periodLength = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const prevStartDate = subDays(startDate, periodLength);
  const prevEndDate = subDays(startDate, 1);

  const prevStartDateStr = format(prevStartDate, 'yyyy-MM-dd');
  const prevEndDateStr = format(prevEndDate, 'yyyy-MM-dd');
  
  const prevEntries = Object.entries(entries)
    .filter(([date]) => {
      return date >= prevStartDateStr && date <= prevEndDateStr;
    });

  const prevAvg = prevEntries.length > 0
    ? prevEntries.reduce((sum, [, e]) => sum + (e.score?.totalScore || 0), 0) / prevEntries.length
    : avgScore;

  const trend = prevAvg > 0 ? ((avgScore - prevAvg) / prevAvg) * 100 : 0;

  // Build daily data for chart
  const dailyData = entriesArray.map((e) => ({
    date: e.date,
    totalScore: e.score?.totalScore || 0,
    sleep: e.score?.breakdown.sleep || 0,
    exercise: e.score?.breakdown.exercise || 0,
    steps: e.score?.breakdown.steps || 0,
    water: e.score?.breakdown.water || 0,
    medication: e.score?.breakdown.medication || 0,
    nutrition: e.score?.breakdown.nutrition || 0,
  }));

  // Calculate component analysis
  const componentAnalysis = {
    sleep: calculateComponentAnalysis(entriesArray, 'sleep', prevEntries.map(([, e]) => e)),
    exercise: calculateComponentAnalysis(entriesArray, 'exercise', prevEntries.map(([, e]) => e)),
    steps: calculateComponentAnalysis(entriesArray, 'steps', prevEntries.map(([, e]) => e)),
    water: calculateComponentAnalysis(entriesArray, 'water', prevEntries.map(([, e]) => e)),
    medication: calculateComponentAnalysis(entriesArray, 'medication', prevEntries.map(([, e]) => e)),
    nutrition: calculateComponentAnalysis(entriesArray, 'nutrition', prevEntries.map(([, e]) => e)),
  };

  // Detect patterns
  const patterns = detectPatterns(entriesArray);

  return {
    avgScore,
    bestScore: {
      score: bestEntry.score?.totalScore || 0,
      date: format(new Date(bestEntry.date), 'MMM d'),
    },
    streak,
    trend,
    dailyData,
    componentAnalysis,
    patterns,
  };
}

function getMetricValue(entry: HealthEntry, metric: string): number {
  switch (metric) {
    case 'sleep':
      return entry.sleep;
    case 'exercise':
      return entry.exercise.minutes;
    case 'steps':
      return entry.steps;
    case 'water':
      return entry.water;
    case 'medication':
      if (entry.medications.prescribed.length === 0) return 100;
      return (entry.medications.taken.length / entry.medications.prescribed.length) * 100;
    case 'nutrition':
      const meals = [entry.meals.breakfast, entry.meals.lunch, entry.meals.dinner].filter(Boolean).length;
      return (meals / 3) * 100;
    default:
      return 0;
  }
}

function calculateComponentAnalysis(
  entries: Array<HealthEntry & { date: string }>,
  metric: 'sleep' | 'exercise' | 'steps' | 'water' | 'medication' | 'nutrition',
  prevEntries: HealthEntry[]
): ComponentAnalysisData {
  const target = TARGETS[metric];
  const values = entries.map((e) => ({
    value: getMetricValue(e, metric),
    date: e.date,
  }));

  const average = values.reduce((sum, v) => sum + v.value, 0) / values.length;

  const best = values.reduce((b, c) => (c.value > b.value ? c : b));
  const worst = values.reduce((w, c) => (c.value < w.value ? c : w));

  let daysMetTarget = 0;
  if (metric === 'sleep') {
    daysMetTarget = values.filter((v) => v.value >= 7 && v.value <= 9).length;
  } else if (metric === 'medication' || metric === 'nutrition') {
    daysMetTarget = values.filter((v) => v.value >= 100).length;
  } else {
    daysMetTarget = values.filter((v) => v.value >= target.min).length;
  }

  // Calculate trend
  const prevAvg = prevEntries.length > 0
    ? prevEntries.reduce((sum, e) => sum + getMetricValue(e, metric), 0) / prevEntries.length
    : average;
  const trend = prevAvg > 0 ? ((average - prevAvg) / prevAvg) * 100 : 0;

  // Generate insight
  const { insight, alert } = generateInsight(metric, average, daysMetTarget / values.length);

  return {
    metric,
    average,
    target: target.target,
    unit: target.unit,
    best: { value: best.value, date: format(new Date(best.date), 'MMM d') },
    worst: { value: worst.value, date: format(new Date(worst.date), 'MMM d') },
    daysMetTarget,
    totalDays: values.length,
    trend,
    insight,
    alert,
  };
}

function generateInsight(metric: string, average: number, targetPercentage: number): { insight: string; alert?: string } {
  const percentage = Math.round(targetPercentage * 100);

  switch (metric) {
    case 'sleep':
      if (average >= 7 && average <= 9 && percentage >= 80) {
        return { insight: 'Excellent sleep consistency! Keep up the great work.' };
      } else if (average < 6) {
        return {
          insight: 'Sleep duration is below the recommended 7-9 hours.',
          alert: 'Try setting a consistent bedtime to improve sleep quality.',
        };
      } else if (average > 9) {
        return { insight: 'You might be oversleeping. Consider a more consistent schedule.' };
      }
      return { insight: 'Your sleep pattern is developing. Aim for 7-9 hours consistently.' };

    case 'exercise':
      if (average >= 30 && percentage >= 80) {
        return { insight: 'Outstanding exercise routine! You\'re meeting daily targets.' };
      } else if (average < 15) {
        return {
          insight: 'Exercise levels are low.',
          alert: 'Start with 15-minute walks to build a habit.',
        };
      }
      return { insight: 'Good effort! Try to reach 30 minutes daily for optimal health.' };

    case 'steps':
      if (average >= 10000) {
        return { insight: 'Excellent step count! You\'re highly active.' };
      } else if (average < 5000) {
        return {
          insight: 'Step count is below recommended levels.',
          alert: 'Try taking short walks during breaks.',
        };
      }
      return { insight: 'Good progress! Aim for 10,000 steps daily.' };

    case 'water':
      if (average >= 8) {
        return { insight: 'Great hydration habits!' };
      } else if (average < 6) {
        return {
          insight: 'Water intake is below target.',
          alert: 'Set hourly reminders to drink water.',
        };
      }
      return { insight: 'Almost there! Try adding one more glass daily.' };

    case 'medication':
      if (percentage >= 95) {
        return { insight: 'Excellent medication adherence! Keep it up.' };
      } else if (percentage < 80) {
        return {
          insight: 'Medication adherence needs improvement.',
          alert: 'Set daily alarms to remind you to take medications.',
        };
      }
      return { insight: 'Good medication tracking. Aim for 100% adherence.' };

    case 'nutrition':
      if (percentage >= 90) {
        return { insight: 'Consistent meal logging! Great job.' };
      } else if (percentage < 60) {
        return {
          insight: 'Meal logging is inconsistent.',
          alert: 'Enable meal reminders to improve tracking.',
        };
      }
      return { insight: 'Good progress on meal tracking. Try to log all 3 meals.' };

    default:
      return { insight: 'Keep tracking for more insights!' };
  }
}

function detectPatterns(entries: Array<HealthEntry & { date: string }>): {
  strengths: string[];
  improvements: string[];
  recommendations: string[];
} {
  const strengths: string[] = [];
  const improvements: string[] = [];
  const recommendations: string[] = [];

  if (entries.length < 3) {
    return { strengths, improvements, recommendations };
  }

  // Weekday vs Weekend analysis
  const weekdayEntries = entries.filter((e) => !isWeekend(new Date(e.date)));
  const weekendEntries = entries.filter((e) => isWeekend(new Date(e.date)));

  if (weekdayEntries.length > 0 && weekendEntries.length > 0) {
    const weekdayExercise = weekdayEntries.reduce((sum, e) => sum + e.exercise.minutes, 0) / weekdayEntries.length;
    const weekendExercise = weekendEntries.reduce((sum, e) => sum + e.exercise.minutes, 0) / weekendEntries.length;

    if (weekendExercise < weekdayExercise * 0.6 && weekdayExercise > 0) {
      const dropPercent = Math.round((1 - weekendExercise / weekdayExercise) * 100);
      improvements.push(`Weekend activity ${dropPercent}% lower than weekdays`);
      recommendations.push('Set weekend morning workout reminders');
    }

    const weekdaySteps = weekdayEntries.reduce((sum, e) => sum + e.steps, 0) / weekdayEntries.length;
    const weekendSteps = weekendEntries.reduce((sum, e) => sum + e.steps, 0) / weekendEntries.length;

    if (weekendSteps < weekdaySteps * 0.6 && weekdaySteps > 0) {
      improvements.push('Weekend steps significantly lower than weekdays');
      recommendations.push('Plan weekend outdoor activities');
    }
  }

  // Medication adherence check
  const medicationAdherence = entries.reduce((sum, e) => {
    if (e.medications.prescribed.length === 0) return sum + 100;
    return sum + (e.medications.taken.length / e.medications.prescribed.length) * 100;
  }, 0) / entries.length;

  if (medicationAdherence >= 95) {
    strengths.push(`Excellent medication adherence (${Math.round(medicationAdherence)}%)`);
  } else if (medicationAdherence < 80) {
    improvements.push(`Medication adherence at ${Math.round(medicationAdherence)}%`);
    recommendations.push('Set daily medication reminders');
  }

  // Sleep consistency
  const avgSleep = entries.reduce((sum, e) => sum + e.sleep, 0) / entries.length;
  const goodSleepDays = entries.filter((e) => e.sleep >= 7 && e.sleep <= 9).length;
  const sleepConsistency = (goodSleepDays / entries.length) * 100;

  if (sleepConsistency >= 80) {
    strengths.push(`Consistent sleep pattern (${Math.round(sleepConsistency)}% optimal)`);
  }

  // Water intake by day of week
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (let day = 0; day < 7; day++) {
    const dayEntries = entries.filter((e) => getDay(new Date(e.date)) === day);
    if (dayEntries.length > 0) {
      const avgWater = dayEntries.reduce((sum, e) => sum + e.water, 0) / dayEntries.length;
      if (avgWater < 6) {
        improvements.push(`${dayNames[day]} water intake below target (${avgWater.toFixed(1)} glasses)`);
        recommendations.push(`Prepare water bottle the night before ${dayNames[day]}`);
        break; // Only add one day-specific pattern
      }
    }
  }

  // Overall score trend
  const avgScore = entries.reduce((sum, e) => sum + (e.score?.totalScore || 0), 0) / entries.length;
  if (avgScore >= 80) {
    strengths.push('Consistently high health scores');
  }

  // Exercise variety
  const exerciseTypes = new Set(entries.filter((e) => e.exercise.minutes > 0).map((e) => e.exercise.type));
  if (exerciseTypes.size >= 3) {
    strengths.push('Diverse exercise routine with multiple activity types');
  }

  return { strengths, improvements, recommendations };
}

function getEmptyAnalytics(): AnalyticsData {
  return {
    avgScore: 0,
    bestScore: { score: 0, date: 'N/A' },
    streak: 0,
    trend: 0,
    dailyData: [],
    componentAnalysis: {
      sleep: createEmptyComponent('sleep'),
      exercise: createEmptyComponent('exercise'),
      steps: createEmptyComponent('steps'),
      water: createEmptyComponent('water'),
      medication: createEmptyComponent('medication'),
      nutrition: createEmptyComponent('nutrition'),
    },
    patterns: { strengths: [], improvements: [], recommendations: [] },
  };
}

function createEmptyComponent(metric: 'sleep' | 'exercise' | 'steps' | 'water' | 'medication' | 'nutrition'): ComponentAnalysisData {
  const target = TARGETS[metric];
  return {
    metric,
    average: 0,
    target: target.target,
    unit: target.unit,
    best: { value: 0, date: 'N/A' },
    worst: { value: 0, date: 'N/A' },
    daysMetTarget: 0,
    totalDays: 0,
    trend: 0,
    insight: 'Start tracking to see insights!',
  };
}

export function generateReportData(
  entries: Record<string, HealthEntry>,
  startDate: Date,
  endDate: Date
) {
  const analytics = calculateAnalytics(entries, startDate, endDate);
  const today = new Date().toISOString().split('T')[0];
  const currentEntry = entries[today];

  // Calculate best streak
  const sortedEntries = Object.entries(entries)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());

  let bestStreak = 0;
  let currentStreakCount = 0;
  for (const [, entry] of sortedEntries) {
    if ((entry.score?.totalScore || 0) >= 70) {
      currentStreakCount++;
      bestStreak = Math.max(bestStreak, currentStreakCount);
    } else {
      currentStreakCount = 0;
    }
  }

  // Count logged days using string comparison
  const startDateStr = format(startDate, 'yyyy-MM-dd');
  const endDateStr = format(endDate, 'yyyy-MM-dd');
  const daysLogged = Object.entries(entries)
    .filter(([date]) => {
      return date >= startDateStr && date <= endDateStr;
    }).length;

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Generate achievements
  const achievements: string[] = [];
  if (analytics.streak >= 7) achievements.push('7-Day Streak Champion');
  if (analytics.streak >= 14) achievements.push('14-Day Streak Warrior');
  if (analytics.avgScore >= 80) achievements.push('Health Excellence Badge');
  if (analytics.componentAnalysis.medication.daysMetTarget >= analytics.componentAnalysis.medication.totalDays * 0.95) {
    achievements.push('95%+ Medication Adherence');
  }
  if (analytics.componentAnalysis.steps.daysMetTarget >= 18) {
    achievements.push('10,000 Steps Club (18+ days)');
  }

  // Next milestone
  let nextMilestone = '30-Day Streak - Keep going!';
  if (analytics.streak >= 30) {
    nextMilestone = '60-Day Streak - You\'re on fire!';
  } else if (analytics.streak < 7) {
    nextMilestone = `7-Day Streak - Only ${7 - analytics.streak} days to go!`;
  } else if (analytics.streak < 14) {
    nextMilestone = `14-Day Streak - Only ${14 - analytics.streak} days to go!`;
  }

  return {
    generatedAt: new Date(),
    startDate,
    endDate,
    totalDays,
    currentScore: currentEntry?.score?.totalScore || analytics.avgScore,
    avgScore: analytics.avgScore,
    trend: analytics.trend,
    streak: analytics.streak,
    bestStreak,
    daysLogged,
    components: {
      sleep: {
        score: Math.round((analytics.componentAnalysis.sleep.average / 8) * 25),
        average: `${analytics.componentAnalysis.sleep.average.toFixed(1)} hours/night`,
        target: '7-9 hrs',
        best: `${analytics.componentAnalysis.sleep.best.value.toFixed(1)} hrs (${analytics.componentAnalysis.sleep.best.date})`,
        worst: `${analytics.componentAnalysis.sleep.worst.value.toFixed(1)} hrs (${analytics.componentAnalysis.sleep.worst.date})`,
        trend: analytics.componentAnalysis.sleep.trend,
        recommendation: analytics.componentAnalysis.sleep.insight,
      },
      exercise: {
        score: Math.round((Math.min(analytics.componentAnalysis.exercise.average, 30) / 30) * 20),
        average: `${analytics.componentAnalysis.exercise.average.toFixed(0)} min/day`,
        target: '30+ min',
        best: `${analytics.componentAnalysis.exercise.best.value.toFixed(0)} min (${analytics.componentAnalysis.exercise.best.date})`,
        worst: `${analytics.componentAnalysis.exercise.worst.value.toFixed(0)} min (${analytics.componentAnalysis.exercise.worst.date})`,
        trend: analytics.componentAnalysis.exercise.trend,
        recommendation: analytics.componentAnalysis.exercise.insight,
      },
      steps: {
        score: Math.round((Math.min(analytics.componentAnalysis.steps.average, 10000) / 10000) * 15),
        average: `${Math.round(analytics.componentAnalysis.steps.average).toLocaleString()} steps/day`,
        target: '10,000',
        best: `${Math.round(analytics.componentAnalysis.steps.best.value).toLocaleString()} (${analytics.componentAnalysis.steps.best.date})`,
        worst: `${Math.round(analytics.componentAnalysis.steps.worst.value).toLocaleString()} (${analytics.componentAnalysis.steps.worst.date})`,
        trend: analytics.componentAnalysis.steps.trend,
        recommendation: analytics.componentAnalysis.steps.insight,
      },
      water: {
        score: Math.round((Math.min(analytics.componentAnalysis.water.average, 8) / 8) * 10),
        average: `${analytics.componentAnalysis.water.average.toFixed(1)} glasses/day`,
        target: '8 glasses',
        best: `${analytics.componentAnalysis.water.best.value.toFixed(0)} (${analytics.componentAnalysis.water.best.date})`,
        worst: `${analytics.componentAnalysis.water.worst.value.toFixed(0)} (${analytics.componentAnalysis.water.worst.date})`,
        trend: analytics.componentAnalysis.water.trend,
        recommendation: analytics.componentAnalysis.water.insight,
      },
      medication: {
        score: Math.round((analytics.componentAnalysis.medication.average / 100) * 20),
        average: `${analytics.componentAnalysis.medication.average.toFixed(0)}% adherence`,
        target: '100%',
        best: `${analytics.componentAnalysis.medication.best.value.toFixed(0)}% (${analytics.componentAnalysis.medication.best.date})`,
        worst: `${analytics.componentAnalysis.medication.worst.value.toFixed(0)}% (${analytics.componentAnalysis.medication.worst.date})`,
        trend: analytics.componentAnalysis.medication.trend,
        recommendation: analytics.componentAnalysis.medication.insight,
      },
      nutrition: {
        score: Math.round((analytics.componentAnalysis.nutrition.average / 100) * 10),
        average: `${analytics.componentAnalysis.nutrition.average.toFixed(0)}% meals logged`,
        target: '3 meals',
        best: `${analytics.componentAnalysis.nutrition.best.value.toFixed(0)}% (${analytics.componentAnalysis.nutrition.best.date})`,
        worst: `${analytics.componentAnalysis.nutrition.worst.value.toFixed(0)}% (${analytics.componentAnalysis.nutrition.worst.date})`,
        trend: analytics.componentAnalysis.nutrition.trend,
        recommendation: analytics.componentAnalysis.nutrition.insight,
      },
    },
    strengths: analytics.patterns.strengths,
    improvements: analytics.patterns.improvements,
    recommendations: analytics.patterns.recommendations,
    achievements,
    nextMilestone,
  };
}
