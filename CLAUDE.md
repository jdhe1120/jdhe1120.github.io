# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio/resume website for jeffreydinghe.com, hosted via GitHub Pages. Built on the Start Bootstrap Resume template using Bootstrap 4, jQuery, and SCSS.

## Build & Development

Requires Node.js and gulp (v3). After `npm install`:

- **`gulp dev`** — local dev server with BrowserSync + file watching (SCSS, CSS, JS, HTML)
- **`gulp`** — default build: compiles SCSS, minifies CSS and JS, copies vendor files
- **`gulp sass`** — compile `scss/resume.scss` → `css/resume.css`
- **`gulp minify-css`** — minify CSS (depends on sass task)
- **`gulp minify-js`** — minify `js/resume.js` → `js/resume.min.js`
- **`gulp copy`** — copy vendor deps from node_modules to `vendor/`

## Architecture

Single-page site (`index.html`) with sections: About, Experience, Education, Projects, Awards. Navigation is a fixed sidebar that collapses on mobile.

- **`scss/`** — SCSS source files (`_variables.scss`, `_mixins.scss`, `_global.scss`, `_nav.scss`, `_resume-item.scss`, `_bootstrap-overrides.scss`), compiled via `resume.scss`
- **`css/`** — compiled output (`resume.css`, `resume.min.css`) — do not edit directly
- **`js/resume.js`** — smooth scrolling, responsive menu toggle, scrollspy (jQuery)
- **`vendor/`** — vendored copies of Bootstrap, jQuery, Font Awesome, Devicons, Simple Line Icons
- **`img/`** — profile photo, favicon, project/company logos
- **`CNAME`** — custom domain config (jeffreydinghe.com)

## Key Notes

- Edit SCSS files in `scss/`, not CSS files directly. Run `gulp` or `gulp sass` to recompile.
- `index.html` references minified assets (`resume.min.css`, `resume.min.js`). After editing JS or SCSS, rebuild minified versions.
- Deploys automatically via GitHub Pages on push to `master`.

## Modernization TODOs

The site is ~8 years old (Start Bootstrap Resume template, 2017). The plan is to modernize with **Jekyll** (native GitHub Pages SSG with blog support) and **Tailwind CSS**.

### 1. Migrate to Jekyll
- Convert `index.html` to Jekyll project structure (`_layouts/`, `_includes/`, `_config.yml`)
- Set up Jekyll-compatible directory structure
- Create reusable layout templates (default, page, post)
- Extract repeated HTML sections (nav, head, footer) into `_includes/`
- Configure `_config.yml` with site metadata, permalink structure, and build settings
- Update CNAME and GitHub Pages settings for Jekyll builds

### 2. Replace CSS Framework with Tailwind
- Remove Bootstrap 4 beta and all vendored CSS
- Install and configure Tailwind CSS (via Jekyll plugin or PostCSS build step)
- Rewrite all styles using Tailwind utility classes
- Replace SCSS variables/mixins with Tailwind theme config and CSS custom properties
- Remove the entire `scss/` directory and compiled CSS once migration is complete
- Ensure responsive design works with Tailwind breakpoints

### 3. Remove jQuery & Modernize JS
- Rewrite smooth scrolling with native `scroll-behavior: smooth` CSS + `scrollIntoView()`
- Rewrite menu toggle with vanilla JS
- Replace jQuery scrollspy with Intersection Observer API
- Remove jQuery, jQuery Easing, Popper.js dependencies
- Delete `vendor/` directory entirely

### 4. Replace Build Tooling
- Remove Gulp 3 and all gulp-* devDependencies
- Remove `gulpfile.js`
- Let Jekyll handle the build pipeline (or add a minimal PostCSS step for Tailwind)
- Remove IE8 compatibility targeting
- Update `package.json` — clean up metadata, scripts, and dependencies
- Stop committing built artifacts; update `.gitignore`

### 5. Update Icons
- Replace Font Awesome 4.7 with Font Awesome 6 (or a lighter alternative like Lucide/Heroicons)
- Replace Devicons 1.x with Devicon v2 or inline SVGs
- Remove Simple Line Icons (replace with chosen icon set)

### 6. SEO & Meta Tags
- Add proper `<meta description>`, OG tags, Twitter card tags
- Add `lang="en"` to `<html>` element
- Add structured data (JSON-LD Person schema)
- Generate `sitemap.xml` (Jekyll has a plugin for this)
- Add `robots.txt`
- Add canonical URLs

### 7. Accessibility
- Add skip-to-content link
- Add ARIA labels to navigation and interactive elements
- Fix semantic HTML (replace `<br>` spacing with CSS margins)
- Ensure proper heading hierarchy
- Add meaningful alt text to all images
- Test keyboard navigation end-to-end

### 8. Performance
- Self-host Google Fonts (or use `font-display: swap`)
- Convert images to WebP/AVIF with fallbacks
- Add lazy loading for below-fold images
- Add resource hints (`preconnect`, `preload` for critical assets)
- Minimize JS payload (target zero or near-zero JS)

### 9. Blog Infrastructure
- Set up Jekyll `_posts/` directory with Markdown support
- Create blog index page and post layout template
- Add RSS/Atom feed (`jekyll-feed` plugin)
- Add syntax highlighting for code blocks (`rouge`, built into Jekyll)
- Add tags/categories support
- Add pagination for blog listing

### 10. Developer Experience
- Add GitHub Actions workflow for CI (build validation on PRs)
- Add Prettier for formatting
- Add a proper `.gitignore` (node_modules, _site, .jekyll-cache)
- Add a `README.md` with local dev setup instructions
- Update `CLAUDE.md` to reflect the new Jekyll + Tailwind stack
