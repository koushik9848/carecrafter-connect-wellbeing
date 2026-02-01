import { useState, useEffect } from 'react';
import { DailyHealthData, HealthScoreResult, calculateHealthScore } from '@/lib/healthScoreAlgorithm';

const STORAGE_KEY = 'health-tracker-data';

export interface HealthEntry extends DailyHealthData {
  date: string;
  score?: HealthScoreResult;
}

const getDefaultData = (): DailyHealthData => ({
  sleep: 0,
  exercise: { minutes: 0, type: 'none' },
  steps: 0,
  water: 0,
  meals: { breakfast: false, lunch: false, dinner: false },
  medications: { taken: [], prescribed: [] },
  mood: undefined,
  notes: '',
});

export function useHealthTracker() {
  const [entries, setEntries] = useState<Record<string, HealthEntry>>({});
  const [currentData, setCurrentData] = useState<DailyHealthData>(getDefaultData());
  const [prescribedMedications, setPrescribedMedications] = useState<string[]>([]);

  const today = new Date().toISOString().split('T')[0];

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setEntries(parsed.entries || {});
      setPrescribedMedications(parsed.prescribedMedications || []);
      
      // Load today's data if exists
      if (parsed.entries?.[today]) {
        setCurrentData(parsed.entries[today]);
      }
    }
  }, [today]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      entries,
      prescribedMedications,
    }));
  }, [entries, prescribedMedications]);

  const updateCurrentData = (updates: Partial<DailyHealthData>) => {
    setCurrentData(prev => ({ ...prev, ...updates }));
  };

  const saveEntry = () => {
    const dataWithMeds = {
      ...currentData,
      medications: {
        ...currentData.medications,
        prescribed: prescribedMedications,
      },
    };
    
    const score = calculateHealthScore(dataWithMeds);
    const entry: HealthEntry = {
      ...dataWithMeds,
      date: today,
      score,
    };
    
    setEntries(prev => ({
      ...prev,
      [today]: entry,
    }));
    
    return score;
  };

  const getCurrentScore = (): HealthScoreResult => {
    const dataWithMeds = {
      ...currentData,
      medications: {
        ...currentData.medications,
        prescribed: prescribedMedications,
      },
    };
    return calculateHealthScore(dataWithMeds);
  };

  const addPrescribedMedication = (med: string) => {
    if (med.trim() && !prescribedMedications.includes(med.trim())) {
      setPrescribedMedications(prev => [...prev, med.trim()]);
    }
  };

  const removePrescribedMedication = (med: string) => {
    setPrescribedMedications(prev => prev.filter(m => m !== med));
    setCurrentData(prev => ({
      ...prev,
      medications: {
        ...prev.medications,
        taken: prev.medications.taken.filter(m => m !== med),
      },
    }));
  };

  const toggleMedicationTaken = (med: string) => {
    setCurrentData(prev => ({
      ...prev,
      medications: {
        ...prev.medications,
        taken: prev.medications.taken.includes(med)
          ? prev.medications.taken.filter(m => m !== med)
          : [...prev.medications.taken, med],
      },
    }));
  };

  const resetToday = () => {
    setCurrentData(getDefaultData());
  };

  return {
    currentData,
    updateCurrentData,
    entries,
    today,
    saveEntry,
    getCurrentScore,
    prescribedMedications,
    addPrescribedMedication,
    removePrescribedMedication,
    toggleMedicationTaken,
    resetToday,
  };
}
