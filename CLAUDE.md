# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LEVEN is an AI-powered design studio web application built with Next.js. It provides a multi-stage product design pipeline (Dream → Sketch → Explode → Market) that transforms text prompts into product visualizations through integration with n8n automation workflows.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript type checking
```

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Design studio page
│   ├── globals.css         # Global styles
│   └── api/                # API routes
│       ├── generate/       # Text → Image generation
│       ├── sketch/         # Image → Sketch transformation
│       └── explode/        # Image → Exploded view
├── components/
│   ├── ui/                 # Shared UI components (Navbar, Spinner)
│   └── studio/             # Design studio components
├── config/
│   ├── env.ts              # Environment variable validation
│   ├── constants.ts        # App constants and stage definitions
│   └── prompts.ts          # AI prompt templates
├── hooks/
│   ├── use-image-generation.ts  # Image API hook
│   └── use-design-studio.ts     # Studio state management
├── lib/
│   ├── api-client.ts       # HTTP client with n8n integration
│   ├── errors.ts           # Custom error classes
│   └── utils.ts            # Utility functions
└── types/
    ├── api.ts              # API request/response types
    └── design.ts           # Design pipeline types
```

## Configuration

All environment variables are managed through `.env.local` (use `.env.example` as template):

- `N8N_BASE_URL` - n8n server URL (default: `http://localhost:5678`)
- `N8N_WEBHOOK_*` - Webhook paths for each API endpoint
- `NEXT_PUBLIC_*` - Client-side feature flags

Environment variables are validated and accessed through `src/config/env.ts`.

## n8n Integration

The app proxies all AI requests through n8n webhooks:

| Endpoint | Webhook | Purpose |
|----------|---------|---------|
| `/api/generate` | `/webhook/generate-image` | Text → Image |
| `/api/sketch` | `/webhook/image-sketch` | Image → Sketch |
| `/api/explode` | `/webhook/explode-view` | Image → Exploded View |

## Design Pipeline Stages

1. **Dream** - User inputs product description, generates initial concept
2. **Sketch** - Transforms concept to industrial design marker sketch
3. **Explode** - Creates technical exploded view diagram
4. **Market** - Displays market analysis and mockup options

## Key Patterns

- Custom hooks manage API state and studio workflow
- All API routes use centralized error handling (`lib/errors.ts`)
- Prompt templates are configurable in `config/prompts.ts`
- Type-safe environment access via `config/env.ts`
