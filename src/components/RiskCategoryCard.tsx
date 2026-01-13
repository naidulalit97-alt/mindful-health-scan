import { motion } from 'framer-motion';
import { RiskCategory } from '@/types/health';

interface RiskCategoryCardProps {
  category: RiskCategory;
  index: number;
}

export function RiskCategoryCard({ category, index }: RiskCategoryCardProps) {
  const levelStyles = {
    low: 'risk-indicator-low',
    moderate: 'risk-indicator-moderate',
    high: 'risk-indicator-high',
  };

  const levelLabels = {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-card rounded-xl p-5 shadow-card border border-border/50"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <h3 className="font-semibold text-foreground">{category.name}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelStyles[category.level]}`}>
          {levelLabels[category.level]}
        </span>
      </div>
      
      {category.factors.length > 0 && (
        <ul className="space-y-2 mt-4">
          {category.factors.map((factor, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              {factor}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
