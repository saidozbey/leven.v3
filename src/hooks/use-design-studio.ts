'use client';

import { useState, useCallback } from 'react';
import { settings } from '@/config/settings';
import type { DesignStage } from '@/config/settings';
import { useImageGeneration } from './use-image-generation';
import type { ProjectState } from '@/types';

const initialProjectState: ProjectState = {
  prompt: '',
  originalImage: null,
  sketchImage: null,
  explodedImage: null,
};

export function useDesignStudio() {
  const [stage, setStage] = useState<DesignStage>(settings.stages.DREAM);
  const [project, setProject] = useState<ProjectState>(initialProjectState);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { loading, error, generate, createSketch, createExplodedView, clearError } =
    useImageGeneration();

  const updateProject = useCallback((updates: Partial<ProjectState>) => {
    setProject((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleGenerateOriginal = useCallback(async () => {
    if (!project.prompt.trim()) return;

    const imageUrl = await generate(project.prompt);
    if (imageUrl) {
      updateProject({ originalImage: imageUrl });
    }
  }, [project.prompt, generate, updateProject]);

  const handleGenerateSketch = useCallback(async () => {
    if (!project.originalImage) return;

    const imageUrl = await createSketch(project.originalImage, project.prompt);
    if (imageUrl) {
      updateProject({ sketchImage: imageUrl });
    }
  }, [project.originalImage, project.prompt, createSketch, updateProject]);

  const handleGenerateExploded = useCallback(async () => {
    if (!project.originalImage) return;

    const imageUrl = await createExplodedView(project.originalImage);
    if (imageUrl) {
      updateProject({ explodedImage: imageUrl });
      setStage(settings.stages.MARKET);
    }
  }, [project.originalImage, createExplodedView, updateProject]);

  const goToStage = useCallback((newStage: DesignStage) => {
    setStage(newStage);
  }, []);

  const reset = useCallback(() => {
    setProject(initialProjectState);
    setStage(settings.stages.DREAM);
    setSelectedImage(null);
    clearError();
  }, [clearError]);

  return {
    // State
    stage,
    project,
    loading,
    error,
    selectedImage,

    // Actions
    updateProject,
    handleGenerateOriginal,
    handleGenerateSketch,
    handleGenerateExploded,
    goToStage,
    setSelectedImage,
    reset,
    clearError,
  };
}
