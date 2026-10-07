import { useState, useRef, useEffect, lazy, Suspense } from "react"
import { createPortal } from "react-dom"
import type { Product, StoreItem } from "./productCatalog"
import { isEligibleEditorialMedia } from "./publisherCatalog"
import { PublisherDemoIndex } from "./PublisherDemoIndex"

const PublisherPage = lazy(() => import("./PublisherPages").then((module) => ({ default: module.PublisherPage })))

// --- ICONS ---
const Icons = {
  ShoppingBag: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  X: ({ size = 20 } = {}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
}

// --- SHOPPING COMPONENTS ---

const Hotspot = ({ product, isActive, onHover, onLeave, onOpen }: {
  product: Product; isActive: boolean; onHover: (product: Product) => void;
  onLeave: () => void; onOpen: (product: Product) => void
}) => (
  <button
    type="button"
    data-silvr-ui="true"
    className={`hotspot absolute z-20 flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 focus-visible:scale-110 sm:h-12 sm:w-12 ${isActive ? "scale-110" : ""}`}
    style={{ top: `${product.y}%`, left: `calc(${product.x}% + ${product.offsetX ?? 0}px)`, transform: "translate(-50%, -50%)" }}
    onMouseEnter={() => onHover(product)}
    onMouseLeave={onLeave}
    onFocus={() => onHover(product)}
    onClick={(event) => { event.stopPropagation(); onOpen(product) }}
    aria-label={`Explore ${product.name}`}
    aria-expanded={isActive}
  >
    <span className="hotspot-ring absolute inset-0 rounded-full" />
    <span className="hotspot-core relative flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white text-gray-950 shadow-md">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </span>
  </button>
)

const CatalogImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [src])
  if (failed) return <div role="img" aria-label={`Retailer image unavailable for ${alt}`} className={`${className} flex items-center justify-center bg-gray-100 p-2 text-center text-[10px] leading-tight text-gray-500`}><span>Retailer photo<br />unavailable</span></div>
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />
}

const ProductPreview = ({ product, onEnter, onLeave, onOpen, onSimilar }: {
  product: Product; onEnter: () => void; onLeave: () => void;
  onOpen: () => void; onSimilar: () => void
}) => (
  <div
    data-silvr-ui="true"
    role="dialog"
    aria-label={`Shop this style: ${product.name}`}
    className="product-preview fixed z-[1200] rounded-2xl border border-black/10 bg-white p-4 shadow-2xl"
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    onClick={(event) => event.stopPropagation()}
  >
    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Shop this style</p>
    <div className="flex items-center gap-3">
      <CatalogImage src={product.image} alt={product.name} className="h-20 w-20 shrink-0 rounded-lg bg-gray-100 object-contain" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{product.brand}</p>
        <p className="line-clamp-2 text-sm font-medium">{product.name}</p>
        <p className="mt-1 text-sm">{product.price === "Check retailer" ? "Check retailer for price" : product.price}</p>
      </div>
    </div>
    <div className="mt-3 flex gap-2">
      <button type="button" onClick={onOpen} className="min-h-10 flex-1 rounded-full bg-gray-950 px-4 text-sm font-medium text-white">View details</button>
      {product.similar.length > 0 && <button type="button" onClick={onSimilar} className="min-h-10 rounded-full bg-gray-100 px-4 text-sm font-medium">Similar</button>}
    </div>
  </div>
)

const ProductCard = ({ product, selected, onClick, onSimilar, similar = false }: {
  product: StoreItem; selected?: boolean; onClick: () => void; onSimilar?: () => void; similar?: boolean
}) => (
  <article className={`overflow-hidden rounded-2xl border bg-white ${selected ? "border-gray-900" : "border-gray-200"}`}>
    <button type="button" className="block w-full text-left" onClick={onClick} aria-label={`View ${product.name}`}>
      <div className="relative aspect-[4/5] bg-gray-100 p-3">
        <CatalogImage src={product.image} alt={product.name} className="h-full w-full object-contain" />
      </div>
      <div className="px-3 pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">{similar ? "Similar find · " + product.brand : product.brand}</p>
        <p className="mt-1 line-clamp-2 min-h-10 text-sm font-medium leading-5">{product.name}</p>
        <p className="mt-1 text-sm">{product.price === "Check retailer" ? "Check retailer for price" : product.price}</p>
      </div>
    </button>
    <div className="flex items-center gap-2 px-3 pb-3 pt-3">
      <button type="button" onClick={onClick} className="min-h-10 flex-1 rounded-full bg-gray-950 px-3 text-xs font-medium text-white">View details</button>
      {onSimilar && <button type="button" onClick={onSimilar} className="min-h-10 rounded-full border border-gray-200 px-3 text-xs font-medium">Similar</button>}
    </div>
  </article>
)

const BottomSheet = ({ isOpen, onClose, products, selectedProduct, onSelectProduct, similarTarget, onShowSimilar, onClearSimilar, cobranded = true }: {
  isOpen: boolean; onClose: () => void; products: Product[]; selectedProduct: Product | StoreItem | null;
  onSelectProduct: (product: Product | StoreItem | null) => void; similarTarget: Product | null;
  onShowSimilar: (product: Product) => void; onClearSimilar: () => void; cobranded?: boolean
}) => {
  const dialogRef = useRef<HTMLElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    if (!isOpen) return
    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusTarget = dialogRef.current?.querySelector<HTMLElement>("button[aria-label='Close product details']")
    focusTarget?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current()
      if (event.key !== "Tab" || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')).filter((element) => element.getClientRects().length > 0)
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) { event.preventDefault(); return }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      else if (!dialogRef.current.contains(document.activeElement)) { event.preventDefault(); first.focus() }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      if (restoreFocusRef.current?.isConnected) restoreFocusRef.current.focus()
    }
  }, [isOpen])
  const relatedProduct = products.find((product) => product.id === selectedProduct?.id)
  const similarItems = similarTarget?.similar || relatedProduct?.similar || []
  const showingSimilar = Boolean(similarTarget && selectedProduct?.id === similarTarget.id)
  const heading = showingSimilar ? "Similar items" : selectedProduct ? "Item details" : "Shop the Look"

  return (
    <>
      <div className={`silvr-ui fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={onClose} aria-hidden="true" />
      <section
        role="dialog" aria-modal={isOpen} aria-label={heading} aria-hidden={!isOpen}
        ref={dialogRef} tabIndex={-1} inert={!isOpen}
        className={`silvr-ui fixed bottom-0 left-0 right-0 z-[60] mx-auto flex max-h-[88dvh] w-full max-w-2xl flex-col rounded-t-3xl bg-white shadow-2xl transition-[transform,opacity] duration-300 ease-out lg:inset-y-0 lg:right-0 lg:left-auto lg:mx-0 lg:max-h-none lg:w-[440px] lg:rounded-none ${isOpen ? "translate-y-0 lg:translate-x-0 opacity-100" : "translate-y-full lg:translate-y-0 lg:translate-x-full opacity-0"}`}
        style={{ pointerEvents: isOpen ? "auto" : "none", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Silvr</p>
            <h2 className="font-serif text-xl">{heading}</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100" aria-label="Close product details"><Icons.X /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {selectedProduct && !showingSimilar && (
            <button type="button" onClick={() => similarTarget ? onSelectProduct(similarTarget) : onSelectProduct(null)} className="mb-4 flex min-h-10 items-center gap-1 text-sm font-medium"><Icons.ChevronLeft /> {similarTarget ? "Back to similar items" : "All items"}</button>
          )}
          {showingSimilar && (
            <button type="button" onClick={onClearSimilar} className="mb-4 flex min-h-10 items-center gap-1 text-sm font-medium"><Icons.ChevronLeft /> Back to item</button>
          )}
          {showingSimilar ? (
            <>
              <p className="mb-4 text-sm text-gray-600">Based on {similarTarget?.name}</p>
              {similarItems.length ? <div className="grid grid-cols-2 gap-3">{similarItems.map((item) => <ProductCard key={item.id} product={item} similar onClick={() => onSelectProduct(item)} />)}</div> : <p role="status" className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600">No verified similar options are available for this item yet.</p>}
            </>
          ) : selectedProduct ? (
            <>
              <div className="relative flex min-h-[250px] items-center justify-center rounded-2xl bg-gray-100 p-6 sm:min-h-[330px]">
                <CatalogImage src={selectedProduct.image} alt={selectedProduct.name} className="max-h-[330px] w-full object-contain" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div><p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{relatedProduct ? selectedProduct.brand : "Similar find · " + selectedProduct.brand}</p><h3 className="mt-1 text-xl font-semibold">{selectedProduct.name}</h3></div>
                {selectedProduct.price !== "Check retailer" && <p className="shrink-0 text-lg font-semibold">{selectedProduct.price}</p>}
              </div>
              {relatedProduct && similarItems.length > 0 && <button type="button" onClick={() => onShowSimilar(relatedProduct)} className="mt-6 flex min-h-20 w-full items-center gap-3 rounded-xl border-y border-gray-200 py-3 text-left">
                <span className="min-w-0 flex-1"><strong className="block text-base">See similar items</strong><span className="text-sm text-gray-500">Based on this match</span></span>
                <span className="flex shrink-0 -space-x-2">{similarItems.slice(0, 3).map((item) => <CatalogImage key={item.id} src={item.image} alt={item.name} className="h-10 w-10 rounded-md border-2 border-white bg-gray-100 object-cover" />)}</span>
                <span aria-hidden="true" className="text-2xl text-gray-500">›</span>
              </button>}
              {relatedProduct && similarItems.length === 0 && <p role="status" className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">No verified similar options are available for this item yet.</p>}
              {selectedProduct.matchType && <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-600">{selectedProduct.matchType}{selectedProduct.category ? ` · ${selectedProduct.category}` : ""}</p>}
              {(selectedProduct.color || selectedProduct.pattern) && <p className="mt-1 text-xs leading-5 text-gray-500">{[selectedProduct.color, selectedProduct.pattern].filter(Boolean).join(" · ")}</p>}
              <p className="mt-2 text-xs leading-5 text-gray-500">Check current size, availability and final price at the retailer.</p>
              {selectedProduct.priceNote && <p className="mt-2 text-xs leading-5 text-gray-500">{selectedProduct.priceNote}</p>}
              <a href={selectedProduct.url} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-14 w-full items-center justify-center rounded-xl bg-[#17171d] text-base font-medium text-white" aria-label={`Shop ${selectedProduct.name} at ${selectedProduct.brand} in a new tab`}>Shop at store ↗</a>
            </>
          ) : (
            <><p className="mb-4 text-sm text-gray-500">{products.length} items found</p>{products.length ? <div className="grid grid-cols-2 gap-3">{products.map((product) => <ProductCard key={product.id} product={product} onClick={() => onSelectProduct(product)} onSimilar={product.similar.length ? () => { onSelectProduct(product); onShowSimilar(product) } : undefined} />)}</div> : <p role="status" className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600">No products are available for this image right now.</p>}</>
          )}
        </div>
        {cobranded && <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-6 py-3 text-center text-xs text-gray-500">Powered by <strong className="text-gray-900">Silvr</strong></div>}
      </section>
    </>
  )
}

const ShopChip = ({ label, count, active, onClick, video = false, corner = "bottom-left" }: {
  label: string; count?: number; active: boolean; onClick: () => void; video?: boolean; corner?: "bottom-left" | "top-left"
}) => (
  <div className={`shop-chip-lane ${corner === "bottom-left" ? "shop-chip-bottom" : "shop-chip-top"}`} aria-hidden="false"><button data-silvr-ui="true" type="button" onClick={(event) => { event.stopPropagation(); onClick() }} className="shop-chip sticky left-3 z-30 flex min-h-11 max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md transition-colors sm:left-4" style={{ background: video ? "rgba(3,7,18,.82)" : "rgba(255,255,255,.96)", color: video ? "white" : "#111827" }} aria-label={count === undefined ? label : `${label}, ${count} items`}>
    <Icons.ShoppingBag /> {label} {count !== undefined && !active && <span className="border-l border-current/20 pl-2 opacity-70">{count}</span>}
  </button></div>
)

function useVisibleEditorialMedia(ref: React.RefObject<HTMLElement | null>, type: "image" | "video", alt: string, products: Product[]) {
  const [eligible, setEligible] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    let visible = false
    const update = () => {
      const rect = element.getBoundingClientRect()
      setEligible(visible && isEligibleEditorialMedia({ type, editorial: true, alt, products }, rect.width, rect.height))
    }
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false
      update()
    }, { threshold: 0.12 })
    intersection.observe(element)
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update)
    resize?.observe(element)
    update()
    return () => { intersection.disconnect(); resize?.disconnect() }
  }, [ref, type, alt, products])
  return eligible
}

export const ShoppableImage = ({ imageSrc, products, nativeWidth, imageAlt = "Fashion editorial", mediaId = "editorial-image", shopLabel = "Shop This Image", frameClassName = "", chipCorner = "bottom-left" }: { imageSrc: string; products: Product[]; nativeWidth: number; imageAlt?: string; mediaId?: string; shopLabel?: string; frameClassName?: string; chipCorner?: "bottom-left" | "top-left" }) => {
  const [shopMode, setShopMode] = useState(false)
  const [preview, setPreview] = useState<Product | null>(null)
  const [selected, setSelected] = useState<Product | StoreItem | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [similarTarget, setSimilarTarget] = useState<Product | null>(null)
  const [imageFailed, setImageFailed] = useState(false)
  const mediaRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 })
  const eligible = useVisibleEditorialMedia(mediaRef, "image", imageAlt, products)
  useEffect(() => {
    const frame = frameRef.current, image = imageRef.current
    if (!frame || !image) return
    const update = () => setFrameSize({ width: frame.clientWidth, height: frame.clientHeight, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight })
    const resize = new ResizeObserver(update)
    resize.observe(frame)
    image.addEventListener("load", update)
    update()
    return () => { resize.disconnect(); image.removeEventListener("load", update) }
  }, [imageSrc])
  const displayedProducts = products.map((product) => {
    const { width, height, naturalWidth, naturalHeight } = frameSize
    if (!width || !height || !naturalWidth || !naturalHeight || !imageRef.current || getComputedStyle(imageRef.current).objectFit !== "cover") return product
    const scale = Math.max(width / naturalWidth, height / naturalHeight)
    const imageWidth = naturalWidth * scale, imageHeight = naturalHeight * scale
    const position = getComputedStyle(imageRef.current).objectPosition.split(" ")
    const px = Number.parseFloat(position[0]) / 100 || 0.5, py = Number.parseFloat(position[1]) / 100 || 0.5
    return { ...product, x: ((width - imageWidth) * px + imageWidth * product.x / 100) / width * 100, y: ((height - imageHeight) * py + imageHeight * product.y / 100) / height * 100 }
  }).filter((product) => product.x >= 3 && product.x <= 97 && product.y >= 3 && product.y <= 97)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clearLeave = () => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }
  const scheduleLeave = () => { clearLeave(); leaveTimer.current = setTimeout(() => setPreview(null), 160) }
  useEffect(() => () => clearLeave(), [])
  const openItem = (product: Product) => { clearLeave(); setPreview(null); setSelected(product); setSheetOpen(true) }
  const closeSheet = () => { setSheetOpen(false); setSimilarTarget(null); setSelected(null) }
  return (
    <div ref={mediaRef} data-silvr-media data-media-id={mediaId} data-media-type="image" className="relative mx-auto my-8 w-full md:my-10 lg:my-12" style={{ maxWidth: nativeWidth }}>
      <div ref={frameRef} className={`relative bg-gray-100 ${frameClassName}`}>
        <div className="media-visual" onClick={() => setPreview(null)}>
        <img ref={imageRef} src={imageSrc} alt={imageAlt} referrerPolicy="no-referrer" onError={() => setImageFailed(true)} onLoad={() => setImageFailed(false)} className={`block h-auto w-full transition-[filter] duration-300 ${shopMode ? "brightness-95 blur-[1px]" : ""}`} />
        {imageFailed && <div role="alert" className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-[#eceae5] p-6 text-center text-sm text-gray-700"><p>We couldn’t load this editorial image.</p><button type="button" className="rounded-full border border-gray-500 px-4 py-2" onClick={(event) => { event.stopPropagation(); setImageFailed(false); if (imageRef.current) imageRef.current.src = `${imageSrc}${imageSrc.includes("?") ? "&" : "?"}retry=${Date.now()}` }}>Retry image</button></div>}
        {shopMode && !imageFailed && <>
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          {displayedProducts.map((product) => <Hotspot key={product.id} product={product} isActive={preview?.id === product.id} onHover={(p) => { clearLeave(); setPreview(p) }} onLeave={scheduleLeave} onOpen={openItem} />)}
          {preview && createPortal(<div className="silvr-preview-overlay" aria-live="polite"><ProductPreview product={preview} onEnter={clearLeave} onLeave={scheduleLeave} onOpen={() => openItem(preview)} onSimilar={() => { setSelected(preview); setSimilarTarget(preview); setSheetOpen(true); setPreview(null) }} /></div>, document.body)}
          <button data-silvr-ui="true" type="button" className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gray-950/65 text-white" onClick={(event) => { event.stopPropagation(); setShopMode(false); setPreview(null) }} aria-label="Exit shop mode"><Icons.X size={16} /></button>
        </>}
        </div>
        {eligible && displayedProducts.length > 0 && !imageFailed && <ShopChip label={shopLabel} corner={chipCorner} active={shopMode} onClick={() => { if (!shopMode) setShopMode(true); else { setSelected(null); setSimilarTarget(null); setSheetOpen(true) } }} />}
      </div>
      <BottomSheet isOpen={sheetOpen} onClose={closeSheet} products={products} selectedProduct={selected} onSelectProduct={setSelected} similarTarget={similarTarget} onShowSimilar={setSimilarTarget} onClearSimilar={() => setSimilarTarget(null)} />
    </div>
  )
}

// --- APP ---

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, "")
  if (pathname === "") return <PublisherDemoIndex />
  if (pathname.startsWith("/gentlemans-gazette")) return <Suspense fallback={<div className="min-h-screen bg-white" />}><PublisherPage publisher="gazette" /></Suspense>
  if (pathname.startsWith("/story-and-rain")) return <Suspense fallback={<div className="min-h-screen bg-white" />}><PublisherPage publisher="storyRain" /></Suspense>
  return <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#f7f5f0] px-6 text-center text-[#272822]"><p className="text-xs font-bold uppercase tracking-[.2em]">404 · Not found</p><h1 className="max-w-2xl font-serif text-5xl">This page isn’t in the demo.</h1><a className="border-b border-current pb-1 text-sm" href="/">Choose a publisher ↗</a></main>
}
