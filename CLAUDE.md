# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog website for Jeffrey He, hosted at jeffreydinghe.com via GitHub Pages. Recently migrated from a Gulp-based build system to Jekyll.

## Development Commands

```bash
bundle install              # Install Ruby gem dependencies
bundle exec jekyll serve    # Run local dev server at localhost:4000
bundle exec jekyll build    # Build static site to _site/
```

No npm build step is needed — npm packages in `package.json` are vendored into `assets/vendor/` and served directly. Jekyll handles all SCSS compilation.

## Architecture

The site is a Jekyll 4.3 static site with a single-page portfolio (`index.html`) and a blog section.

**Build pipeline**: Jekyll processes Liquid templates, compiles `_sass/` SCSS to compressed CSS at `assets/css/main.scss`, and outputs everything to `_site/` (excluded from git).

**Deployment**: Pushing to the `master` branch triggers GitHub Pages to rebuild and deploy automatically.

### Key files and directories

- `_config.yml` — Jekyll configuration: site metadata, permalink structure, plugin list, sass settings
- `index.html` — Main portfolio page (single-page layout with anchor-linked sections)
- `blog.html` — Blog index listing all posts
- `_layouts/` — Base templates: `default.html` (HTML shell), `home.html` (portfolio), `post.html` (blog post)
- `_includes/nav.html` — Sidebar navigation with hamburger menu for mobile
- `_posts/` — Blog posts as Markdown files (`YYYY-MM-DD-title.md` naming required)
- `_sass/` — SCSS partials imported by `assets/css/main.scss`
- `assets/vendor/` — Vendored third-party libraries (Bootstrap 5, jQuery, Font Awesome, DevIcons)

### SCSS structure

| File | Purpose |
|------|---------|
| `_variables.scss` | Colors (primary: `#8d0e31`), fonts, layout dimensions |
| `_mixins.scss` | Reusable SCSS mixins |
| `_global.scss` | Site-wide base styles |
| `_nav.scss` | Sidebar and mobile nav |
| `_resume-item.scss` | Portfolio section/item styles |
| `_bootstrap-overrides.scss` | Bootstrap customizations |

### Blog posts

Create a new file in `_posts/` with the format `YYYY-MM-DD-slug.md` and include YAML frontmatter:

```yaml
---
title: "Post Title"
date: YYYY-MM-DD
categories: [category]
tags: [tag1, tag2]
---
```

Layout and author are set globally via `_config.yml` defaults.

### Branch strategy

- `master` — production branch (GitHub Pages deploys from here)
- `dev` — development branch (current working branch)
