# Silvr Publisher Commerce Demos

Two responsive editorial demos for Gentleman's Gazette and Story + Rain. Each keeps its publisher's own visual identity and content structure while sharing the Silvr media, hotspot, product, similar-items, and retailer-link flow.

## Run locally

Use Node.js 20.19+ or 22.12+ with npm.

```bash
npm install
npm run dev
npm run build
npx tsc --noEmit
```

There are no repository `lint` or automated `test` scripts.

## Routes

- `/` — choose a publisher.
- `/gentlemans-gazette` — editorial home; `/gentlemans-gazette/archive` and `/gentlemans-gazette/search?q=...` — useful archive/search routes.
- `/gentlemans-gazette/article/timeless-tailoring`, `/gentlemans-gazette/article/fabric-and-texture`, `/gentlemans-gazette/article/travel-and-accessories` — three distinct demo guides.
- `/story-and-rain` — editorial home; `/story-and-rain/archive`, `/story-and-rain/archive?category=fashion`, `/story-and-rain/search?q=...` — archive/search routes.
- `/story-and-rain/article/hayes-warner`, `/story-and-rain/article/well-suited`, `/story-and-rain/article/the-right-white-shirt`, `/story-and-rain/article/reading-nooks` — distinct demo features and shopping edit.
- Unknown publisher article slugs render an explicit not-found view. Routes resolve on direct load and refresh.

## Silvr integration

`src/App.tsx` owns the shared interaction and `src/publisherCatalog.ts` owns the local content-to-product fixtures. The media observer caches per image, only exposes the chip while an eligible image is in view, and maps hotspots through `object-fit: cover` cropping. Cards keep editorial navigation separate from the Silvr chip. The drawer supports Escape/X close, focus containment/restoration, and body scroll lock; similar products use their own retailer links. The shopping CTA opens the retailer in a new tab with `noopener noreferrer`.

The checkout has no product-recognition API or credentials. `CATALOG_ADAPTER` explicitly identifies the hand-authored fixtures as visual alternatives, not recognition results. Prices and availability are unverified, so the UI says “Check retailer” and links out. No publisher video has a verified product/time association; the demo does not make videos shoppable.

## Research and QA

- [Publisher source, product-match, and price-verification notes](PUBLISHER_PRODUCT_RESEARCH.md)
- [Reference parity, implementation audit, validation results, and screenshot inventory](PUBLISHER_DEMO_AUDIT.md)
- Screenshots: [screenshots/publisher-demo](screenshots/publisher-demo)

Source photographs and product imagery are attributed in the publisher content and research notes. Demo article copy is original and is not attributed to the real publishers' authors.
