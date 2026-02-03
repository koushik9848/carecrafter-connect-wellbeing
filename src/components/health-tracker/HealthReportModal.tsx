import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Mail, Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { format } from 'date-fns';

interface ReportData {
  generatedAt: Date;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  currentScore: number;
  avgScore: number;
  trend: number;
  streak: number;
  bestStreak: number;
  daysLogged: number;
  components: {
    sleep: ComponentReport;
    exercise: ComponentReport;
    steps: ComponentReport;
    water: ComponentReport;
    medication: ComponentReport;
    nutrition: ComponentReport;
  };
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  achievements: string[];
  nextMilestone: string;
}

interface ComponentReport {
  score: number;
  average: string;
  target: string;
  best: string;
  worst: string;
  trend: number;
  recommendation: string;
}

interface HealthReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportData: ReportData | null;
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-500';
  if (score >= 70) return 'text-blue-500';
  if (score >= 50) return 'text-yellow-500';
  return 'text-red-500';
}

function getScoreLabel(score: number): string {
  if (score >= 85) return 'Excellent 🟢';
  if (score >= 70) return 'Good 🟡';
  if (score >= 50) return 'Fair 🟠';
  return 'Needs Improvement 🔴';
}

function TrendIndicator({ trend }: { trend: number }) {
  if (trend > 0) return <span className="text-green-500">↑ Improving (+{trend.toFixed(1)}%)</span>;
  if (trend < 0) return <span className="text-red-500">↓ Declining ({trend.toFixed(1)}%)</span>;
  return <span className="text-gray-500">→ Stable</span>;
}

export function HealthReportModal({ open, onOpenChange, reportData }: HealthReportModalProps) {
  if (!reportData) return null;

  const handleDownloadPDF = () => {
    // For now, we'll create a simple text export
    const content = `
COMPREHENSIVE HEALTH REPORT
Generated: ${format(reportData.generatedAt, 'PPP')} at ${format(reportData.generatedAt, 'p')}
Period: ${format(reportData.startDate, 'PPP')} - ${format(reportData.endDate, 'PPP')}
Total Days: ${reportData.totalDays}

EXECUTIVE SUMMARY
Current Score: ${reportData.currentScore}/100
Average Score: ${reportData.avgScore}/100
Trend: ${reportData.trend > 0 ? '+' : ''}${reportData.trend.toFixed(1)}%
Current Streak: ${reportData.streak} days
Days Logged: ${reportData.daysLogged}/${reportData.totalDays}

STRENGTHS
${reportData.strengths.map(s => `• ${s}`).join('\n')}

AREAS FOR IMPROVEMENT
${reportData.improvements.map(i => `• ${i}`).join('\n')}

RECOMMENDATIONS
${reportData.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-report-${format(reportData.generatedAt, 'yyyy-MM-dd')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Comprehensive Health Report
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Report Header */}
            <div className="text-sm text-muted-foreground">
              <p>Generated on: {format(reportData.generatedAt, 'PPP')} at {format(reportData.generatedAt, 'p')}</p>
              <p>Report Period: {format(reportData.startDate, 'PPP')} - {format(reportData.endDate, 'PPP')}</p>
              <p>Total Days: {reportData.totalDays} days</p>
            </div>

            <Separator />

            {/* Executive Summary */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Executive Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Current Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(reportData.currentScore)}`}>
                    {reportData.currentScore}/100
                  </p>
                  <p className="text-xs">{getScoreLabel(reportData.currentScore)}</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Average Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(reportData.avgScore)}`}>
                    {Math.round(reportData.avgScore)}/100
                  </p>
                  <p className="text-xs">{getScoreLabel(reportData.avgScore)}</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Trend</p>
                  <p className="text-2xl font-bold">
                    <TrendIndicator trend={reportData.trend} />
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold text-orange-500">{reportData.streak} days</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Best Streak</p>
                  <p className="text-2xl font-bold text-yellow-500">{reportData.bestStreak} days</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Days Logged</p>
                  <p className="text-2xl font-bold">
                    {reportData.daysLogged}/{reportData.totalDays}
                  </p>
                  <p className="text-xs">({Math.round((reportData.daysLogged / reportData.totalDays) * 100)}% compliance)</p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Component Breakdown */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Component Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(reportData.components).map(([key, comp]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <h4 className="font-semibold capitalize mb-2">
                      {key === 'medication' ? '💊 Medication' :
                       key === 'sleep' ? '😴 Sleep' :
                       key === 'exercise' ? '🏃 Exercise' :
                       key === 'steps' ? '👟 Steps' :
                       key === 'water' ? '💧 Water' : '🍽️ Nutrition'}
                      {' '}(Score: {comp.score}/100)
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>• Average: {comp.average} (Target: {comp.target})</p>
                      <p>• Best: {comp.best}</p>
                      <p>• Worst: {comp.worst}</p>
                      <p>• Trend: <TrendIndicator trend={comp.trend} /></p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      💡 {comp.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Insights & Patterns */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Insights & Patterns</h3>
              
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Key Strengths</h4>
                  <ul className="text-sm space-y-1">
                    {reportData.strengths.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">⚠️ Areas Requiring Attention</h4>
                  <ul className="text-sm space-y-1">
                    {reportData.improvements.map((i, idx) => (
                      <li key={idx}>• {i}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 Top Personalized Recommendations</h4>
                  <ol className="text-sm space-y-1">
                    {reportData.recommendations.map((r, i) => (
                      <li key={i}>{i + 1}. {r}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            <Separator />

            {/* Milestones & Achievements */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Milestones & Achievements
              </h3>
              
              <div className="space-y-2">
                <h4 className="font-medium">🏆 Achievements Unlocked:</h4>
                <ul className="text-sm space-y-1">
                  {reportData.achievements.map((a, i) => (
                    <li key={i}>✓ {a}</li>
                  ))}
                </ul>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    🎯 <strong>Next Milestone:</strong> {reportData.nextMilestone}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
