# Netlify Deployment Guide for DCMS Website

## Prerequisites
1. A GitHub/GitLab/Bitbucket account (or Netlify account)
2. Your code pushed to a Git repository
3. A Netlify account (free tier works)

## Step-by-Step Deployment Instructions

### Method 1: Deploy via Netlify Dashboard (Recommended for Beginners)

#### Step 1: Prepare Your Repository
1. Make sure all your code is committed and pushed to GitHub/GitLab/Bitbucket
2. Ensure you have a `netlify.toml` file in your root directory (already created)

#### Step 2: Create Netlify Account
1. Go to [https://www.netlify.com/](https://www.netlify.com/)
2. Click "Sign up" and create an account (you can use GitHub to sign up)

#### Step 3: Add New Site
1. Once logged in, click "Add new site" → "Import an existing project"
2. Choose your Git provider (GitHub, GitLab, or Bitbucket)
3. Authorize Netlify to access your repositories
4. Select your repository (`dvclweb`)

#### Step 4: Configure Build Settings
Netlify should auto-detect Next.js, but verify these settings:

**Build command:**
```
npm run build
```

**Publish directory:**
```
.next
```

**Node version:**
```
18
```

Or leave it as "Auto" - Netlify will use the `netlify.toml` configuration.

#### Step 5: Environment Variables (if needed)
If you have any environment variables:
1. Go to Site settings → Environment variables
2. Add any required variables (e.g., API keys, secrets)

#### Step 6: Deploy
1. Click "Deploy site"
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be live at a URL like: `https://random-name-123.netlify.app`

#### Step 7: Custom Domain (Optional)
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

---

### Method 2: Deploy via Netlify CLI (For Advanced Users)

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Initialize Site
```bash
netlify init
```
Follow the prompts to:
- Create a new site or link to existing
- Set build command: `npm run build`
- Set publish directory: `.next`

#### Step 4: Deploy
```bash
netlify deploy --prod
```

---

## Important Notes

### Build Settings
- **Framework**: Next.js (auto-detected)
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18 (specified in netlify.toml)

### File Structure
Make sure these files are in your repository:
- ✅ `netlify.toml` (configuration file)
- ✅ `package.json` (dependencies)
- ✅ `next.config.js` (Next.js config)
- ✅ `public/` folder (static assets)
- ✅ All source files in `app/` and `components/`

### Common Issues & Solutions

1. **Build Fails**
   - Check Node version (should be 18+)
   - Ensure all dependencies are in `package.json`
   - Check build logs in Netlify dashboard

2. **Images Not Loading**
   - Verify image paths are correct
   - Check `next.config.js` for image domain settings
   - Ensure images in `public/` folder are committed

3. **404 Errors**
   - Next.js routing should work automatically
   - Check `netlify.toml` redirect rules

4. **Environment Variables**
   - Add any required env vars in Netlify dashboard
   - Use `process.env.VARIABLE_NAME` in your code

### Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify images display properly
- [ ] Check all links work
- [ ] Test responsive design on mobile
- [ ] Verify chatbot functionality
- [ ] Test external links (E-Learning, JMAS)
- [ ] Check form submissions (if any)
- [ ] Verify video playback
- [ ] Test search functionality

### Performance Optimization

Your site already has:
- ✅ Image optimization (WebP, AVIF)
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Compression enabled
- ✅ Console removal in production

### Monitoring

After deployment:
1. Enable Netlify Analytics (if needed)
2. Set up form notifications (if you have forms)
3. Configure custom domain SSL (automatic with Netlify)

---

## Quick Deploy Button

You can also add this to your README for one-click deploy:

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

---

## Support

If you encounter issues:
1. Check Netlify build logs
2. Review Next.js documentation
3. Check Netlify community forums
4. Review your `netlify.toml` configuration

---

**Good luck with your deployment! 🚀**

