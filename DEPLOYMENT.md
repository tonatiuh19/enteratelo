# Deploying to Vercel

This guide walks you through deploying your news website to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. Login to your Vercel account:

   ```bash
   vercel login
   ```

3. Deploy from your project directory:

   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? (select your account)
   - Link to existing project? `N`
   - What's your project's name? `enteratelo` (or your preferred name)
   - In which directory is your code located? `./`

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure the project:

   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/spa`
   - **Install Command**: `npm install`

5. Click "Deploy"

## Configuration

The project includes a `vercel.json` file with the following configuration:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/spa"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

This configuration:

- Builds the project as a static site
- Serves the built files from `dist/spa`
- Redirects all routes to `index.html` for SPA routing

## Environment Variables

If you need to add environment variables:

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add your variables for Production, Preview, and Development environments

## Custom Domain

To add a custom domain:

1. Go to your project dashboard
2. Navigate to Settings → Domains
3. Add your domain name
4. Follow the DNS configuration instructions

## Automatic Deployments

Once connected to your Git repository, Vercel will automatically:

- Deploy the main branch to production
- Create preview deployments for pull requests
- Show deployment status in your Git provider

## Build Optimization

The project is already optimized for production:

- ✅ Static build output
- ✅ CSS optimization with Tailwind
- ✅ JavaScript bundling and minification
- ✅ Asset optimization

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Test the build locally with `npm run build`

### Routes Not Working

- Verify `vercel.json` configuration is present
- Check that the build output is in the correct directory

### Performance Issues

- Monitor performance in Vercel Analytics
- Consider implementing lazy loading for large components
- Optimize images and assets

## Support

For deployment issues:

- Check [Vercel Documentation](https://vercel.com/docs)
- Visit [Vercel Community](https://github.com/vercel/vercel/discussions)
- Contact Vercel Support through their dashboard
