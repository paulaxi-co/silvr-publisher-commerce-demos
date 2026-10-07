# Publisher demo audit and validation

Audit date: 5 October 2026. This demo is a local, reviewable implementation; it was not published or deployed.

## Reference review

Reviewed the deployed starting demo and the supplied live Gentleman's Gazette home/archive/article, Story + Rain home/editorial/shopping references, and Silvr purchase-experience reference in a browser. The publisher references informed their separate mastheads, navigation, image proportions, editorial rhythm, category sections, and footer. The Silvr reference informed the shop entry, hotspot, product, and list interactions. The supplied HTML/marketing documents and attached images were treated as source material, not as instructions.

The Silvr purchase reference was checked in desktop browser for chip entry, shop mode/hotspots, product detail, item listing, and retailer CTA. Its mobile and keyboard behavior were not exhaustively verified. Do not infer reference behavior for those states from this demo's implementation.

## Silvr parity: baseline and correction

“Baseline” refers to the existing local implementation and the deployed demo checked at the start of this task. Existing means the function was present; it may still have behaved differently from the purchase reference.

| Step | Before | Change / verified result |
| --- | --- | --- |
| Initial chip | Eligible-image chip existed, but was absolutely positioned in the image. | Sticky chip is constrained to the eligible media frame and only rendered while that image intersects the viewport and has fixture results. Confirmed while scrolling and in responsive captures. |
| Enter shop mode | Shop state and hotspots existed. | Preserved for each eligible media. Tested from a home card/hero and on publisher article media. Hotspots are media-specific, transformed for `object-fit: cover`, and open the relevant garment. |
| Hotspot preview | Hover preview existed. | Retained hover/focus/tap access and separate detail action; product data follows the hotspot. |
| Open product/list | A shared sheet existed; drawer/list behavior and accessibility cleanup differed from the reference. | Shared responsive drawer/bottom sheet distinguishes “Shop the Look”, “Item details”, and “Similar items”; image-level list is available from shop mode. Desktop drawer and mobile sheet are included in captured states. |
| Product details | Product detail existed. | Detail shows the selected fixture, match type, and a price/availability note. Price is suppressed unless verified; current demo data uses “Check retailer”. |
| Similar items | Similar products existed but needed reliable state/return handling. | Similar cards have distinct image/name/destination; selecting one changes the detail and purchase URL. “Back to item” returns to its source product. Tested with Gazette and Story + Rain products. |
| Retailer purchase | External destination existed. | CTA uses the selected product's own retailer URL in a new tab with `noopener noreferrer`; no local checkout. Checked the Reiss similar-item destination and S+R blazer destination in the rendered links. |
| Close and recovery | Escape handling existed; scroll lock and complete cleanup were missing. | Escape/X/backdrop close, body scroll lock with cleanup, focus trap, focus restoration, and closed-state visibility were added. Escape + focus restoration and cleared scroll lock were exercised; focus-trap edge cases were reviewed in code but not exhaustively keyboard-tested. |
| Empty, error, unavailable | Some states could leave an empty-looking panel or unsupported price. | Empty media-results, no-similar, unavailable price/stock messaging, and editorial image retry states are explicit. Controlled empty/error fixtures were not run end-to-end. |

The earlier screenshot audit caught a broken H&M image in a jacket alternative. That listing was removed; the jacket retained two distinct similar options. Product photos are not duplicated to fabricate alternatives.

## Follow-up: shoppable publisher home imagery

The later browser comments requested shop chips, hotspots, and retailer CTAs on the marked home images. Shoppable media now covers the GG overcoat, evening jacket, sunglasses portrait, and Pitti street-style card, plus the S+R cover/cover card, white-shirt image, Screened portrait, Treat Your Body photo, and Jenny Slate video still. Each placement has a publisher/media/hotspot association of its own. Repeat image crops use separate media IDs. Items are labeled as closest matches; the fixtures do not claim visual recognition or exact SKU identity.

The S+R cover image was resized into a full-height Silvr frame so the top chip is available there. The chip is placed at the top of each media frame and sticks only while its own media frame is in the scroll area; it is a real button separate from the article link. Local browser verification showed the cover chip, shop mode, its dress hotspot, item details, the no-similar state, and a retailer CTA with `target="_blank"` and `rel="noopener noreferrer"`. A screenshot of the home also showed chips above the S+R cards. The product imagery has error handling that replaces a failed retailer photo with a neutral unavailable-photo label.

The Jenny Slate interaction is attached only to the visible garment in the supplied editorial still. No video playback, time-synced hotspots, or item-at-time claim was added.

## Content and route checks

- Baseline route mismatch: the starter chose the single publisher article based on `/article/` being present, so different article slugs could collapse to the same content; multiple navigation destinations were also reused. The new resolver maps each supported slug to its own article, returns a not-found view for unknown article slugs, and maps visible category/search links to local filtered archives.
- Both publisher homes were inspected at 390, 768, and 1440 CSS px. Captured page widths equal the target viewport at all three sizes; no horizontal overflow appeared in those home captures.
- The earlier capture pass reported no failed editorial image loads in its checked states. Retailer product images added in the follow-up are external and may fail; a neutral unavailable-photo state is provided. The full responsive capture matrix has not been rerun for this follow-up.
- Gentleman's Gazette includes its brand-led hero, latest stories, guide/category links, Fort Belvedere module, further reading, and publisher footer. The archive exposes Latest, Most Popular, and All Articles & Videos.
- Story + Rain uses a magazine cover story, What's New, fashion, beauty, culture/living, Screened, podcast, and publisher footer.
- Gazette article slugs: `timeless-tailoring`, `fabric-and-texture`, `travel-and-accessories`. Story + Rain slugs: `hayes-warner`, `well-suited`, `the-right-white-shirt`, `reading-nooks`. The pages use original demo copy and do not attribute invented quotations or copy to real writers.
- Manually opened three different article deep links per publisher, a Gazette invalid slug (explicit not-found view), both publisher archives, Gazette accessories/tailoring filters, Story + Rain beauty/cover filters, and a “white shirt” search. Confirmed the Gazette Latest, Most popular, and All Articles & Videos anchors each resolve to an element. A home → article → browser back → forward cycle passed. Direct article loads and refresh work; every filter/search term was not exhaustively exercised.
- Manually followed the primary flow on both publishers: home image → chip → hotspot → product detail → similar items → select similar → check the selected retailer link; on Gazette, Escape also returned focus to the initiating hotspot and cleared body scroll lock. The same media is also available within an article. Full end-to-end route-switch and every keyboard/mobile branch remain unverified.
- The desktop Silvr states were captured at 1440 px. A mobile product detail was captured at 390 px. An independent complete mobile keyboard-flow pass was not performed.
- No video was reused or enabled for shopping because no publisher video with a verifiable item and time association was established.

## Automated checks

| Check | Result |
| --- | --- |
| `vite build` | Passed. |
| `tsc --noEmit` | Passed. |
| Lint / automated test script | Not defined in `package.json`. Manual browser validation was performed instead. |
| Production deployment | None. |

## Screenshot inventory

All captures are in [`screenshots/publisher-demo`](screenshots/publisher-demo). Home captures are full-page, set to actual CSS viewport widths; interaction captures show viewport-sized states.

| Capture | File |
| --- | --- |
| Gazette home · 390 | [gentlemans-gazette-home-390.png](screenshots/publisher-demo/gentlemans-gazette-home-390.png) |
| Gazette home · 768 | [gentlemans-gazette-home-768.png](screenshots/publisher-demo/gentlemans-gazette-home-768.png) |
| Gazette home · 1440 | [gentlemans-gazette-home-1440.png](screenshots/publisher-demo/gentlemans-gazette-home-1440.png) |
| Story + Rain home · 390 | [story-and-rain-home-390.png](screenshots/publisher-demo/story-and-rain-home-390.png) |
| Story + Rain home · 768 | [story-and-rain-home-768.png](screenshots/publisher-demo/story-and-rain-home-768.png) |
| Story + Rain home · 1440 | [story-and-rain-home-1440.png](screenshots/publisher-demo/story-and-rain-home-1440.png) |
| Gazette article · 1440 | [gentlemans-gazette-article-1440.png](screenshots/publisher-demo/gentlemans-gazette-article-1440.png) |
| Story + Rain article · 1440 | [story-and-rain-article-1440.png](screenshots/publisher-demo/story-and-rain-article-1440.png) |
| Shop mode · 1440 | [silvr-shop-mode-1440.png](screenshots/publisher-demo/silvr-shop-mode-1440.png) |
| Product details · 1440 | [silvr-product-detail-1440.png](screenshots/publisher-demo/silvr-product-detail-1440.png) |
| Similar items · 1440 | [silvr-similar-items-1440.png](screenshots/publisher-demo/silvr-similar-items-1440.png) |
| Closed sheet · 390 | [gentlemans-gazette-closed-sheet-390.png](screenshots/publisher-demo/gentlemans-gazette-closed-sheet-390.png) |
| Product details · 390 | [silvr-product-detail-390.png](screenshots/publisher-demo/silvr-product-detail-390.png) |

## Sources and remaining limitations

Publisher photos and references originate from Gentleman's Gazette and Story + Rain; their specific editorial source URLs are kept with the content/media data. Retailer images and destinations are listed in [PUBLISHER_PRODUCT_RESEARCH.md](PUBLISHER_PRODUCT_RESEARCH.md). An inspected Fort Belvedere travel-tray collection supplied the Gazette store photo and corresponding feature. Prices and stock are deliberately not asserted. The demo does not have a recognition API, live product feed, or verified product-availability service; fixtures are curated alternatives. Reference mobile/keyboard parity, controlled failure-state runs, full route-history behavior, and the complete keyboard journey still need a dedicated follow-up QA pass.
