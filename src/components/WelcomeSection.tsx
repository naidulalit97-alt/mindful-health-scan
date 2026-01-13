import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Brain, Activity, ArrowRight } from 'lucide-react';

interface WelcomeSectionProps {
  onStart: () => void;
}

export function WelcomeSection({ onStart }: WelcomeSectionProps) {
  const features = [
    { icon: Heart, label: 'Cardiovascular', desc: 'Heart health indicators' },
    { icon: Activity, label: 'Metabolic', desc: 'Energy & metabolism' },
    { icon: Brain, label: 'Mental Health', desc: 'Stress & wellbeing' },
    { icon: Shield, label: 'Lifestyle', desc: 'Daily habits analysis' },
  ];

  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Shield className="w-4 h-4" />
          Preventive Health Assessment
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Understand Your
          <span className="text-primary block">Health Risk Indicators</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Answer a few questions about your lifestyle and daily habits to receive 
          personalized wellness insights and prevention-focused recommendations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-card p-4 rounded-xl shadow-card border border-border/50"
          >
            <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground text-sm">{feature.label}</h3>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button size="lg" onClick={onStart} className="gap-2 px-8 shadow-button">
          Start Assessment
          <ArrowRight className="w-4 h-4" />
        </Button>
        
        <p className="text-xs text-muted-foreground mt-6 max-w-md mx-auto">
          Takes about 2 minutes • Your data is not stored • For awareness only, not medical advice
        </p>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 pt-8 border-t border-border"
      >
        <p className="text-sm text-muted-foreground italic">
          This tool is a Preventive Health Risk Indicator, not a medical diagnosis system. 
          It focuses on awareness, prevention, and risk indication. For medical concerns, 
          always consult a qualified healthcare professional.
        </p>
      </motion.div>
    </div>
  );
}
