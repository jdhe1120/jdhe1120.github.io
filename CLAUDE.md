# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio/resume website for jeffreydinghe.com, hosted via GitHub Pages. Built on the Start Bootstrap Resume template using Tailwind CSS v4. JavaScript is vanilla (no jQuery).

## Build & Development

### Jekyll (site generator)
Requires Ruby and Bundler. After `bundle install`:

- **`bundle exec jekyll serve`** — local dev server at `localhost:4000` with auto-regeneration
- **`bundle exec jekyll build`** — build site to `_site/`

### Tailwind CSS (styling)
Requires Node.js. After `npm install`:

- **`npm run css:build`** — compile `css/input.css` → `css/resume.min.css` (minified)
- **`npm run css:watch`** — watch mode for development

### Gulp (JS minification)
- **`gulp minify-js`** — minify `js/resume.js` → `js/resume.min.js`

## Architecture

Single-page site built with Jekyll. Content is data-driven via `_data/` YAML files. Navigation is a fixed sidebar that collapses on mobile.

- **`_config.yml`** — Jekyll site config (metadata, build settings, exclude list)
- **`_layouts/default.html`** — HTML shell layout (head, nav, scripts)
- **`_includes/`** — reusable partials (`head.html`, `nav.html`, `sections/*.html`)
- **`_data/`** — structured content in YAML (`nav`, `social`, `experience`, `education`, `projects`, `awards`)
- **`index.html`** — front matter + section includes (assembles the page)
- **`css/input.css`** — Tailwind CSS source with `@theme` config and `@layer` custom styles
- **`css/resume.min.css`** — compiled Tailwind output (do not edit directly)
- **`js/resume.js`** — smooth scrolling (`scrollIntoView`), responsive menu toggle, scrollspy (`IntersectionObserver`) — vanilla JS, no jQuery
- **`img/`** — profile photo, favicon, project/company logos
- **`CNAME`** — custom domain config (jeffreydinghe.com)

## Key Notes

- Edit styles in `css/input.css`, not `css/resume.min.css` directly. Run `npm run css:build` to recompile.
- Site content lives in `_data/*.yml` files — edit those, not the HTML templates.
- `_includes/sections/*.html` are Liquid templates that loop over `_data/` files.
- After editing CSS, run `npm run css:build`. After editing JS, run `gulp minify-js`.
- Deploys via GitHub Actions on push to `master` (builds Tailwind CSS, then `jekyll build`).
- **Manual setup required**: In repo Settings → Pages → Source, select "GitHub Actions" (not "Deploy from a branch").

## Modernization TODOs

The site is ~8 years old (Start Bootstrap Resume template, 2017). The plan is to modernize with **Jekyll** (native GitHub Pages SSG with blog support) and **Tailwind CSS**.

### ~~1. Migrate to Jekyll~~ ✅ DONE
- ~~Convert `index.html` to Jekyll project structure (`_layouts/`, `_includes/`, `_config.yml`)~~
- ~~Set up Jekyll-compatible directory structure~~
- ~~Create reusable layout templates (default, page, post)~~
- ~~Extract repeated HTML sections (nav, head, footer) into `_includes/`~~
- ~~Configure `_config.yml` with site metadata, permalink structure, and build settings~~
- ~~GitHub Actions workflow for deployment~~
- Update GitHub Pages settings: Source → "GitHub Actions" (manual step)

### ~~2. Replace CSS Framework with Tailwind~~ ✅ DONE
- ~~Remove Bootstrap 4 beta and all vendored CSS~~
- ~~Install and configure Tailwind CSS v4 (via `@tailwindcss/cli`)~~
- ~~Rewrite all styles using Tailwind utility classes~~
- ~~Replace SCSS variables/mixins with Tailwind `@theme` config and CSS custom properties~~
- ~~Remove the entire `scss/` directory and compiled CSS once migration is complete~~
- ~~Ensure responsive design works with Tailwind breakpoints~~

### 3. ~~Remove jQuery & Modernize JS~~ ✅ DONE
- ~~Rewrite smooth scrolling with native `scroll-behavior: smooth` CSS + `scrollIntoView()`~~
- ~~Rewrite menu toggle with vanilla JS~~
- ~~Replace jQuery scrollspy with Intersection Observer API~~
- ~~Remove jQuery, jQuery Easing, Popper.js dependencies~~
- ~~Clean up `vendor/jquery/` and `vendor/jquery-easing/` directories (dead files, can delete)~~ ✅ removed in step 2

### 4. Replace Build Tooling
- Remove Gulp 4 and all gulp-* devDependencies (already upgraded from Gulp 3)
- Remove `gulpfile.js`
- Let Jekyll handle the build pipeline (or add a minimal PostCSS step for Tailwind)
- Remove IE8 compatibility targeting
- Update `package.json` — clean up metadata, scripts, and dependencies
- Stop committing built artifacts; update `.gitignore`

### ~~5. Update Icons~~ ✅ DONE
- ~~Replace Font Awesome 4.7 with Font Awesome 6 (CDN)~~
- ~~Remove Devicons (unused)~~
- ~~Remove Simple Line Icons (unused)~~

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
