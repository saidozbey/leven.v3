/**
 * AI Prompt Templates
 * Centralized location for all AI prompt configurations
 */

export const PROMPT_TEMPLATES = {
  sketch: (productDescription: string) => `
Professional industrial design marker sketch presentation board of a ${productDescription}.

The style is a traditional hand-drawn product rendering using alcohol-based markers (like Copic) and fine-liner pens on layout paper.

COMPOSITION: Keep the EXACT same angle, perspective, and form of the original image. A layout collage featuring one large main dynamic view and several smaller orthographic views.

ARTISTIC TECHNIQUE: Visible construction lines, confident and energetic pen strokes. The coloring uses marker layering technique—showing distinct stroke directions. Use opaque white ink for highlights.

DETAILS:
1. Main Sketch: A perspective view of the ${productDescription} with vibrant marker shading.
2. Technical Drawings: Rough line-art wireframes showing dimensions.
3. Text: Handwritten designer notes and arrows describing the ${productDescription}.

Background: Clean white marker paper texture.

--ar 3:2 --iw 2 --no photorealistic, 3D render, octane render, blender, photograph
`.trim().replace(/\n/g, ' '),

  explode: () =>
    'technical exploded view diagram, parts separated floating in air, engineering schematic, blueprint style, detailed mechanical parts, white background',
} as const;
