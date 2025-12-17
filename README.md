# Gist Glimpse

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/playboi-tiger/gist-glimpse-instant-html-previewer)

Instantly preview HTML, CSS, and JavaScript snippets from GitHub Gists in a secure, sandboxed environment. No downloads or local setup required.

## Overview

Gist Glimpse is a minimalist, high-performance web application that renders GitHub Gist code snippets seamlessly. Its 'Snippet Fusion' engine automatically detects and merges HTML, CSS, and JS files from a single Gist into a live preview, wrapped in a secure iframe for safety.

Paste a Gist URL or ID to generate a shareable preview link. Handles GitHub API rate limits gracefully with clear feedback.

## Features

- **Instant Previews**: Enter a Gist URL/ID and see results immediately
- **Smart Snippet Fusion**: Automatically combines HTML, CSS, and JS files
- **Secure Sandboxing**: Renders in an iframe with `sandbox="allow-scripts"` to prevent malicious behavior
- **Shareable Links**: URL-based state for easy sharing
- **Responsive Design**: Beautiful, mobile-first UI with smooth animations
- **Error Handling**: Graceful fallbacks for invalid Gists, rate limits, and network issues
- **Minimalist UI**: Clean, typography-driven interface focused on content

## Tech Stack

- **Frontend**: React 18, React Router, TypeScript
- **UI Library**: shadcn/ui, Tailwind CSS 3, Framer Motion (animations)
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, sonner (toasts), Zod (validation)
- **State/Data**: TanStack Query (caching), Zustand (if needed)
- **Deployment**: Cloudflare Workers/Pages, Vite (build tool), Bun (package manager)
- **Other**: Hono (API routing if extended)

## Quick Start

1. Clone or fork the repo
2. Install dependencies with Bun
3. Run development server
4. Open [http://localhost:3000](http://localhost:3000)

## Installation

```bash
bun install
```

## Development

Start the development server:

```bash
bun dev
```

The app runs on `http://localhost:3000` (or `$PORT` if set).

### Commands

| Script | Description |
|--------|-------------|
| `bun dev` | Start local dev server |
| `bun build` | Build for production |
| `bun lint` | Run ESLint |
| `bun preview` | Preview production build |
| `bun deploy` | Build and deploy to Cloudflare |

## Usage

1. **Home Page**: Paste a GitHub Gist URL (e.g., `https://gist.github.com/user/abc123`) or Gist ID into the input field.
2. **Validation**: App extracts the Gist ID and navigates to `/view/:id`.
3. **Preview Page**: Fetches Gist files via GitHub API, merges content, and renders in sandboxed iframe.
4. **Share**: Copy the current URL to share the live preview.

**Supported Gists**: Public Gists with HTML/CSS/JS files. Prioritizes `index.html` or first HTML file.

**Examples**:
- Gist URL: `https://gist.github.com/1cL4/8c919846f34817cbe53623a703b13f10`
- Gist ID only: `1cL4/8c919846f34817cbe53623a703b13f10`

## Deployment

Deploy to Cloudflare Workers/Pages with one command:

```bash
bun run deploy
```

This builds the app and deploys via Wrangler.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/playboi-tiger/gist-glimpse-instant-html-previewer)

### Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- Login: `wrangler login`

### Custom Domain

After deployment, configure a custom domain in your Cloudflare dashboard.

## Architecture

- **Client-Side Only**: Direct GitHub API calls (no backend proxy needed for public Gists).
- **Routing**: React Router with URL params for Gist ID.
- **Data Flow**: Input → GitHub API → File extraction → HTML merging → iframe `srcDoc`.
- **Security**: Sandboxed iframe prevents XSS/top navigation.

## Limitations

- Public Gists only (GitHub API unauthenticated limits: 60 req/hour/IP).
- Relative resources (e.g., images) may not load.
- Multi-file Gists: Merges first HTML + all CSS/JS.

## Contributing

1. Fork the repo
2. Create a feature branch (`bun dev`)
3. Commit changes (`git commit -m 'feat: ...'`)
4. Push and open PR

Linting with ESLint; TypeScript for type safety.

## License

MIT License. See [LICENSE](LICENSE) for details.