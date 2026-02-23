# Ichorai Website

A modern React-based website for Ichorai, built with Vite and ready for deployment to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Deployment to GitHub Pages

This project is configured for automatic deployment via GitHub Pages using the `gh-pages` package.

### Prerequisites

1. Create a new repository on GitHub (e.g., `ichorai-website`)
2. Set the remote origin:

```bash
git remote add origin https://github.com/username/ichorai-website.git
git branch -M main
git push -u origin main
```

### Deploy

Run the following command to deploy the `dist` folder to the `gh-pages` branch:

```bash
npm run deploy
```

### GitHub Pages Settings

After the first deployment, go to your repository's **Settings** → **Pages** and ensure:

- **Source**: `Deploy from a branch`
- **Branch**: `gh-pages` (root folder)

The site will be live at `https://username.github.io/ichorai-website/`.

### Base Path Configuration

If deploying to a project site (i.e., `username.github.io/repository-name`), update the `base` field in `vite.config.js`:

```js
base: '/repository-name/',
```

If deploying to a user/organization site (i.e., `username.github.io`), set `base` to `'/'`.

## Project Structure

- `src/App.jsx` – Main application component
- `src/main.jsx` – React entry point
- `public/` – Static assets
- `dist/` – Production build (generated)

## License

Proprietary