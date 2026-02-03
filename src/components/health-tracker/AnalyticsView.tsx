import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { DateRangeSelector, DateRange } from './DateRangeSelector';
import { QuickStatsCards } from './QuickStatsCards';
import { TrendChart } from './TrendChart';
import { ComponentAnalysisCard } from './ComponentAnalysisCard';
import { PatternsInsights } from './PatternsInsights';
import { HealthReportModal } from './HealthReportModal';
import { calculateAnalytics, generateReportData } from '@/lib/analyticsCalculations';
import { FileText, Loader2 } from 'lucide-react';
import { subDays, startOfDay } from 'date-fns';
import type { HealthEntry } from '@/hooks/useHealthTracker';

interface AnalyticsViewProps {
  entries: Record<string, HealthEntry>;
}

export function AnalyticsView({ entries }: AnalyticsViewProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: subDays(startOfDay(new Date()), 29),
    endDate: startOfDay(new Date()),
    label: 'Last 30 Days',
  });
  const [showReport, setShowReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const analytics = useMemo(() => {
    return calculateAnalytics(entries, dateRange.startDate, dateRange.endDate);
  }, [entries, dateRange]);

  const reportData = useMemo(() => {
    if (!showReport) return null;
    return generateReportData(entries, dateRange.startDate, dateRange.endDate);
  }, [entries, dateRange, showReport]);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate loading for better UX
    setTimeout(() => {
      setShowReport(true);
      setIsGenerating(false);
    }, 500);
  };

  const hasData = analytics.dailyData.length > 0;

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2">No Analytics Data Yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Start tracking your daily health metrics in the "Today" tab to see comprehensive analytics and insights here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />

      {/* Quick Stats Cards */}
      <QuickStatsCards
        avgScore={analytics.avgScore}
        bestScore={analytics.bestScore}
        streak={analytics.streak}
        trend={analytics.trend}
      />

      {/* Trend Chart */}
      <TrendChart data={analytics.dailyData} />

      {/* Component Analysis Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Component Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(analytics.componentAnalysis).map((analysis) => (
            <ComponentAnalysisCard key={analysis.metric} analysis={analysis} />
          ))}
        </div>
      </div>

      {/* Patterns & Insights */}
      <PatternsInsights patterns={analytics.patterns} />

      {/* Generate Report Button */}
      <div className="flex flex-col items-center gap-4 py-6">
        <Button
          size="lg"
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <FileText className="h-5 w-5" />
              Generate Full Health Report
            </>
          )}
        </Button>
      </div>

      {/* Health Report Modal */}
      <HealthReportModal
        open={showReport}
        onOpenChange={setShowReport}
        reportData={reportData}
      />
    </div>
  );
}
