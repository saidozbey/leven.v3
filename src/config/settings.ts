/**
 * Application Settings
 * Centralized configuration - all values hardcoded for easy management
 */

export const settings = {
  // Application
  app: {
    name: 'LEVEN',
    tagline: 'AI Design Studio',
    version: '1.0.0',
    url: 'http://localhost:3000',
    locale: 'tr',
  },

  // n8n Webhook Configuration
  n8n: {
    baseUrl: 'http://localhost:5678',
    webhooks: {
      generate: '/webhook/generate-image',
      sketch: '/webhook/image-sketch',
      explode: '/webhook/explode-view',
    },
  },

  // API Configuration
  api: {
    timeoutMs: 30000,
    maxRetries: 3,
    endpoints: {
      generate: '/api/generate',
      sketch: '/api/sketch',
      explode: '/api/explode',
    },
  },

  // Feature Flags
  features: {
    enableSketch: true,
    enableExplode: true,
    enableMarketAnalysis: false,
    debugMode: true,
  },

  // UI Configuration
  ui: {
    navLinks: ['Platform', 'Studio', 'Process', 'Resources'] as const,
    fallbackImage: 'https://images.unsplash.com/photo-1527082395-e939b847da0d?auto=format&fit=crop&w=1200&q=80',
  },

  // Design Pipeline Stages
  stages: {
    DREAM: 1,
    SKETCH: 2,
    EXPLODE: 3,
    MARKET: 4,
  } as const,

  // Stage Labels (Turkish)
  stageLabels: {
    1: 'Dream',
    2: 'Sketch',
    3: 'Explode',
    4: 'Market',
  } as const,

  // Workflow Steps
  workflowSteps: [
    {
      id: '01',
      title: 'Input',
      description: 'Hayalini tek cümleyle yaz. Sistem bağlamı ve tonaliteyi kavrar.',
    },
    {
      id: '02',
      title: 'Generate',
      description: 'Çoklu konsept varyasyonları, materyal diline göre öneriler üretir.',
    },
    {
      id: '03',
      title: 'Analyze',
      description: 'Ergonomi, davranış ve maliyet simülasyonları ile doğrulama yapar.',
    },
    {
      id: '04',
      title: 'Final',
      description: 'Üretime hazır render ve marka paketleri olarak dışa aktar.',
    },
  ] as const,
} as const;

// Type exports
export type Settings = typeof settings;
export type DesignStage = (typeof settings.stages)[keyof typeof settings.stages];

// Helper functions
export function getN8nUrl(webhook: keyof typeof settings.n8n.webhooks): string {
  const baseUrl = settings.n8n.baseUrl.replace(/\/$/, '');
  const path = settings.n8n.webhooks[webhook];
  return `${baseUrl}${path}`;
}

export function isFeatureEnabled(feature: keyof typeof settings.features): boolean {
  return settings.features[feature];
}
