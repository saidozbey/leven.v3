/**
 * Design Studio Types
 * Type definitions for the design pipeline
 */

import type { DesignStage } from '@/config/settings';

export type { DesignStage };

export interface ProjectState {
  prompt: string;
  originalImage: string | null;
  sketchImage: string | null;
  explodedImage: string | null;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

export interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  interactive?: boolean;
}
