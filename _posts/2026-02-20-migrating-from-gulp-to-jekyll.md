---
layout: post
title: "Migrating from Gulp to Jekyll"
date: 2026-02-20
author: Jeffrey He
excerpt: "A guide to modernizing an old portfolio site by moving from Gulp-based build system to Jekyll."
---

# Migrating from Gulp to Jekyll

After 7 years, I decided it was time to modernize my portfolio website. The old tech stack (Gulp, Bootstrap 4 beta, jQuery) was showing its age, so I migrated to Jekyll.

## Why Jekyll?

Jekyll is a static site generator that's perfect for portfolio and blog sites because:

1. **Native GitHub Pages support** - Push to GitHub and it auto-builds
2. **Built-in blog functionality** - Just add Markdown files to `_posts/`
3. **SCSS compilation included** - No need for Gulp or other build tools
4. **Simple and stable** - Mature tool with great documentation

## The Migration Process

The migration involved several steps:

### 1. Remove Gulp
- Deleted `gulpfile.js`
- Removed build-related npm dependencies
- Simplified `package.json`

### 2. Restructure for Jekyll
Created the standard Jekyll directory structure:
```
_layouts/       # HTML templates
_includes/      # Reusable components
_posts/         # Blog posts in Markdown
_sass/          # SCSS partials
assets/         # Compiled CSS, JS, images
```

### 3. Convert to Layouts
- Created `default.html` layout with head and scripts
- Created `home.html` layout for the portfolio page
- Created `post.html` layout for blog posts
- Added Jekyll frontmatter to `index.html`

### 4. Migrate SCSS
- Moved SCSS files to `_sass/`
- Created main SCSS entry point in `assets/css/main.scss`
- Jekyll compiles this automatically

## The Result

Now the workflow is much simpler:
- Write blog posts in Markdown
- Push to GitHub
- Site auto-deploys in ~1 minute

No build process, no npm scripts, no Gulp configuration. Just write and publish.

## Next Steps

Future improvements I'm considering:
- Upgrade to Bootstrap 5 (remove jQuery dependency)
- Add search functionality for blog posts
- Implement tags/categories for posts
- Add RSS feed (Jekyll makes this easy with `jekyll-feed` plugin)

---

*Have questions about migrating to Jekyll? Feel free to reach out!*
