# Pletenyi Kit

A React single-page application for a Ukrainian handcrafted product catalog (toys, accessories, pillows, kitchen items) with category listing, product details, and care information.

## Tech stack

- **React 19** with **TypeScript**
- **Vite** for build and dev server
- **React Router 7** for routing and lazy-loaded route chunks
- **SCSS** for styles (with Stylelint)
- **Font Awesome** for icons
- **Jest** + **Testing Library** for tests

## Architecture

- **Entry:** `main.tsx` renders `App`, which provides React Router. Global styles are imported from `src/assets/scss/style.scss`.
- **Layout:** All routes are wrapped in `Layout` (skip link, `Header`, main content, `ScrollToTop`, `Footer`). `ScrollRestoration` is used for scroll position on navigation.
- **Routing:** `createBrowserRouter` in `src/router/router.tsx` defines a root layout and child routes:
  - `/` — main landing
  - `/:category` — product list (toys, accessories, pillows, kitchen), lazy-loaded
  - `/:category/:link` — product details, lazy-loaded
  - `/about-pletenyi-kit` — about page
  - `/care-conditions` — care conditions page
- **Data:** Category products and headings come from JSON in `src/data/` (toys, accessories, pillows, kitchen). The `useDetectDataType` hook reads the current `category` from the URL and loads the matching dataset.
- **UI:** Header (desktop nav + mobile sidebar), product list with sort, product details with image slider and similar items, scroll-to-top button. Mobile menu is implemented as an accessible dialog (focus, Escape, ARIA).

## Scripts

| Command   | Description                    |
| --------- | ------------------------------ |
| `npm run dev`    | Start Vite dev server          |
| `npm run build`  | TypeScript build + Vite build + sitemap generation |
| `npm run preview`| Preview production build       |
| `npm run test`   | Run Jest tests                 |
| `npm run lint`   | Stylelint (SCSS) + ESLint (TS/TSX) |
| `npm run ci`     | Lint, test, and build          |
