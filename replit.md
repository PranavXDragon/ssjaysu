# Ethereal Luxe - Luxury Diamond E-Commerce

## Overview

Ethereal Luxe is a luxury diamond and engagement ring e-commerce platform built with a modern full-stack architecture. The application features a React frontend with Tailwind CSS styling, an Express.js backend, and PostgreSQL database with Drizzle ORM. The platform showcases high-end jewelry products with elegant animations, shopping cart functionality, and checkout capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with functional components and hooks
- **Routing**: Wouter for client-side navigation (lightweight alternative to React Router)
- **State Management**: 
  - TanStack Query for server state and data fetching
  - React Context for cart state with localStorage persistence
- **Styling**: Tailwind CSS with custom luxury design system
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for smooth transitions and interactions
- **Typography**: Playfair Display (serif headings) + Inter (body text)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints under `/api` prefix
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Validation**: Zod with drizzle-zod integration

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Vite builds static assets to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **TypeScript**: Strict mode with path aliases (`@/` for client, `@shared/` for shared code)

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components (shadcn/ui + custom)
    hooks/        # Custom React hooks (cart, products, etc.)
    pages/        # Route page components
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared between client/server
  schema.ts       # Drizzle schema definitions
  routes.ts       # API contract types
```

### Data Flow
1. Frontend uses TanStack Query to fetch from `/api` endpoints
2. Express routes delegate to storage layer
3. Storage layer uses Drizzle ORM to query PostgreSQL
4. Shared schema ensures type safety across the stack

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connected via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and migrations
- **drizzle-kit**: Schema push and migration management (`npm run db:push`)

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for luxury UI effects
- **wouter**: Lightweight React router
- **react-hook-form + zod**: Form handling with validation
- **shadcn/ui components**: Pre-built accessible UI primitives

### Development Tools
- **Vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Production server bundling

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string (required)

### Key NPM Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run db:push`: Push schema changes to database