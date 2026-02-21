# Jeffrey He - Portfolio & Blog

Personal portfolio and blog built with Jekyll and hosted on GitHub Pages at [jeffreydinghe.com](https://jeffreydinghe.com).

## Tech Stack

- **Jekyll** - Static site generator
- **Bootstrap** - CSS framework
- **SCSS** - Styling (compiled automatically by Jekyll)
- **GitHub Pages** - Hosting and deployment

## Development

### Prerequisites

- Ruby (2.7 or higher)
- Bundler

### Setup

```bash
# Install dependencies
bundle install

# Run local development server
bundle exec jekyll serve

# Visit http://localhost:4000
```

The site will automatically rebuild when you make changes to files.

### Project Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # HTML templates
│   ├── default.html     # Base layout with head/scripts
│   ├── home.html        # Portfolio homepage layout
│   └── post.html        # Blog post layout
├── _includes/           # Reusable components
│   └── nav.html         # Navigation sidebar
├── _posts/              # Blog posts (Markdown)
├── _sass/               # SCSS partials
├── assets/              # Compiled assets
│   ├── css/
│   ├── js/
│   ├── img/
│   └── vendor/
├── index.html           # Homepage (portfolio)
├── blog.html            # Blog index page
└── Gemfile              # Ruby dependencies
```

## Creating Blog Posts

Create a new Markdown file in `_posts/` with the format: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-02-21
author: Jeffrey He
excerpt: "A short description of your post"
---

# Your content here

Write your post in Markdown...
```

Then commit and push. GitHub Pages will automatically build and deploy.

## Deployment

This site is configured for GitHub Pages. Simply push to the `master` branch and GitHub will automatically build and deploy the site.

The custom domain is configured via the `CNAME` file.

## License

This website's original theme was adapted from [Start Bootstrap's Resume Template](https://startbootstrap.com/template-overviews/resume/).

Copyright 2013-2017 Blackrock Digital LLC. Code released under the MIT license.
