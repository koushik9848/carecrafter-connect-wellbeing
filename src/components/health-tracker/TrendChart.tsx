import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format } from 'date-fns';

interface DailyData {
  date: string;
  totalScore: number;
  sleep: number;
  exercise: number;
  steps: number;
  water: number;
  medication: number;
  nutrition: number;
}

interface TrendChartProps {
  data: DailyData[];
}

const METRIC_COLORS = {
  totalScore: '#2563EB',
  sleep: '#8B5CF6',
  exercise: '#10B981',
  steps: '#F59E0B',
  water: '#06B6D4',
  medication: '#EF4444',
  nutrition: '#EC4899',
};

const METRIC_LABELS = {
  totalScore: 'Overall',
  sleep: 'Sleep',
  exercise: 'Exercise',
  steps: 'Steps',
  water: 'Water',
  medication: 'Medication',
  nutrition: 'Nutrition',
};

type MetricKey = keyof typeof METRIC_COLORS;

export function TrendChart({ data }: TrendChartProps) {
  const [visibleMetrics, setVisibleMetrics] = useState<Set<MetricKey>>(
    new Set(['totalScore', 'sleep', 'exercise'])
  );

  const toggleMetric = (metric: MetricKey) => {
    const newVisible = new Set(visibleMetrics);
    if (newVisible.has(metric)) {
      // Don't allow removing all metrics
      if (newVisible.size > 1) {
        newVisible.delete(metric);
      }
    } else {
      newVisible.add(metric);
    }
    setVisibleMetrics(newVisible);
  };

  const formattedData = data.map((d) => ({
    ...d,
    displayDate: format(new Date(d.date), 'MMM d'),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Score Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              {(Object.keys(METRIC_COLORS) as MetricKey[]).map((metric) =>
                visibleMetrics.has(metric) ? (
                  <Line
                    key={metric}
                    type="monotone"
                    dataKey={metric}
                    stroke={METRIC_COLORS[metric]}
                    strokeWidth={metric === 'totalScore' ? 3 : 2}
                    dot={false}
                    name={METRIC_LABELS[metric]}
                  />
                ) : null
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {(Object.keys(METRIC_COLORS) as MetricKey[]).map((metric) => (
            <Button
              key={metric}
              variant={visibleMetrics.has(metric) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleMetric(metric)}
              style={{
                backgroundColor: visibleMetrics.has(metric) ? METRIC_COLORS[metric] : undefined,
                borderColor: METRIC_COLORS[metric],
                color: visibleMetrics.has(metric) ? 'white' : METRIC_COLORS[metric],
              }}
            >
              {METRIC_LABELS[metric]}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
