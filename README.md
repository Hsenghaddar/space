# SPACE men's wear

A phone-first React + Vite storefront with Home, Shop, Favorites, About, Contact, and Checkout. React is installed through npm; source components use JSX.

## Run locally

`npm install` then `npm run dev`. On Windows PowerShell with script restrictions, use `npm.cmd` instead of `npm`. The default port is 5173. If it is occupied, use `npm.cmd run dev -- --port 5174`.

`npm run build` produces `dist/`. `npm run preview` serves the production build.

## Catalog and pricing

The working catalog has 83 images: 41 original highlight photos, 37 retouched product video frames, and five product reel covers from the same account. The user chose to stop at 83 and prioritize design. Product names describe the photographed looks rather than manufacturer SKUs.

Base records live in `src/products.js`; remaining records load from `public/imported-products.json`. Visible source prices are preserved. User-requested estimates are labeled `Est.` in the product UI; their basis is in `src/pricing.js`. Source and retouch notes are in `SOURCE_NOTES.md`. Delivery images are compressed JPEGs; lossless retouched originals are under `source-assets/retouched`.

Run `node scripts/check-catalog.mjs` to check catalog integrity.

## Shopping features

- Search, category/color/price filters, sorting, and incremental loading.
- Favorites and bag quantities persist in browser localStorage.
- Product details use Add to bag; the bag leads to Checkout.
- Checkout includes delivery fields, an order summary, Whish Money and cash options. Its final button prepares an order in WhatsApp.
- Whish is design-only as requested. Add recipient details or a payment link in `src/storeConfig.js` later. No wallet charge or payment verification is implemented.

No mobile bottom navigation is included. Navigation, favorites, search, and bag controls are in the compact sticky header.

## Design references

Ivory, champagne gold, charcoal, editorial product imagery, and spatial architectural motifs. Interaction inspiration came from the user's [House of Power project](https://github.com/Hsenghaddar/house-of-power). Contemporary editorial references are listed in `SOURCE_NOTES.md`.
