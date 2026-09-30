import type { Product, StoreItem } from "./productCatalog"

export type MatchType = "Exact match" | "Closest match" | "Similar item"
export type RetailProduct = {
  productId: string; mediaId?: string; hotspotId?: string; brand: string; productName: string
  category: string; color: string; pattern: string; price: string; currency: "USD" | "EUR" | "AUD"
  productImage: string; retailerUrl: string; matchType: MatchType; matchConfidence: number
  sourceUrl: string; similarProductIds: string[]
}
export type EditorialMedia = {
  id: string; type: "image" | "video"; src: string; alt: string; editorial: boolean
  fashionReadable: boolean; hotspotIds: string[]; frameClassName?: string
  chipCorner?: "bottom-left" | "top-left"
}
export type HotspotRecord = { id: string; mediaId: string; productId: string; x: number; y: number; offsetX?: number; garment: string }

type Input = Omit<RetailProduct, "productId" | "sourceUrl" | "similarProductIds" | "matchType" | "matchConfidence"> & { confidence?: number; similar?: string[] }
function listing(productId: string, input: Input): RetailProduct {
  const { confidence, similar, ...rest } = input
  return { productId, ...rest, sourceUrl:rest.retailerUrl, similarProductIds:similar ?? [], matchType:similar ? "Closest match" : "Similar item", matchConfidence:confidence ?? .7 }
}

// Retailer names, prices and product photos are tied to the linked product listing.
// Photographed SKUs have not been independently verified, so primaries are closest matches.
export const RETAIL_PRODUCTS: Record<string, RetailProduct> = {
  "gg-jacket-zara": listing("gg-jacket-zara", { brand:"Zara", productName:"Houndstooth Double-Breasted Blazer", category:"Men's blazer", color:"Brown", pattern:"Houndstooth check", price:"$179", currency:"USD", productImage:"https://static.zara.net/assets/public/55bb/a63b/28f6446595c3/4436f7e900cc/04683667700-p/04683667700-p.jpg?f=auto&ts=1790065489713&w=560", retailerUrl:"https://www.zara.com/us/en/houndstooth-double-breasted-blazer-p04683667.html", confidence:.86, similar:["gg-jacket-reiss","gg-jacket-wessi","gg-jacket-hm"] }),
  "gg-jacket-reiss": listing("gg-jacket-reiss", { brand:"Reiss", productName:"Penso Wool-Blend Check Double-Breasted Suit Blazer", category:"Men's blazer", color:"Chocolate brown", pattern:"Prince of Wales check", price:"$347", currency:"USD", productImage:"https://cdn.platform.next/common/items/default/default/itemimages/3_4Ratio/product/lge/V79129s.jpg?im=Resize%2Cwidth%3D750", retailerUrl:"https://www.reiss.com/us/en/style/sv076152/v79129" }),
  "gg-jacket-wessi": listing("gg-jacket-wessi", { brand:"Wessi", productName:"Checked Double Breasted Brown Men Blazer", category:"Men's blazer", color:"Brown", pattern:"Check", price:"$199", currency:"USD", productImage:"https://www.wessi.com/cdn/shop/files/output_5dc0e192-bb55-48d3-8cf6-ea12505be008.png?v=1765993860&width=1080", retailerUrl:"https://www.wessi.com/products/checked-double-breasted-brown-men-blazer-wessi" }),
  "gg-jacket-hm": listing("gg-jacket-hm", { brand:"H&M", productName:"Regular Fit Wool Blend Double Breasted Jacket", category:"Men's blazer", color:"Brown / black", pattern:"Check", price:"$149", currency:"AUD", productImage:"https://image.hm.com/assets/hm/06/15/061583cedf1bc98fc1c3300709c0be0a2884cc85.jpg?imwidth=2160", retailerUrl:"https://www2.hm.com/en_au/productpage.1295785001.html" }),
  "gg-shirt-twill": listing("gg-shirt-twill", { brand:"Charles Tyrwhitt", productName:"Non-Iron Twill Shirt - Light Blue", category:"Men's dress shirt", color:"Light blue", pattern:"Solid twill", price:"$129", currency:"USD", productImage:"https://www.charlestyrwhitt.com/dw/image/v2/AAWJ_PRD/on/demandware.static/-/Sites-ctshirts-master/default/dwa9980d27/hi-res/FON2637CEB_MODEL_FULL.jpg?sh=1200&sw=960", retailerUrl:"https://www.charlestyrwhitt.com/us/non-iron-twill-shirt---light-blue/FON2638CEB14H2S.html", confidence:.8, similar:["gg-shirt-oxford","gg-shirt-greenwich","gg-shirt-sky"] }),
  "gg-shirt-oxford": listing("gg-shirt-oxford", { brand:"Charles Tyrwhitt", productName:"Non-Iron Stretch Oxford Shirt - Light Blue", category:"Men's dress shirt", color:"Light blue", pattern:"Solid Oxford", price:"$139", currency:"USD", productImage:"https://www.charlestyrwhitt.com/dw/image/v2/AAWJ_PRD/on/demandware.static/-/Sites-ctshirts-master/default/dwd4586c8d/SCS/SCS0068LBU/SCS0068LBU_MODEL_FULL_02.jpg?sh=1200&sw=960", retailerUrl:"https://www.charlestyrwhitt.com/us/non-iron-stretch-oxford-shirt---light-blue/SCS0065LBU175S.html" }),
  "gg-shirt-greenwich": listing("gg-shirt-greenwich", { brand:"Charles Tyrwhitt", productName:"Non-Iron Stretch Greenwich Weave Shirt - Light Blue", category:"Men's dress shirt", color:"Light blue", pattern:"Solid textured weave", price:"$139", currency:"USD", productImage:"https://www.charlestyrwhitt.com/dw/image/v2/AAWJ_PRD/on/demandware.static/-/Sites-ctshirts-master/default/dw6bb35264/FOA/FOA0012LBU/FOA0012LBU_MODEL_FULL_02.jpg?sh=1200&sw=960", retailerUrl:"https://www.charlestyrwhitt.com/us/non-iron-stretch-greenwich-weave-shirt---light-blue/FOA0015LBU14H2S.html" }),
  "gg-shirt-sky": listing("gg-shirt-sky", { brand:"Charles Tyrwhitt", productName:"Non-Iron Twill Shirt - Sky Blue", category:"Men's dress shirt", color:"Sky blue", pattern:"Solid twill", price:"$129", currency:"USD", productImage:"https://www.charlestyrwhitt.com/dw/image/v2/AAWJ_PRD/on/demandware.static/-/Sites-ctshirts-master/default/dw793222ce/SCB/SCB0005SKY/SCB0005SKY_MODEL_TIE_07.jpg?sh=1200&sw=960", retailerUrl:"https://www.charlestyrwhitt.com/us/non-iron-twill-shirt---sky-blue/SCB0005SKY.html" }),
  "sr-blazer-gelso": listing("sr-blazer-gelso", { brand:"The Frankie Shop", productName:"Gelso Oversized Blazer - Dark Grey Melange", category:"Women's blazer", color:"Dark grey melange", pattern:"Solid", price:"$425", currency:"USD", productImage:"https://thefrankieshop.com/cdn/shop/files/image00089_8d82ef79-8cd8-4d3b-a65f-e2b71d224444.jpg?v=1706875814&width=1200", retailerUrl:"https://thefrankieshop.com/products/gelso-oversized-blazer-dark-grey-melange", confidence:.82, similar:["sr-blazer-bea","sr-blazer-dee","sr-blazer-pia"] }),
  "sr-blazer-bea": listing("sr-blazer-bea", { brand:"The Frankie Shop", productName:"Bea Blazer - Charcoal", category:"Women's blazer", color:"Charcoal", pattern:"Solid", price:"$385", currency:"USD", productImage:"https://thefrankieshop.com/cdn/shop/products/BeaBlazer-Charcoal-BeaSuitPants-Charcoal-savanah-29juin43481_1.jpg?v=1665436303&width=1200", retailerUrl:"https://thefrankieshop.com/products/bea-blazer-charcoal" }),
  "sr-blazer-dee": listing("sr-blazer-dee", { brand:"The Frankie Shop", productName:"Dee Maxi Oversized Blazer - Charcoal", category:"Women's blazer", color:"Charcoal", pattern:"Solid", price:"€379", currency:"EUR", productImage:"https://eu.thefrankieshop.com/cdn/shop/products/Dee-Maxi-Oversized-Blazer-Charcoal-l8341.jpg?v=1661204003&width=1200", retailerUrl:"https://eu.thefrankieshop.com/products/dee-maxi-oversized-blazer-charcoal" }),
  "sr-blazer-pia": listing("sr-blazer-pia", { brand:"The Frankie Shop", productName:"Pia Boxy Blazer - Grey", category:"Women's blazer", color:"Grey", pattern:"Solid", price:"$263", currency:"USD", productImage:"https://thefrankieshop.com/cdn/shop/files/PIA-BOXY-BLAZER-GREY-LETA-202459513.jpg?v=1708080896&width=1200", retailerUrl:"https://thefrankieshop.com/products/pia-boxy-blazer-grey" }),
  "sr-vest-gelso": listing("sr-vest-gelso", { brand:"The Frankie Shop", productName:"Gelso Waistcoat - Dark Grey Melange", category:"Women's waistcoat", color:"Dark grey melange", pattern:"Solid", price:"$235", currency:"USD", productImage:"https://thefrankieshop.com/cdn/shop/files/gelso-waistcoat-dark-grey-melange-vest-the-frankie-shop-666209_de4c57b2-d910-4bea-bd20-a97ec5f3ec90.jpg?v=1749896499&width=1200", retailerUrl:"https://thefrankieshop.com/products/gelso-waistcoat-dark-grey-melange", confidence:.82, similar:["sr-vest-ivey","sr-vest-bettas","sr-vest-holborn"] }),
  "sr-vest-ivey": listing("sr-vest-ivey", { brand:"The Frankie Shop", productName:"Ivey Vest - Grey Melange", category:"Women's waistcoat", color:"Grey melange", pattern:"Light plaid", price:"$48", currency:"USD", productImage:"https://thefrankieshop.com/cdn/shop/files/IVEY-VEST-GREY-MELANGE-JULIA-22135.jpg?v=1747995821&width=1200", retailerUrl:"https://thefrankieshop.com/products/ivey-vest-grey-melange" }),
  "sr-vest-bettas": listing("sr-vest-bettas", { brand:"By Malene Birger", productName:"Bettas Waistcoat - Grey Melange", category:"Women's waistcoat", color:"Grey melange", pattern:"Solid", price:"€104", currency:"EUR", productImage:"https://eu.thefrankieshop.com/cdn/shop/products/BY-MALENE-BIRGER-BETTAS-WAISTCOAT-GREY-MELANGE-TARA-47046.jpg?v=1710339201&width=1200", retailerUrl:"https://eu.thefrankieshop.com/products/by-malene-birger-bettas-waistcoat-grey-melange" }),
  "sr-vest-holborn": listing("sr-vest-holborn", { brand:"The Frankie Shop", productName:"Holborn Double-Breasted Vest - Grey Melange", category:"Women's waistcoat", color:"Grey melange", pattern:"Solid", price:"€235", currency:"EUR", productImage:"https://eu.thefrankieshop.com/cdn/shop/files/HOLBORN-DOUBLE-BREASTED-VEST-GREY-MELANGE-MAME-0954-W.jpg?v=1780906418&width=1200", retailerUrl:"https://eu.thefrankieshop.com/products/holborn-double-breasted-vest-grey-melange" }),
}

export const HOTSPOTS: Record<string, HotspotRecord> = {
  "gg-jacket": { id:"gg-jacket", mediaId:"gg-group-portrait", productId:"gg-jacket-zara", x:43, y:66, garment:"brown checked double-breasted jacket" },
  "gg-shirt": { id:"gg-shirt", mediaId:"gg-group-portrait", productId:"gg-shirt-twill", x:46, y:44, garment:"pale blue dress shirt" },
  "sr-blazer": { id:"sr-blazer", mediaId:"sr-lily-suit", productId:"sr-blazer-gelso", x:37, y:45, offsetX:3, garment:"oversized grey blazer" },
  "sr-waistcoat": { id:"sr-waistcoat", mediaId:"sr-lily-suit", productId:"sr-vest-gelso", x:53, y:39, offsetX:2, garment:"grey tailored waistcoat" },
}
export const PUBLISHER_MEDIA: Record<string, EditorialMedia> = {
  "gg-group-portrait": { id:"gg-group-portrait", type:"image", src:"/assets/gg-editorial-banner.jpg", alt:"Three Gentleman's Gazette contributors in tailoring; the central man wears a brown checked double-breasted jacket and pale blue shirt", editorial:true, fashionReadable:true, hotspotIds:["gg-jacket","gg-shirt"], frameClassName:"gazette-media-frame", chipCorner:"top-left" },
  "sr-lily-suit": { id:"sr-lily-suit", type:"image", src:"/assets/sr-well-suited.jpg", alt:"Lily Rabe in an oversized grey three-piece suit photographed for Story + Rain's Well Suited editorial", editorial:true, fashionReadable:true, hotspotIds:["sr-blazer","sr-waistcoat"], frameClassName:"storyrain-media-frame", chipCorner:"top-left" },
}
function asStoreItem(record: RetailProduct, id: number): StoreItem {
  return { ...record, id, name:record.productName, image:record.productImage, url:record.retailerUrl }
}
const productCache: Record<string, Product[]> = {}
export function productsForMedia(mediaId: string): Product[] {
  if (productCache[mediaId]) return productCache[mediaId]
  const media = PUBLISHER_MEDIA[mediaId]
  if (!media) return []
  productCache[mediaId] = media.hotspotIds.map((hotspotId, index) => {
    const hotspot = HOTSPOTS[hotspotId], record = RETAIL_PRODUCTS[hotspot.productId]
    return { ...asStoreItem({ ...record, mediaId, hotspotId }, 1000 + index), x:hotspot.x, y:hotspot.y, offsetX:hotspot.offsetX, similar:record.similarProductIds.map((id, similarIndex) => asStoreItem(RETAIL_PRODUCTS[id], 2000 + index * 100 + similarIndex)) }
  })
  return productCache[mediaId]
}
export function isEligibleEditorialMedia(media: Pick<EditorialMedia, "type" | "editorial" | "alt"> & { fashionReadable?: boolean; products?: Product[] }, width: number, height: number) {
  return media.editorial && media.fashionReadable !== false && Boolean(media.alt.trim()) && (media.type === "image" || media.type === "video") && (media.products?.length ?? 1) > 0 && width >= 240 && height >= 180
}
