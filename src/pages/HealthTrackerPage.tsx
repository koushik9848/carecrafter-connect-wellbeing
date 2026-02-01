import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHealthTracker } from '@/hooks/useHealthTracker';
import { HealthScoreDisplay } from '@/components/HealthScoreDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Moon,
  Dumbbell,
  Footprints,
  Droplets,
  Pill,
  Utensils,
  Smile,
  Meh,
  Frown,
  AlertCircle,
  Brain,
  Plus,
  X,
  Save,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';
import { toast } from 'sonner';

const moodOptions = [
  { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-500' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-500' },
  { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-500' },
  { value: 'stressed', label: 'Stressed', icon: AlertCircle, color: 'text-orange-500' },
  { value: 'anxious', label: 'Anxious', icon: Brain, color: 'text-purple-500' },
];

export default function HealthTrackerPage() {
  const navigate = useNavigate();
  const {
    currentData,
    updateCurrentData,
    today,
    saveEntry,
    getCurrentScore,
    prescribedMedications,
    addPrescribedMedication,
    removePrescribedMedication,
    toggleMedicationTaken,
    resetToday,
  } = useHealthTracker();

  const [newMedication, setNewMedication] = useState('');
  const [showScore, setShowScore] = useState(false);

  const handleSave = () => {
    const score = saveEntry();
    setShowScore(true);
    toast.success(`Health score saved: ${score.totalScore}/100 - ${score.rating}`);
  };

  const handleReset = () => {
    resetToday();
    setShowScore(false);
    toast.info('Daily tracking reset');
  };

  const handleAddMedication = () => {
    if (newMedication.trim()) {
      addPrescribedMedication(newMedication);
      setNewMedication('');
    }
  };

  const score = getCurrentScore();

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header for Health Tracker */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-blue-900">CareCrafter</h1>
          </Link>
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-700">Home</Link>
            <Link to="/health-tracker" className="text-blue-900 font-medium">Health Tracker</Link>
          </nav>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Health Tracker</h1>
            <p className="text-muted-foreground">Track your daily health metrics for {today}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sleep */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Moon className="h-5 w-5 text-primary" />
                  Sleep
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Hours slept</Label>
                    <span className="text-2xl font-bold text-primary">{currentData.sleep}h</span>
                  </div>
                  <Slider
                    value={[currentData.sleep]}
                    onValueChange={([value]) => updateCurrentData({ sleep: value })}
                    min={0}
                    max={12}
                    step={0.5}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">Optimal: 7-9 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Exercise */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Dumbbell className="h-5 w-5 text-primary" />
                  Exercise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minutes of activity</Label>
                    <Input
                      type="number"
                      min={0}
                      max={300}
                      value={currentData.exercise.minutes || ''}
                      onChange={(e) =>
                        updateCurrentData({
                          exercise: { ...currentData.exercise, minutes: Number(e.target.value) },
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={currentData.exercise.type}
                      onValueChange={(value: any) =>
                        updateCurrentData({
                          exercise: { ...currentData.exercise, type: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Target: 30+ minutes daily</p>
              </CardContent>
            </Card>

            {/* Steps */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Footprints className="h-5 w-5 text-primary" />
                  Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Daily step count</Label>
                  <Input
                    type="number"
                    min={0}
                    max={50000}
                    value={currentData.steps || ''}
                    onChange={(e) => updateCurrentData({ steps: Number(e.target.value) })}
                    placeholder="0"
                  />
                  <p className="text-sm text-muted-foreground">Target: 10,000 steps</p>
                </div>
              </CardContent>
            </Card>

            {/* Water */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Droplets className="h-5 w-5 text-primary" />
                  Water Intake
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Glasses consumed</Label>
                    <span className="text-2xl font-bold text-primary">{currentData.water}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[...Array(12)].map((_, i) => (
                      <Button
                        key={i}
                        variant={currentData.water > i ? 'default' : 'outline'}
                        size="sm"
                        className="w-10 h-10"
                        onClick={() => updateCurrentData({ water: i + 1 })}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Target: 8 glasses</p>
                </div>
              </CardContent>
            </Card>

            {/* Meals */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Utensils className="h-5 w-5 text-primary" />
                  Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6">
                  {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
                    <div key={meal} className="flex items-center space-x-2">
                      <Checkbox
                        id={meal}
                        checked={currentData.meals[meal]}
                        onCheckedChange={(checked) =>
                          updateCurrentData({
                            meals: { ...currentData.meals, [meal]: !!checked },
                          })
                        }
                      />
                      <Label htmlFor={meal} className="capitalize cursor-pointer">
                        {meal}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Pill className="h-5 w-5 text-primary" />
                  Medications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add prescribed medication"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddMedication()}
                  />
                  <Button onClick={handleAddMedication} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {prescribedMedications.length > 0 ? (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Track which medications you've taken today:
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {prescribedMedications.map((med) => (
                        <Badge
                          key={med}
                          variant={currentData.medications.taken.includes(med) ? 'default' : 'outline'}
                          className="cursor-pointer flex items-center gap-1 px-3 py-1"
                          onClick={() => toggleMedicationTaken(med)}
                        >
                          <Checkbox
                            checked={currentData.medications.taken.includes(med)}
                            className="h-3 w-3"
                          />
                          {med}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removePrescribedMedication(med);
                            }}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No medications added. Add your prescribed medications above.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Mood */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Smile className="h-5 w-5 text-primary" />
                  Mood (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={currentData.mood || ''}
                  onValueChange={(value: any) => updateCurrentData({ mood: value || undefined })}
                  className="flex flex-wrap gap-4"
                >
                  {moodOptions.map((mood) => (
                    <div key={mood.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={mood.value} id={mood.value} />
                      <Label 
                        htmlFor={mood.value} 
                        className={`flex items-center gap-1 cursor-pointer ${mood.color}`}
                      >
                        <mood.icon className="h-4 w-4" />
                        {mood.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Daily Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any observations, symptoms, or notes for today..."
                  value={currentData.notes || ''}
                  onChange={(e) => updateCurrentData({ notes: e.target.value })}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={handleSave} className="flex-1" size="lg">
                <Save className="h-5 w-5 mr-2" />
                Save Today's Entry
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Right Column - Score Display */}
          <div className="space-y-6">
            <div className="sticky top-4">
              <HealthScoreDisplay score={score} />
              
              {showScore && (
                <Card className="mt-4">
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground text-center">
                      ✓ Entry saved for {today}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
