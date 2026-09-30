# Silvr Publisher Commerce Demos

Responsive, local publisher pages that demonstrate Silvr's shoppable editorial experience for Gentleman's Gazette and Story + Rain. Eligible fashion imagery can reveal garment hotspots, product details, retailer links, and related items while preserving the publisher's visual identity.

## Technologies

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- npm

## Local setup

Use Node.js 20.19+ or 22.12+ with npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL. The publisher pages can be opened directly at the routes below.

## Publisher routes

- `/gentlemans-gazette` — publisher homepage with a shoppable featured image and editorial notes.
- `/gentlemans-gazette/article/timeless-tailoring` — complete tailoring article with shoppable media.
- `/story-and-rain` — publisher homepage with a shoppable fashion editorial and new style features.
- `/story-and-rain/article/well-suited` — complete fashion article with shoppable media.
- `/` — a publisher demo selector linking to both experiences.
- `/silvr-original-demo` — the original Silvr interaction demo retained in the project.

Story + Rain's demo uses its “Well Suited” editorial image and does not reuse the original Silvr demo video. Both publisher experiences use the shared Silvr chip, hotspot, product sheet, similar-items, and retailer-redirection components.

## Development and build commands

```bash
npm run dev       # start the Vite development server
npm run build     # create the production build in dist/
npm run preview   # preview the production build locally
npx tsc --noEmit  # check TypeScript types
```

The project currently defines no `lint` or `test` scripts.

## Eligible media and hotspots

Publisher images and videos are rendered through the reusable `PublisherMedia` component in `src/PublisherPages.tsx`. It reads media metadata from `src/publisherCatalog.ts`. The shared observer in `src/App.tsx` shows the Silvr entry chip only while an eligible media frame intersects the viewport and measures at least 240 × 180 CSS pixels. Editorial and fashion-readability flags keep logos, ads, decorative assets, and unclear or small images out of the shopping experience.

Hotspot locations are percentages of the source image. The shared image component accounts for `object-fit: cover` cropping and recalculates placement on resize. Chips and hotspots are positioned inside each relative media frame, so they travel with their image while the page scrolls.

To add another shoppable image or video:

1. Inspect the visible garments and add a media record to `PUBLISHER_MEDIA` with a unique ID, source, media type, descriptive alt text, eligibility flags, and hotspot IDs.
2. Add a `HOTSPOTS` record for each confidently identifiable garment. Set `x` and `y` as percentages on the source media.
3. Add a researched primary product and at least three same-category alternatives to `RETAIL_PRODUCTS`, including each item's product image, price, currency, retailer URL, source URL, category, and match classification. Use `Exact match` only when verified.
4. Place `<PublisherMedia mediaId="..." />` in the publisher page where the media belongs. The same component works in features, article bodies, listings, and galleries.

Product details and retailer URLs are mock catalog data and may change as retailer prices, availability, and sizes change. `PUBLISHER_PRODUCT_RESEARCH.md` records garment observations, product links, and match limitations.
