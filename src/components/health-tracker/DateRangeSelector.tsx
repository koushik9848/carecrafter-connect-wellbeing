import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';

export type DateRange = {
  startDate: Date;
  endDate: Date;
  label: string;
};

interface DateRangeSelectorProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

const presetRanges = [
  { label: 'Last 7 Days', days: 7 },
  { label: 'Last 30 Days', days: 30 },
  { label: 'Last 90 Days', days: 90 },
  { label: 'All Time', days: 365 },
];

export function DateRangeSelector({ selectedRange, onRangeChange }: DateRangeSelectorProps) {
  const [customStart, setCustomStart] = React.useState<Date | undefined>();
  const [customEnd, setCustomEnd] = React.useState<Date | undefined>();
  const [showCustom, setShowCustom] = React.useState(false);

  const handlePresetClick = (days: number, label: string) => {
    const endDate = startOfDay(new Date());
    const startDate = subDays(endDate, days - 1);
    onRangeChange({ startDate, endDate, label });
    setShowCustom(false);
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onRangeChange({
        startDate: customStart,
        endDate: customEnd,
        label: 'Custom Range',
      });
      setShowCustom(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {presetRanges.map(({ label, days }) => (
          <Button
            key={label}
            variant={selectedRange.label === label ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick(days, label)}
          >
            {label}
          </Button>
        ))}
        <Popover open={showCustom} onOpenChange={setShowCustom}>
          <PopoverTrigger asChild>
            <Button
              variant={selectedRange.label === 'Custom Range' ? 'default' : 'outline'}
              size="sm"
              className="gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Custom
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Start Date</p>
                  <Calendar
                    mode="single"
                    selected={customStart}
                    onSelect={setCustomStart}
                    disabled={(date) => date > new Date()}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">End Date</p>
                  <Calendar
                    mode="single"
                    selected={customEnd}
                    onSelect={setCustomEnd}
                    disabled={(date) => date > new Date() || (customStart && date < customStart)}
                  />
                </div>
              </div>
              <Button onClick={handleCustomApply} className="w-full" disabled={!customStart || !customEnd}>
                Apply Range
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <p className="text-sm text-muted-foreground">
        📅 Analyzing: {format(selectedRange.startDate, 'MMM d, yyyy')} - {format(selectedRange.endDate, 'MMM d, yyyy')}
        {' '}({Math.ceil((selectedRange.endDate.getTime() - selectedRange.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days)
      </p>
    </div>
  );
}
