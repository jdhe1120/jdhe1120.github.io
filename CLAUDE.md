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
