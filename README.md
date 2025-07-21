# Entérate.lo - News Website

A modern news website built with React, TypeScript, and Tailwind CSS, optimized for deployment on Vercel.

## Tech Stack

- **Frontend**: React 18 + React Router 6 + TypeScript + Vite
- **Styling**: TailwindCSS 3 + Radix UI Components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## Project Structure

```
client/                   # React SPA frontend
├── components/
│   ├── ui/              # Radix UI component library
│   └── shared/          # Shared application components
│       ├── Header.tsx   # Site header with navigation
│       ├── Footer.tsx   # Site footer with links and newsletter
│       ├── ArticleCard.tsx # Article card component
│       ├── Layout.tsx   # Main layout wrapper component
│       └── index.ts     # Component exports
├── pages/               # Route components
│   ├── Index.tsx        # Home page
│   ├── ArticlePage.tsx  # Article detail page
│   ├── CategoryPage.tsx # Category page
│   └── NotFound.tsx     # 404 page
├── services/            # Data services
│   └── data.service.ts  # Mock data and types
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.tsx             # App entry point with routing
└── global.css          # Global styles and Tailwind config
```

## Key Features

- **Static Site**: No API dependencies, uses local mock data
- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Built with Radix UI components and Tailwind CSS
- **Fast Performance**: Optimized with Vite for fast builds
- **SEO Friendly**: Server-side ready for static generation

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site is configured for Vercel deployment with:

- `vercel.json` configuration for SPA routing
- Static build output in `dist/spa`
- Optimized for Vercel's static hosting

## Components

### Shared Components

- **Layout**: Main layout wrapper that includes Header, Footer, and optional breaking news ticker
- **Header**: Main navigation with logo, search, category links, and mobile menu
- **Footer**: Site footer with categories, newsletter signup, and legal links
- **ArticleCard**: Reusable article preview component with metadata and styling

### Data Service

All content is managed through the `data.service.ts` file which includes:

- Article data and types
- Category definitions
- Mock content for development

## Recent Changes

✅ Removed Express server and API dependencies
✅ Moved mock data to services folder
✅ Created shared component library with Layout pattern
✅ Implemented reusable Layout component with Header and Footer
✅ Added mobile-responsive navigation and breaking news ticker
✅ Configured for Vercel deployment
✅ Simplified build process for static hosting
✅ Removed unused Angular and server files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the build locally
5. Submit a pull request
