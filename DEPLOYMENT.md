# Tone Music Analyzer - Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available
- Perfect for React/Vite apps

**Steps:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
npm run build
vercel --prod
```

4. **Add Environment Variables**
- Go to Vercel Dashboard
- Select your project
- Settings → Environment Variables
- Add your API keys:
  - `VITE_SPOTIFY_CLIENT_ID`
  - `VITE_SPOTIFY_CLIENT_SECRET`
  - `VITE_APPLE_MUSIC_TOKEN`
  - `VITE_YOUTUBE_API_KEY`
  - `VITE_GENIUS_API_KEY`

5. **Redeploy**
```bash
vercel --prod
```

---

### Option 2: Netlify

**Why Netlify?**
- Easy drag & drop
- Continuous deployment
- Free tier available
- Great for static sites

**Steps:**

1. **Build the project**
```bash
npm run build
```

2. **Deploy via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Or via Web UI:**
1. Go to [netlify.com](https://netlify.com)
2. Drag `dist/` folder to deploy
3. Add environment variables in Site Settings

---

### Option 3: GitHub Pages

**Steps:**

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/tone-music-analyzer",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.ts**
```typescript
export default defineConfig({
  base: '/tone-music-analyzer/',
  // ... rest of config
})
```

4. **Deploy**
```bash
npm run deploy
```

---

### Option 4: AWS S3 + CloudFront

**For Production Scale:**

1. **Build**
```bash
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://tone-music-analyzer
```

3. **Upload**
```bash
aws s3 sync dist/ s3://tone-music-analyzer --acl public-read
```

4. **Setup CloudFront**
- Create CloudFront distribution
- Point to S3 bucket
- Enable HTTPS
- Add custom domain

---

## 🔧 Pre-Deployment Checklist

### 1. Environment Variables
- [ ] All API keys added
- [ ] Production URLs configured
- [ ] Secrets not in code

### 2. Build Optimization
- [ ] Run `npm run build`
- [ ] Check bundle size
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all routes work

### 3. Performance
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Lazy loading enabled
- [ ] Bundle analyzed

### 4. Security
- [ ] API keys in environment variables
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting considered

### 5. SEO & Meta
- [ ] Meta tags added
- [ ] Open Graph tags
- [ ] Favicon added
- [ ] Sitemap generated

### 6. Testing
- [ ] Test all input methods
- [ ] Test on mobile devices
- [ ] Test in different browsers
- [ ] Test error scenarios

---

## 🌐 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records
4. Enable HTTPS

---

## 📊 Monitoring & Analytics

### Add Google Analytics

1. **Get GA4 Tracking ID**
2. **Add to index.html**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Add Sentry (Error Tracking)

1. **Install Sentry**
```bash
npm install @sentry/react
```

2. **Initialize in main.tsx**
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🐛 Production Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working
- Ensure they start with `VITE_`
- Rebuild after adding variables
- Check deployment platform settings

### 404 on Routes
- Configure SPA fallback
- For Vercel: add `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Slow Loading
- Enable compression (gzip/brotli)
- Use CDN
- Optimize images
- Enable caching headers

---

## 📈 Performance Optimization

### 1. Code Splitting
```typescript
// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AnalyzePage = lazy(() => import('./pages/AnalyzePage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
```

### 2. Image Optimization
- Use WebP format
- Lazy load images
- Responsive images

### 3. Bundle Analysis
```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to `vite.config.ts`:
```typescript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});
```

---

## 🔒 Security Best Practices

1. **Never commit .env files**
2. **Use environment variables for secrets**
3. **Enable HTTPS only**
4. **Implement rate limiting**
5. **Sanitize user inputs**
6. **Keep dependencies updated**
7. **Use Content Security Policy**

---

## 📱 PWA Setup (Optional)

1. **Install Vite PWA Plugin**
```bash
npm install vite-plugin-pwa -D
```

2. **Configure in vite.config.ts**
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tone Music Analyzer',
        short_name: 'ToneMusic',
        theme_color: '#6B46C1',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

---

## 🎯 Post-Deployment

### 1. Test Everything
- [ ] All features work
- [ ] API integrations functional
- [ ] Mobile responsive
- [ ] Cross-browser compatible

### 2. Monitor
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Track user analytics
- [ ] Watch API usage

### 3. Optimize
- [ ] Review bundle size
- [ ] Optimize slow queries
- [ ] Cache frequently accessed data
- [ ] Improve load times

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check platform status pages
5. Review documentation

---

**Your app is ready for the world! 🚀**

Good luck with your deployment!
