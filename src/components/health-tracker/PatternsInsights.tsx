import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, Lightbulb, Search } from 'lucide-react';

interface PatternsData {
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}

interface PatternsInsightsProps {
  patterns: PatternsData;
}

export function PatternsInsights({ patterns }: PatternsInsightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Detected Patterns & Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Strengths */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-green-600 mb-3">
            <CheckCircle2 className="h-5 w-5" />
            Strengths
          </h4>
          {patterns.strengths.length > 0 ? (
            <ul className="space-y-2">
              {patterns.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Keep tracking to identify your strengths!
            </p>
          )}
        </div>

        {/* Areas for Improvement */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-amber-600 mb-3">
            <AlertTriangle className="h-5 w-5" />
            Areas for Improvement
          </h4>
          {patterns.improvements.length > 0 ? (
            <ul className="space-y-2">
              {patterns.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500">•</span>
                  {improvement}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Great job! No significant areas needing improvement.
            </p>
          )}
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-blue-600 mb-3">
            <Lightbulb className="h-5 w-5" />
            Personalized Recommendations
          </h4>
          {patterns.recommendations.length > 0 ? (
            <ol className="space-y-2">
              {patterns.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="font-semibold text-blue-500">{index + 1}.</span>
                  {recommendation}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">
              Continue tracking to receive personalized recommendations.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
