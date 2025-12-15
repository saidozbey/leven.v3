'use client';

import { CheckCircle2 } from 'lucide-react';
import { settings } from '@/config/settings';
import type { DesignStage } from '@/config/settings';

interface ProgressBarProps {
  currentStage: DesignStage;
}

const stages = Object.values(settings.stages) as DesignStage[];

export function ProgressBar({ currentStage }: ProgressBarProps) {
  return (
    <div className="flex justify-between mb-12 relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-800 -z-10" />
      {stages.map((stageValue) => (
        <div
          key={stageValue}
          className={`flex flex-col items-center gap-2 ${
            currentStage >= stageValue ? 'text-blue-500' : 'text-neutral-600'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
              currentStage >= stageValue
                ? 'bg-black border-blue-500'
                : 'bg-black border-neutral-800'
            }`}
          >
            {currentStage > stageValue ? (
              <CheckCircle2 size={16} />
            ) : (
              stageValue
            )}
          </div>
          <span className="text-xs font-mono uppercase">
            {settings.stageLabels[stageValue]}
          </span>
        </div>
      ))}
    </div>
  );
}
