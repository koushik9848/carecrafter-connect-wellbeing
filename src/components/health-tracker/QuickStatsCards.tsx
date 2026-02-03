import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Trophy, Flame, BarChart3 } from 'lucide-react';

interface QuickStatsCardsProps {
  avgScore: number;
  bestScore: { score: number; date: string };
  streak: number;
  trend: number;
}

function getScoreRating(score: number): { label: string; color: string } {
  if (score >= 85) return { label: 'Excellent', color: 'text-green-500' };
  if (score >= 70) return { label: 'Good', color: 'text-blue-500' };
  if (score >= 50) return { label: 'Fair', color: 'text-yellow-500' };
  return { label: 'Needs Improvement', color: 'text-red-500' };
}

export function QuickStatsCards({ avgScore, bestScore, streak, trend }: QuickStatsCardsProps) {
  const rating = getScoreRating(avgScore);
  const isPositiveTrend = trend >= 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Average Score */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Average Score</span>
          </div>
          <p className="text-3xl font-bold">{Math.round(avgScore)}/100</p>
          <p className={`text-sm ${rating.color}`}>{rating.label}</p>
        </CardContent>
      </Card>

      {/* Best Day */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Best Day</span>
          </div>
          <p className="text-3xl font-bold">{bestScore.score}/100</p>
          <p className="text-sm text-muted-foreground">{bestScore.date}</p>
        </CardContent>
      </Card>

      {/* Current Streak */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Streak</span>
          </div>
          <p className="text-3xl font-bold">{streak} days</p>
          <p className="text-sm text-muted-foreground">Current</p>
        </CardContent>
      </Card>

      {/* Trend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            {isPositiveTrend ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm font-medium">Trend</span>
          </div>
          <p className={`text-3xl font-bold ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
            {isPositiveTrend ? '↑' : '↓'} {Math.abs(Math.round(trend))}%
          </p>
          <p className="text-sm text-muted-foreground">vs Previous Period</p>
        </CardContent>
      </Card>
    </div>
  );
}
