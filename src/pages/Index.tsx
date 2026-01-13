import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeSection } from '@/components/WelcomeSection';
import { HealthData, HealthAssessment } from '@/types/health';
import { calculateHealthAssessment } from '@/lib/healthCalculations';

// Lazy load components not needed on initial render
const HealthForm = lazy(() => import('@/components/HealthForm').then(m => ({ default: m.HealthForm })));
const AssessmentResults = lazy(() => import('@/components/AssessmentResults').then(m => ({ default: m.AssessmentResults })));

type View = 'welcome' | 'form' | 'results';

const Index = () => {
  const [view, setView] = useState<View>('welcome');
  const [assessment, setAssessment] = useState<HealthAssessment | null>(null);

  const handleStart = () => {
    setView('form');
  };

  const handleSubmit = (data: HealthData) => {
    const result = calculateHealthAssessment(data);
    setAssessment(result);
    setView('results');
  };

  const handleReset = () => {
    setAssessment(null);
    setView('welcome');
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="container max-w-4xl flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-lg">♥</span>
            </div>
            <span className="font-semibold text-foreground">HealthCheck</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-4xl px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {view === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WelcomeSection onStart={handleStart} />
            </motion.div>
          )}

          {view === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl shadow-card border border-border/50 p-6 md:p-8"
            >
              <Suspense fallback={<div className="flex items-center justify-center p-12"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
                <HealthForm onSubmit={handleSubmit} />
              </Suspense>
            </motion.div>
          )}

          {view === 'results' && assessment && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<div className="flex items-center justify-center p-12"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
                <AssessmentResults assessment={assessment} onReset={handleReset} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 mt-auto">
        <div className="container max-w-4xl text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 HealthCheck • For awareness purposes only • Not medical advice
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
