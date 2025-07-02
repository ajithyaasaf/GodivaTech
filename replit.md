# GodivaTech Website - Replit Project Documentation

## Overview

This is a full-stack web application for GodivaTech, a technology company offering software solutions, IT consulting, and cloud services. The project is built with React (TypeScript) on the frontend and Express.js on the backend, with PostgreSQL as the database using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with custom component library (shadcn/ui)
- **Animations**: Framer Motion for advanced animations and transitions
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API**: RESTful API design
- **Session Management**: Built-in session handling
- **Environment**: Node.js with ES modules

### Development Stack
- **TypeScript**: Full-stack type safety
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing with autoprefixer

## Key Components

### Database Schema
- **Users**: Authentication and user management
- **Blog Posts**: Content management with categories and metadata
- **Categories**: Blog post categorization
- **Projects**: Portfolio showcase items
- **Services**: Company service offerings
- **Team Members**: Staff profiles with social links
- **Testimonials**: Client feedback and reviews
- **Contact Messages**: User inquiries and contact form submissions
- **Subscribers**: Newsletter subscription management

### Frontend Components
- **Layout System**: Responsive header, footer, and main content areas
- **Page Components**: Home, About, Services, Portfolio, Blog, Contact
- **UI Components**: Reusable components based on Radix UI primitives
- **Animation Components**: Parallax sections, scroll-triggered animations
- **Form Components**: Contact forms with validation

### API Endpoints
- **Blog Management**: CRUD operations for blog posts and categories
- **Contact System**: Message submission and newsletter subscriptions
- **Content Delivery**: Serving static content and dynamic data

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express.js routes handle HTTP requests
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Structured JSON responses with error handling
5. **State Management**: Client-side caching and state synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Production build bundling

## Deployment Strategy

### Development
- **Command**: `npm run dev` - Starts development server with hot reload
- **Environment**: Uses NODE_ENV=development
- **Database**: Connects via DATABASE_URL environment variable

### Production Build
- **Frontend**: `vite build` - Creates optimized static assets
- **Backend**: `esbuild` bundles server code for production
- **Output**: Generates `dist/` directory with compiled application

### Production Deployment
- **Command**: `npm start` - Runs production server
- **Environment**: Uses NODE_ENV=production
- **Assets**: Serves static files from dist/public directory

### Database Management
- **Schema**: Defined in `shared/schema.ts`
- **Migrations**: Generated in `migrations/` directory
- **Deployment**: `npm run db:push` applies schema changes

## Changelog

- July 02, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.