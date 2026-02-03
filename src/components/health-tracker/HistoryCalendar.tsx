import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import type { HealthEntry } from '@/hooks/useHealthTracker';

interface HistoryCalendarProps {
  entries: Record<string, HealthEntry>;
}

function getScoreColor(score: number | undefined): string {
  if (!score) return 'bg-gray-100 dark:bg-gray-800';
  if (score >= 85) return 'bg-green-500';
  if (score >= 70) return 'bg-yellow-400';
  if (score >= 50) return 'bg-orange-400';
  return 'bg-red-400';
}

function getScoreLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Needs Improvement';
}

export function HistoryCalendar({ entries }: HistoryCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<HealthEntry | null>(null);
  const [showModal, setShowModal] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get day of week for the first day (0 = Sunday)
  const startDayOfWeek = monthStart.getDay();

  const handleDayClick = (dateStr: string) => {
    const entry = entries[dateStr];
    if (entry) {
      setSelectedEntry(entry);
      setShowModal(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Health History
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[140px] text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the first of month */}
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-16" />
          ))}

          {/* Days of the month */}
          {days.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const entry = entries[dateStr];
            const score = entry?.score?.totalScore;
            const hasData = !!entry;

            return (
              <button
                key={dateStr}
                onClick={() => handleDayClick(dateStr)}
                disabled={!hasData}
                className={`
                  h-16 rounded-lg border flex flex-col items-center justify-center gap-1
                  transition-all duration-200
                  ${hasData ? 'cursor-pointer hover:ring-2 ring-primary' : 'cursor-default'}
                  ${!isSameMonth(day, currentMonth) ? 'opacity-50' : ''}
                `}
              >
                <span className="text-sm">{format(day, 'd')}</span>
                {hasData && score !== undefined && (
                  <>
                    <div className={`w-8 h-8 rounded-full ${getScoreColor(score)} flex items-center justify-center text-white text-xs font-bold`}>
                      {score}
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span>Excellent (85-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400" />
            <span>Good (70-84)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-400" />
            <span>Fair (50-69)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-400" />
            <span>Needs Improvement (&lt;50)</span>
          </div>
        </div>
      </CardContent>

      {/* Day Detail Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedEntry ? format(new Date(selectedEntry.date), 'EEEE, MMMM d, yyyy') : ''}
            </DialogTitle>
          </DialogHeader>
          {selectedEntry && selectedEntry.score && (
            <div className="space-y-4">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(selectedEntry.score.totalScore)} text-white text-2xl font-bold`}>
                  {selectedEntry.score.totalScore}
                </div>
                <p className="mt-2 font-medium">{getScoreLabel(selectedEntry.score.totalScore)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Sleep</p>
                  <p className="font-semibold">{selectedEntry.sleep} hours</p>
                  <p className="text-xs text-muted-foreground">Score: {selectedEntry.score.breakdown.sleep}/25</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Exercise</p>
                  <p className="font-semibold">{selectedEntry.exercise.minutes} min ({selectedEntry.exercise.type})</p>
                  <p className="text-xs text-muted-foreground">Score: {selectedEntry.score.breakdown.exercise}/20</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Steps</p>
                  <p className="font-semibold">{selectedEntry.steps.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Score: {selectedEntry.score.breakdown.steps}/15</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Water</p>
                  <p className="font-semibold">{selectedEntry.water} glasses</p>
                  <p className="text-xs text-muted-foreground">Score: {selectedEntry.score.breakdown.water}/10</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Medication</p>
                  <p className="font-semibold">
                    {selectedEntry.medications.taken.length}/{selectedEntry.medications.prescribed.length} taken
                  </p>
                  <p className="text-xs text-muted-foreground">Score: {selectedEntry.score.breakdown.medication}/20</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Nutrition</p>
                  <p className="font-semibold">
                    {[selectedEntry.meals.breakfast, selectedEntry.meals.lunch, selectedEntry.meals.dinner].filter(Boolean).length}/3 meals
                  </p>
                  <p className="text-xs text-muted-foreground">Score: {selectedEntry.score.breakdown.nutrition}/10</p>
                </div>
              </div>

              {selectedEntry.mood && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Mood</p>
                  <p className="font-semibold capitalize">{selectedEntry.mood}</p>
                </div>
              )}

              {selectedEntry.notes && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground">Notes</p>
                  <p className="text-sm">{selectedEntry.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
