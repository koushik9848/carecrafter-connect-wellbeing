import React from 'react';
import { HealthScoreResult, SCORE_WEIGHTS } from '@/lib/healthScoreAlgorithm';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Dumbbell, Footprints, Droplets, Pill, Utensils } from 'lucide-react';

interface HealthScoreDisplayProps {
  score: HealthScoreResult;
}

const categoryIcons = {
  sleep: Moon,
  exercise: Dumbbell,
  steps: Footprints,
  water: Droplets,
  medication: Pill,
  nutrition: Utensils,
};

const categoryLabels = {
  sleep: 'Sleep',
  exercise: 'Exercise',
  steps: 'Steps',
  water: 'Hydration',
  medication: 'Medications',
  nutrition: 'Nutrition',
};

export function HealthScoreDisplay({ score }: HealthScoreDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg font-medium text-muted-foreground">Your Health Score</CardTitle>
        <div className="flex flex-col items-center gap-2">
          <div 
            className="text-6xl font-bold"
            style={{ color: score.color }}
          >
            {score.totalScore}
          </div>
          <span 
            className="text-xl font-semibold px-4 py-1 rounded-full"
            style={{ 
              backgroundColor: `${score.color}20`,
              color: score.color 
            }}
          >
            {score.rating}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h4 className="font-medium text-sm text-muted-foreground text-center">Score Breakdown</h4>
        <div className="space-y-3">
          {(Object.keys(score.breakdown) as Array<keyof typeof score.breakdown>).map((key) => {
            const Icon = categoryIcons[key];
            const maxScore = SCORE_WEIGHTS[key];
            const currentScore = score.breakdown[key];
            const percentage = (currentScore / maxScore) * 100;
            
            return (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{categoryLabels[key]}</span>
                  </div>
                  <span className="font-medium">{currentScore}/{maxScore}</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
