import { motion } from 'framer-motion';

interface RiskGaugeProps {
  score: number;
  riskLevel: 'low' | 'moderate' | 'high';
}

export function RiskGauge({ score, riskLevel }: RiskGaugeProps) {
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const colorClass = {
    low: 'text-risk-low',
    moderate: 'text-risk-moderate',
    high: 'text-risk-high',
  }[riskLevel];

  const strokeColor = {
    low: 'hsl(158 50% 45%)',
    moderate: 'hsl(45 80% 50%)',
    high: 'hsl(0 65% 55%)',
  }[riskLevel];

  const riskLabel = {
    low: 'Low Risk',
    moderate: 'Moderate Risk',
    high: 'High Risk',
  }[riskLevel];

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-56 h-56 -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="hsl(40 20% 92%)"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className={`text-5xl font-bold ${colorClass}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score}
        </motion.span>
        <motion.span 
          className="text-muted-foreground text-sm mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          out of 100
        </motion.span>
        <motion.span 
          className={`text-sm font-medium mt-2 ${colorClass}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {riskLabel}
        </motion.span>
      </div>
    </div>
  );
}
