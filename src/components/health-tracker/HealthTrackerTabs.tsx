import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, BarChart3, ClipboardList } from 'lucide-react';

interface HealthTrackerTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

export function HealthTrackerTabs({ activeTab, onTabChange, children }: HealthTrackerTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="today" className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          <span className="hidden sm:inline">Today</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span className="hidden sm:inline">History</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Analytics</span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}

export { TabsContent };
