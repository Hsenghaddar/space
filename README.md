# SPACE men's wear

A phone-first React + Vite storefront for Space Men and Space Kids, with Home, Shop, Favorites, About, Contact, and Checkout. Men remains the primary collection. React is installed through npm; source components use JSX.

## Run locally

`npm install` then `npm run dev`. On Windows PowerShell with script restrictions, use `npm.cmd` instead of `npm`. The default port is 5173. If it is occupied, use `npm.cmd run dev -- --port 5174`.

`npm run build` produces `dist/`. `npm run preview` serves the production build.

## Deploy on Vercel

Import `Hsenghaddar/space` from GitHub in Vercel. Use framework preset **Vite**, root directory **./**, build command **npm run build**, and output directory **dist**. Leave the install command at its default. No environment variables are required for the current storefront.

`vercel.json` records the build settings. Pages use hash routes (`/#/shop`), so no SPA rewrite is required. Product photos and catalog JSON are served from `public/` and included in the build. `.vercelignore` excludes raw sources and review artifacts from CLI uploads.

Whish remains a design-only checkout option until payment details and processing are connected. GitHub pushes to the linked production branch trigger new Vercel deployments.

## Catalog and pricing

The working catalog has 111 product images: the existing 83 men's photos and 28 reviewed product reel-cover photos from `spacekids.leb`. Matching color records are grouped into 62 products (34 men, 28 kids). The kids selection uses clear outfit photographs without promotional captions over the garments. Product names describe the photographed looks rather than manufacturer SKUs.

Base men's records live in `src/products.js`; remaining records load from `public/imported-products.json` and `public/kids-products.json`. Kids records explicitly use `department: "kids"`; legacy records default to Men. Visible source prices are preserved. Missing prices use user-requested estimates; their basis is in `src/pricing.js` and the kids import manifest. Prices are displayed without an estimate prefix. Source and retouch notes are in `SOURCE_NOTES.md`. Delivery images are compressed JPEGs; lossless retouched originals are under `source-assets/retouched`.

Run `node scripts/check-catalog.mjs` to check catalog integrity.

Run `node scripts/check-variants.mjs` to verify grouping, retained photos, variant filters, required sizing, and distinct bag lines. `src/variants.js` groups matching styles within source families, preserves duplicate-color photographs in a gallery, and keeps visibly different jacket designs separate. All source records and images remain intact.

## Shopping features

- Search, category/color/price filters, sorting, and incremental loading.
- Shop opens to Men; Men, Kids, and All pieces have shareable hash routes. Category and color choices follow the selected collection. Header search covers both collections.
- Home keeps the original hero, adds a Men/Kids entry section, retains the men's category edit, and features two men's and two kids' pieces.
- Favorites and bag quantities persist in browser localStorage.
- Color swatches under cards and in product details change the selected photograph and price. Favorites belong to the grouped product. S/M/L are selectable in product details; a size is required before adding to the bag. These are the user's requested prototype size choices, not verified inventory. Source age ranges remain in the original kids catalog data.
- Each color/size combination has a separate bag key. Bag, checkout, and the WhatsApp inquiry preserve the selected color and size.
- Product details use Add to bag; the bag leads to Checkout.
- Checkout includes delivery fields, an order summary, Whish Money and cash options. Its final button prepares an order in WhatsApp.
- Kids product inquiries and kids-only orders use +961 78 999 072, the public number on `spacekids.leb`. Men's and mixed orders use the existing Space Men number. Order lines identify each collection.
- Whish is design-only as requested. Add recipient details or a payment link in `src/storeConfig.js` later. No wallet charge or payment verification is implemented.

No mobile bottom navigation is included. Navigation, favorites, search, and bag controls are in the compact sticky header.

## Design references

Ivory, champagne gold, charcoal, editorial product imagery, and spatial architectural motifs. Interaction inspiration came from the user's [House of Power project](https://github.com/Hsenghaddar/house-of-power). Contemporary editorial references are listed in `SOURCE_NOTES.md`.
