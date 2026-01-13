import { motion } from 'framer-motion';
import { HealthAssessment } from '@/types/health';
import { RiskGauge } from './RiskGauge';
import { RiskCategoryCard } from './RiskCategoryCard';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Lightbulb, Phone, RefreshCw, Stethoscope } from 'lucide-react';

interface AssessmentResultsProps {
  assessment: HealthAssessment;
  onReset: () => void;
}

export function AssessmentResults({ assessment, onReset }: AssessmentResultsProps) {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Header with score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold text-foreground mb-2">Your Health Risk Assessment</h2>
        <p className="text-muted-foreground">Based on your lifestyle and behavioral patterns</p>
      </motion.div>

      {/* Risk Gauge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center py-4"
      >
        <RiskGauge score={assessment.overallScore} riskLevel={assessment.riskLevel} />
      </motion.div>

      {/* Professional consultation alert */}
      {assessment.shouldConsultProfessional && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-start gap-4 p-5 rounded-xl bg-risk-high-bg border border-risk-high/20"
        >
          <Stethoscope className="w-6 h-6 text-risk-high shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-risk-high mb-1">Professional Consultation Recommended</h3>
            <p className="text-sm text-foreground/80">
              Based on your assessment, we recommend consulting a qualified healthcare professional 
              for personalized guidance and evaluation.
            </p>
          </div>
        </motion.div>
      )}

      {/* Risk Categories */}
      {assessment.categories.length > 0 && (
        <div className="space-y-4">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg font-semibold text-foreground flex items-center gap-2"
          >
            <AlertTriangle className="w-5 h-5 text-muted-foreground" />
            Risk Categories
          </motion.h3>
          <div className="grid gap-4 md:grid-cols-2">
            {assessment.categories.map((category, index) => (
              <RiskCategoryCard key={category.name} category={category} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {assessment.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Wellness Recommendations
          </h3>
          <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 space-y-3">
            {assessment.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
                  {index + 1}
                </span>
                <p className="text-foreground text-sm leading-relaxed">{rec}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Emergency Numbers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 space-y-3"
      >
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Phone className="w-5 h-5 text-destructive" />
          Emergency Contacts
        </h3>
        <p className="text-sm text-muted-foreground">
          If you're experiencing a medical emergency, please call immediately:
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <a 
            href="tel:911" 
            className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-muted transition-colors border border-border"
          >
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-foreground">911</p>
              <p className="text-xs text-muted-foreground">Emergency Services (US)</p>
            </div>
          </a>
          <a 
            href="tel:112" 
            className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-muted transition-colors border border-border"
          >
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-foreground">112</p>
              <p className="text-xs text-muted-foreground">Emergency Services (EU)</p>
            </div>
          </a>
          <a 
            href="tel:988" 
            className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-muted transition-colors border border-border"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">988</p>
              <p className="text-xs text-muted-foreground">Suicide & Crisis Lifeline (US)</p>
            </div>
          </a>
          <a 
            href="tel:102" 
            className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-muted transition-colors border border-border"
          >
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-foreground">102</p>
              <p className="text-xs text-muted-foreground">Ambulance (India)</p>
            </div>
          </a>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="bg-muted/50 rounded-xl p-5 text-center"
      >
        <p className="text-sm text-muted-foreground italic">
          This assessment is for health awareness only and is not a medical diagnosis. 
          For medical concerns, consult a licensed healthcare professional.
        </p>
      </motion.div>

      {/* Reset button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="flex justify-center pt-4"
      >
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Start New Assessment
        </Button>
      </motion.div>
    </div>
  );
}
