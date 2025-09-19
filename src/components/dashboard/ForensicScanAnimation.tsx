'use client';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const scanSteps = [
  'Analyzing local news archives...',
  'Cross-referencing municipal records...',
  'Evaluating source credibility...',
  'Detecting linguistic manipulation patterns...',
  'Synthesizing evidence...',
];

export default function ForensicScanAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % scanSteps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-card/50">
      <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
      <h3 className="text-lg font-semibold text-center">Forensic Scan in Progress</h3>
      <p className="text-muted-foreground mt-2 text-center transition-opacity duration-300">
        {scanSteps[currentStep]}
      </p>
    </div>
  );
}
