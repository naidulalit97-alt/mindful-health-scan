import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HealthData } from '@/types/health';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, ChevronLeft, Info } from 'lucide-react';

interface HealthFormProps {
  onSubmit: (data: HealthData) => void;
}

const TOTAL_STEPS = 4;

export function HealthForm({ onSubmit }: HealthFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<HealthData>>({
    age: undefined,
    biologicalSex: undefined,
    height: undefined,
    weight: undefined,
    activityLevel: undefined,
    sleepDuration: undefined,
    sleepQuality: undefined,
    stressLevel: undefined,
    dietPattern: undefined,
    waterIntake: undefined,
    smokingAlcohol: undefined,
    existingConditions: '',
    currentSymptoms: '',
    restingHeartRate: null,
    screenTime: undefined,
  });

  const updateField = <K extends keyof HealthData>(field: K, value: HealthData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    onSubmit(formData as HealthData);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.age && formData.biologicalSex && formData.height && formData.weight;
      case 2:
        return formData.activityLevel && formData.sleepDuration && formData.sleepQuality;
      case 3:
        return formData.stressLevel && formData.dietPattern && formData.waterIntake;
      case 4:
        return formData.smokingAlcohol && formData.screenTime !== undefined;
      default:
        return false;
    }
  };

  const SelectOption = ({ 
    label, 
    value, 
    selected, 
    onClick 
  }: { 
    label: string; 
    value: string; 
    selected: boolean; 
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
        selected 
          ? 'border-primary bg-primary/10 text-primary' 
          : 'border-border bg-card hover:border-primary/50 text-foreground'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {step} of {TOTAL_STEPS}</span>
          <span className="text-sm text-muted-foreground">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Basic Information</h2>
              <p className="text-muted-foreground text-sm">Help us understand your baseline health</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age || ''}
                  onChange={e => updateField('age', parseInt(e.target.value) || 0)}
                  className="bg-card"
                />
              </div>
              <div className="space-y-2">
                <Label>Biological Sex</Label>
                <div className="flex gap-2">
                  {(['male', 'female', 'other'] as const).map(sex => (
                    <SelectOption
                      key={sex}
                      label={sex.charAt(0).toUpperCase() + sex.slice(1)}
                      value={sex}
                      selected={formData.biologicalSex === sex}
                      onClick={() => updateField('biologicalSex', sex)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 170"
                  value={formData.height || ''}
                  onChange={e => updateField('height', parseInt(e.target.value) || 0)}
                  className="bg-card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={formData.weight || ''}
                  onChange={e => updateField('weight', parseInt(e.target.value) || 0)}
                  className="bg-card"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Activity & Sleep</h2>
              <p className="text-muted-foreground text-sm">Your daily movement and rest patterns</p>
            </div>

            <div className="space-y-2">
              <Label>Daily Physical Activity Level</Label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'low', label: 'Low (sedentary)' },
                  { value: 'moderate', label: 'Moderate' },
                  { value: 'high', label: 'High (active)' },
                ].map(opt => (
                  <SelectOption
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    selected={formData.activityLevel === opt.value}
                    onClick={() => updateField('activityLevel', opt.value as HealthData['activityLevel'])}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleepDuration">Average Sleep Duration (hours)</Label>
              <Input
                id="sleepDuration"
                type="number"
                step="0.5"
                placeholder="e.g., 7"
                value={formData.sleepDuration || ''}
                onChange={e => updateField('sleepDuration', parseFloat(e.target.value) || 0)}
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label>Sleep Quality</Label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'poor', label: 'Poor' },
                  { value: 'fair', label: 'Fair' },
                  { value: 'good', label: 'Good' },
                  { value: 'excellent', label: 'Excellent' },
                ].map(opt => (
                  <SelectOption
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    selected={formData.sleepQuality === opt.value}
                    onClick={() => updateField('sleepQuality', opt.value as HealthData['sleepQuality'])}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Stress & Nutrition</h2>
              <p className="text-muted-foreground text-sm">How you fuel and manage your day</p>
            </div>

            <div className="space-y-2">
              <Label>Stress Level</Label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                ].map(opt => (
                  <SelectOption
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    selected={formData.stressLevel === opt.value}
                    onClick={() => updateField('stressLevel', opt.value as HealthData['stressLevel'])}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Diet Pattern</Label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'balanced', label: 'Balanced' },
                  { value: 'high_sugar', label: 'High Sugar' },
                  { value: 'high_fat', label: 'High Fat' },
                  { value: 'irregular', label: 'Irregular' },
                ].map(opt => (
                  <SelectOption
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    selected={formData.dietPattern === opt.value}
                    onClick={() => updateField('dietPattern', opt.value as HealthData['dietPattern'])}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Water Intake</Label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'low', label: 'Low' },
                  { value: 'adequate', label: 'Adequate' },
                  { value: 'high', label: 'High' },
                ].map(opt => (
                  <SelectOption
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    selected={formData.waterIntake === opt.value}
                    onClick={() => updateField('waterIntake', opt.value as HealthData['waterIntake'])}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Lifestyle & Additional Info</h2>
              <p className="text-muted-foreground text-sm">Help us complete your assessment</p>
            </div>

            <div className="space-y-2">
              <Label>Smoking or Alcohol Usage</Label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'none', label: 'None' },
                  { value: 'occasional', label: 'Occasional' },
                  { value: 'frequent', label: 'Frequent' },
                ].map(opt => (
                  <SelectOption
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    selected={formData.smokingAlcohol === opt.value}
                    onClick={() => updateField('smokingAlcohol', opt.value as HealthData['smokingAlcohol'])}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="screenTime">Screen Time per Day (hours)</Label>
              <Input
                id="screenTime"
                type="number"
                placeholder="e.g., 6"
                value={formData.screenTime || ''}
                onChange={e => updateField('screenTime', parseInt(e.target.value) || 0)}
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heartRate">Resting Heart Rate (optional, bpm)</Label>
              <Input
                id="heartRate"
                type="number"
                placeholder="e.g., 72"
                value={formData.restingHeartRate || ''}
                onChange={e => updateField('restingHeartRate', parseInt(e.target.value) || null)}
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conditions">Known Existing Conditions (optional)</Label>
              <Textarea
                id="conditions"
                placeholder="Any conditions you'd like us to know about..."
                value={formData.existingConditions}
                onChange={e => updateField('existingConditions', e.target.value)}
                className="bg-card resize-none"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Current Symptoms (optional)</Label>
              <Textarea
                id="symptoms"
                placeholder="Any symptoms you're currently experiencing..."
                value={formData.currentSymptoms}
                onChange={e => updateField('currentSymptoms', e.target.value)}
                className="bg-card resize-none"
                rows={2}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        
        {step < TOTAL_STEPS ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="gap-2"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!isStepValid()}
            className="gap-2"
          >
            Get Assessment
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg flex items-start gap-3">
        <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground italic">
          This assessment is for health awareness only and is not a medical diagnosis. 
          For medical concerns, consult a licensed healthcare professional.
        </p>
      </div>
    </div>
  );
}
