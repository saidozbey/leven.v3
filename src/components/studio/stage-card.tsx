'use client';

import type { LucideIcon } from 'lucide-react';
import type { DesignStage } from '@/types';

interface StageCardProps {
  stage: DesignStage;
  currentStage: DesignStage;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  children: React.ReactNode;
}

export function StageCard({
  stage,
  currentStage,
  title,
  description,
  icon: Icon,
  iconColor,
  children,
}: StageCardProps) {
  const isActive = currentStage === stage;

  return (
    <section
      className={`mt-8 first:mt-0 transition-all duration-500 ${
        isActive ? 'opacity-100' : 'opacity-40 blur-sm pointer-events-none'
      }`}
    >
      <div className="group relative isolate overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/10 p-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <Icon className={iconColor} /> {title}
            </h2>
            <p className="text-neutral-400">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
