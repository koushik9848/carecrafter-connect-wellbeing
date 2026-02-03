import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Lightbulb } from 'lucide-react';
import { Moon, Dumbbell, Footprints, Droplets, Pill, Utensils } from 'lucide-react';

interface ComponentAnalysis {
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

interface ComponentAnalysisCardProps {
  analysis: ComponentAnalysis;
}

const METRIC_CONFIG = {
  sleep: { icon: Moon, label: 'Sleep Analysis', color: 'text-purple-500' },
  exercise: { icon: Dumbbell, label: 'Exercise Analysis', color: 'text-green-500' },
  steps: { icon: Footprints, label: 'Steps Analysis', color: 'text-amber-500' },
  water: { icon: Droplets, label: 'Water Intake Analysis', color: 'text-cyan-500' },
  medication: { icon: Pill, label: 'Medication Adherence', color: 'text-red-500' },
  nutrition: { icon: Utensils, label: 'Nutrition Analysis', color: 'text-pink-500' },
};

export function ComponentAnalysisCard({ analysis }: ComponentAnalysisCardProps) {
  const config = METRIC_CONFIG[analysis.metric];
  const Icon = config.icon;
  const percentage = Math.round((analysis.daysMetTarget / analysis.totalDays) * 100);
  const isPositiveTrend = analysis.trend >= 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 text-lg ${config.color}`}>
          <Icon className="h-5 w-5" />
          {config.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Average:</span>
            <p className="font-semibold">{analysis.average.toFixed(1)} {analysis.unit}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Target:</span>
            <p className="font-semibold">{analysis.target}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Best:</span>
            <p className="font-semibold">{analysis.best.value.toFixed(1)} {analysis.unit} ({analysis.best.date})</p>
          </div>
          <div>
            <span className="text-muted-foreground">Worst:</span>
            <p className="font-semibold">{analysis.worst.value.toFixed(1)} {analysis.unit} ({analysis.worst.date})</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Days Meeting Target</span>
            <span>{analysis.daysMetTarget}/{analysis.totalDays} ({percentage}%)</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="flex items-center gap-2 text-sm">
          {isPositiveTrend ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : analysis.trend === 0 ? (
            <Minus className="h-4 w-4 text-gray-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={isPositiveTrend ? 'text-green-500' : analysis.trend === 0 ? 'text-gray-500' : 'text-red-500'}>
            {isPositiveTrend ? '+' : ''}{analysis.trend.toFixed(1)}% vs. previous period
          </span>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
            <p className="text-sm">{analysis.insight}</p>
          </div>
        </div>

        {analysis.alert && (
          <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <p className="text-sm">{analysis.alert}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
