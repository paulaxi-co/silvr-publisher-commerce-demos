import { useEffect } from "react"
import { ShoppableImage, ShoppableVideo } from "./App"
import { PUBLISHER_MEDIA, productsForMedia } from "./publisherCatalog"

const GAZETTE_ARTICLE = "/gentlemans-gazette/article/timeless-tailoring"
const STORY_ARTICLE = "/story-and-rain/article/well-suited"

/** The same media slot is used for features, cards, articles, and future galleries. */
function PublisherMedia({ mediaId, className = "" }: { mediaId: string; className?: string }) {
  const media = PUBLISHER_MEDIA[mediaId]
  if (!media) return null
  if (!media.editorial || !media.fashionReadable || !media.hotspotIds.length) return <img className={className} src={media.src} alt={media.alt} />
  if (media.type === "image") return (
    <div className={className}>
      <ShoppableImage imageSrc={media.src} products={productsForMedia(media.id)} nativeWidth={1600} imageAlt={media.alt} mediaId={media.id} shopLabel="Shop this image" frameClassName={media.frameClassName} chipCorner={media.chipCorner} />
    </div>
  )
  return <div className={className}><ShoppableVideo products={productsForMedia(media.id)} mediaId={media.id} mediaAlt={media.alt} videoSrc={media.src} shopLabel="Shop this video" /></div>
}

function GazetteHeader() {
  return <>
    <div className="border-b border-[#dedbd3] bg-[#252622] px-4 py-2 text-center text-[10px] uppercase tracking-[.22em] text-white">The art of living well · Est. 2010</div>
    <header className="gazette-header mx-auto max-w-[1440px] px-5 md:px-10">
      <div className="flex min-h-[88px] items-center justify-between border-b border-[#dedbd3]">
        <a className="publisher-menu-button" href="#gazette-stories" aria-label="Browse stories"><span></span><span></span><span></span></a>
        <a href="/gentlemans-gazette" className="gazette-masthead" aria-label="Gentleman's Gazette home">GENTLEMAN'S <span>GAZETTE</span></a>
        <a className="gazette-shop-link" href="https://shop.gentlemansgazette.com/" target="_blank" rel="noreferrer">Shop <span>↗</span></a>
      </div>
      <nav className="gazette-nav hidden items-center justify-center gap-9 py-4 md:flex" aria-label="Main navigation">
        {["Style", "Grooming", "Lifestyle", "Watches", "Fort Belvedere", "Videos"].map(item => <a key={item} href="#gazette-stories">{item}</a>)}
      </nav>
    </header>
  </>
}
function GazetteHome() {
  return <div className="publisher-page gazette-page min-h-screen bg-[#f7f5f0] text-[#171716]">
    <GazetteHeader />
    <main className="mx-auto max-w-[1280px] px-5 pb-24 md:px-10">
      <div className="gazette-kicker mt-9">Classic style · For the modern gentleman</div>
      <div className="gazette-title-row mb-7 mt-3 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <h1 className="publisher-editorial-serif max-w-3xl text-4xl leading-[1.06] md:text-6xl">Dress well.<br />Live well.</h1>
        <p className="max-w-xs text-sm leading-6 text-[#605f59]">The style, craft, and details behind a considered wardrobe.</p>
      </div>
      <section className="gazette-feature" aria-labelledby="gazette-feature-title">
        <PublisherMedia mediaId="gg-group-portrait" />
        <div className="gazette-caption">Classic menswear, considered from jacket to collar. <span>Image: Gentleman's Gazette</span></div>
        <div className="gazette-home-feature-copy">
          <div><p className="gazette-kicker">Featured story · Style guide</p><h2 id="gazette-feature-title" className="publisher-editorial-serif mt-3 text-3xl leading-tight md:text-5xl">The art of timeless tailoring</h2></div>
          <a className="gazette-story-link" href={GAZETTE_ARTICLE}>Read the story&nbsp; ↗</a>
        </div>
      </section>
      <section id="gazette-stories" className="mt-14 border-t border-[#dedbd3] pt-5">
        <div className="flex items-center justify-between"><h2 className="publisher-editorial-serif text-2xl md:text-3xl">A considered wardrobe</h2><span className="gazette-kicker">The details matter</span></div>
        <div className="gazette-story-grid mt-6">
          <article className="gazette-story-card gazette-style-note">
            <p className="gazette-kicker">Wardrobe notes · The long view</p>
            <h3 className="publisher-editorial-serif mt-4 text-3xl md:text-4xl">Start with the pieces you reach for</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#605f59]">A useful wardrobe is built around real days. Choose dependable layers, keep their proportions in balance, and let one considered detail bring the outfit together.</p>
            <a className="gazette-story-link mt-6 inline-block" href={`${GAZETTE_ARTICLE}#whole-silhouette`}>Read the wardrobe notes&nbsp; ↗</a>
          </article>
          <div className="gazette-text-stories">
            <p className="gazette-kicker">Notes on getting dressed</p>
            <a href={`${GAZETTE_ARTICLE}#cloth`}>Choose cloth for real wear <span>Care &amp; craft&nbsp; ↗</span></a>
            <a href={`${GAZETTE_ARTICLE}#pattern`}>Let one pattern lead <span>Color &amp; texture&nbsp; ↗</span></a>
            <a href={`${GAZETTE_ARTICLE}#finish`}>Finish with intention <span>Personal style&nbsp; ↗</span></a>
          </div>
        </div>
      </section>
    </main>
  </div>
}
function GazetteArticle() {
  return <div className="publisher-page gazette-page min-h-screen bg-[#f7f5f0] text-[#171716]">
    <GazetteHeader />
    <main className="mx-auto max-w-[1280px] px-5 pb-24 md:px-10">
      <p className="gazette-kicker mt-9"><a href="/gentlemans-gazette">Home</a> &nbsp;/&nbsp; Style guide</p>
      <div className="gazette-title-row mb-6 mt-3 flex flex-col justify-between gap-3 md:flex-row md:items-end"><h1 className="publisher-editorial-serif max-w-3xl text-4xl leading-[1.06] md:text-6xl">The art of timeless tailoring</h1><p className="max-w-xs text-sm leading-6 text-[#605f59]">The elements of a wardrobe that always feels considered.</p></div>
      <div className="mb-4 flex items-center justify-between border-y border-[#dedbd3] py-3 text-[10px] uppercase tracking-[.18em] text-[#605f59]"><span>Style guide</span><span>6 min read</span></div>
      <section className="gazette-feature"><PublisherMedia mediaId="gg-group-portrait" /><div className="gazette-caption">A close study of proportion, texture, and the details that make a suit your own. <span>Image: Gentleman's Gazette</span></div></section>
      <article className="gazette-reading mx-auto mt-12 max-w-[710px]">
        <p className="publisher-editorial-serif gazette-deck">A confident fit and thoughtful finishing do more than any passing trend.</p>
        <div className="gazette-body-copy">
          <p>Classic tailoring begins with balance. A structured jacket sets the line of the shoulders, while a clean shirt collar gives the look a quiet foundation.</p>
          <h2 className="publisher-editorial-serif">The foundation of a good fit</h2>
          <p>Look to the shoulder seam, sleeve length, and the space through the chest. The checked double-breasted jacket in this photograph draws its character from the close pattern and broad lapels; the pale blue shirt lightens the whole ensemble.</p>
          <p>Explore the photograph to shop visually similar jackets and shirts. Each piece can be opened separately, with more options in the shopping sheet.</p>
          <h2 className="publisher-editorial-serif">Start with the shoulder</h2>
          <p>A jacket reads as well fitted when its shoulder line follows the wearer instead of extending past it or pulling inward. The collar should sit close to the shirt collar, and the lapels should lie flat when the jacket is buttoned. These quiet checks give the garment its shape before color or accessories enter the picture.</p>
          <p>Length matters too. A balanced jacket covers the seat and leaves enough room through the chest to move comfortably. Sleeves should show a small, consistent line of shirt cuff. Small adjustments at the tailor can often improve the impression more than changing the whole outfit.</p>
          <h2 id="pattern" className="publisher-editorial-serif">Let pattern do one job</h2>
          <p>A checked jacket already brings texture and visual rhythm. Pairing it with a plain shirt keeps the pattern legible and gives the eye a place to rest. Here, the light blue shirt provides that contrast without competing with the brown check.</p>
          <p>Scale is useful when choosing a check: a tighter repeat tends to read quietly from a distance, while a larger one feels more expressive. The rest of the outfit can stay restrained, with a solid trouser and a simple leather shoe carrying the same level of formality.</p>
          <h2 id="finish" className="publisher-editorial-serif">Finish with intention</h2>
          <p>A pocket square, tie, or boutonniere can add color, but each detail works best when it relates to the rest of the palette instead of matching every element exactly. Choose one accent, then let the cloth and cut remain the focus.</p>
          <p>That approach makes tailoring easier to wear across occasions. Keep the jacket structured for a more formal setting, or wear it with an open collar when the day calls for something relaxed. The useful wardrobe is the one whose pieces can shift tone without losing their character.</p>
          <h2 id="whole-silhouette" className="publisher-editorial-serif">Consider the whole silhouette</h2>
          <p>The jacket is only one part of the line. Trousers that sit cleanly at the waist and fall without pulling keep the upper half in proportion. A moderate break at the shoe gives a traditional finish; a shorter hem can feel sharper, provided it still works with the formality of the jacket.</p>
          <p>Footwear and small accessories set the final tone. Polished leather and a restrained tie make the outfit feel more formal, while a softer shoe and an open collar ease it back. Repeating one color from the jacket or shirt in a small detail can bring the combination together without making it look planned piece by piece.</p>
          <h2 id="cloth" className="publisher-editorial-serif">Choose cloth for real wear</h2>
          <p>When selecting a jacket, consider how often and where it will be worn. A tightly woven cloth can hold a crisp line through a busy day; a lighter, more textured fabric may feel at home in warmer weather or a relaxed setting. The check in this portrait is easy to notice, so the rest of the outfit benefits from simple, dependable fabrics.</p>
          <p>Give tailored pieces room to rest between wears and brush them gently after use. Airing a jacket before returning it to the wardrobe helps preserve its shape and reduces the need for frequent cleaning. Small habits protect the structure that made the garment worth choosing.</p>
        </div>
        <a className="gazette-story-link mt-8 inline-block" href="/gentlemans-gazette">← Back to the Gazette</a>
      </article>
    </main>
  </div>
}

function StoryHeader() {
  return <>
    <div className="storyrain-topline flex items-center justify-between px-5 py-2 text-[9px] uppercase tracking-[.19em] md:px-10"><span>Stories worth discovering</span><span>New York&nbsp; · &nbsp;Everywhere</span></div>
    <header className="storyrain-header mx-auto max-w-[1440px] px-5 md:px-10">
      <div className="relative flex min-h-[82px] items-center justify-between border-b border-[#e9e9e9]">
        <a className="storyrain-menu" href="#storyrain-stories" aria-label="Browse stories"><span></span><span></span></a>
        <a className="storyrain-masthead" href="/story-and-rain" aria-label="Story and Rain home">story<span>+</span>rain</a>
        <a aria-label="Browse fashion" href="#storyrain-stories" className="storyrain-search">⌕</a>
      </div>
      <nav className="storyrain-nav hidden items-center justify-center gap-7 py-4 lg:flex" aria-label="Main navigation">{["Cover", "Cover Archive", "What's New", "Fashion", "Beauty + Wellness", "Culture + Living", "Video", "The Podcast"].map(item => <a key={item} href="#storyrain-stories">{item}</a>)}</nav>
    </header>
  </>
}
function StoryFooter() {
  return <footer className="storyrain-footer"><a className="storyrain-masthead" href="/story-and-rain">story<span>+</span>rain</a><div>Fashion&nbsp; · &nbsp;Culture&nbsp; · &nbsp;Living&nbsp; · &nbsp;The Podcast</div><p>© Story + Rain&nbsp; 2026</p></footer>
}
function StoryHome() {
  return <div className="publisher-page storyrain-page min-h-screen bg-white text-[#161616]">
    <StoryHeader />
    <main className="mx-auto max-w-[1440px] px-4 pb-20 md:px-10">
      <div className="storyrain-section-heading mt-6"><span>THE STORY</span><span>FASHION &nbsp;/&nbsp; COVER</span></div>
      <section className="storyrain-home-lead">
        <PublisherMedia mediaId="sr-lily-suit" />
        <div className="storyrain-home-copy">
          <p className="storyrain-kicker">Fashion · The story</p>
          <h1 className="storyrain-serif mt-4 text-5xl leading-[.98] md:text-7xl">Well<br />Suited</h1>
          <p className="storyrain-serif mt-5 text-xl leading-7">Lily Rabe is just the right fit in the new seasonless suit.</p>
          <a className="storyrain-more mt-8 inline-flex" href={STORY_ARTICLE}>Read the story&nbsp; ↗</a>
        </div>
      </section>
      <section id="storyrain-stories" className="storyrain-listing mt-12">
        <div className="storyrain-section-heading"><span>WHAT'S NEW</span><span>FASHION&nbsp; + &nbsp;CULTURE</span></div>
        <div className="storyrain-listing-grid">
          <article className="storyrain-story-card storyrain-style-note"><p className="storyrain-kicker">STYLE NOTES · THE WARDROBE</p><h2 className="storyrain-serif mt-5 text-4xl md:text-5xl">The ease of a well-cut jacket</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#777]">A relaxed silhouette can still feel considered. Look for a clean shoulder, room to move, and a length that works with the pieces already in your closet.</p><p className="mt-4 max-w-xl text-sm leading-7 text-[#777]">Wear it open over a simple base, or bring in a tailored layer when the occasion asks for more structure.</p></article>
          <div className="storyrain-text-list">
            <article><p className="storyrain-kicker">Fashion · Shopping</p><h2 className="storyrain-serif mt-2 text-3xl">A white shirt, after hours</h2><p>Change the proportions and accessories to take an everyday staple into the evening.</p></article>
            <article><p className="storyrain-kicker">Fashion · Personal style</p><h2 className="storyrain-serif mt-2 text-3xl">Jewelry with a point of view</h2><p>One sculptural piece can give a familiar outfit its own signature.</p></article>
            <article><p className="storyrain-kicker">Culture · Living</p><h2 className="storyrain-serif mt-2 text-3xl">The pieces that move with you</h2><p>Build a wardrobe around comfort, character, and the rhythm of the day.</p></article>
          </div>
        </div>
      </section>
    </main>
    <StoryFooter />
  </div>
}
function StoryArticle() {
  return <div className="publisher-page storyrain-page min-h-screen bg-white text-[#161616]">
    <StoryHeader />
    <main className="mx-auto max-w-[1440px] px-4 pb-20 md:px-10">
      <div className="storyrain-section-heading mt-6"><span><a href="/story-and-rain">HOME</a> / FASHION</span><span>THE STORY</span></div>
      <div className="storyrain-article-title"><p className="storyrain-kicker">Fashion · Celebrity style</p><h1 className="storyrain-serif mt-4 text-5xl md:text-7xl">Well Suited</h1><p className="storyrain-serif mt-4 text-xl">Starring in David E. Kelley's <em>Love + Death</em>, Lily Rabe is just the right fit in the new seasonless suit.</p></div>
      <section className="storyrain-article-photo"><PublisherMedia mediaId="sr-lily-suit" /><p className="storyrain-photo-credit">Lily Rabe in a three-piece suit by The Frankie Shop. Photograph from Story + Rain's “Well Suited” editorial.</p></section>
      <article className="storyrain-copy mx-auto mt-10 max-w-[710px]">
        <p>A seasonless suit has room for personality. The longer line of an oversized jacket gives the look ease, while a tailored waistcoat adds structure under it.</p>
        <p>In Story + Rain's portrait of Lily Rabe, the layered grey pieces make a strong monochrome statement. Explore the image to see our closest available matches for the blazer and waistcoat, plus three alternatives for each.</p>
        <h2 className="storyrain-serif mt-10 text-3xl">Ease in the silhouette</h2>
        <p>The jacket's generous shape gives the outfit its relaxed line. A defined shoulder and long lapel keep that volume deliberate, while the waistcoat introduces a closer layer underneath. The contrast between the two proportions is what keeps a three-piece look from feeling overly formal.</p>
        <p>Worn together, the layers create a continuous column of grey. The restrained palette lets cut and proportion stand out; it also makes each piece easier to style on its own. A blazer can sit over a simple top, and the waistcoat can bring structure to a lighter outfit.</p>
        <h2 className="storyrain-serif mt-10 text-3xl">One palette, several moods</h2>
        <p>Monochrome dressing does not need to feel uniform. Differences in texture, finish, and shape add depth even when the colors stay close. Keeping accessories edited gives those details room, while a contrasting shoe or piece of jewelry can shift the look toward evening.</p>
        <p>The idea is less about building a matching set and more about choosing pieces that speak the same visual language. A softly structured jacket, a tailored vest, and relaxed trousers can move between settings without losing the cohesion of the original look.</p>
        <h2 className="storyrain-serif mt-10 text-3xl">Wear each layer your own way</h2>
        <p>A three-piece suit offers several ways to get dressed. The jacket and trousers make a complete look; the waistcoat can stand alone with a shirt or fine knit. Separating the pieces also makes the overall investment more versatile, since each layer can work with items already in a wardrobe.</p>
        <p>Proportion is the detail to watch when breaking up a suit. A longer jacket pairs well with a clean, close-fitting base, while a waistcoat looks most intentional when its hem meets the waistband rather than interrupting it. These small adjustments keep the relaxed styling from appearing accidental.</p>
        <h2 className="storyrain-serif mt-10 text-3xl">The finishing touches</h2>
        <p>Accessories can stay minimal when the tailoring already has presence. A delicate earring or ring picks up the look's polish without competing with the clean lines. For a stronger contrast, a textured bag or shoe changes the mood while leaving the suit as the anchor.</p>
        <p>There is no single formula for seasonless dressing. The practical test is whether the pieces feel comfortable alone and together, and whether a change of layer can carry them into another part of the day. That flexibility gives a sharply tailored look a more personal, lived-in quality.</p>
        <h2 className="storyrain-serif mt-10 text-3xl">Behind the portrait</h2>
        <p>The editorial was photographed in Los Angeles by Matt Sayles, with Katie Bofshever styling Lily Rabe. The shoot places the suit within a broader fashion story, where tailoring moves between classic references and contemporary ease.</p>
        <p>For this demo, the pictured blazer and waistcoat are represented by closest available retailer matches. The credited label is known from the editorial, but the exact current retail styles could not be confirmed from the photograph alone.</p>
        <a className="storyrain-more mt-8 inline-flex" href="/story-and-rain">← More stories</a>
      </article>
    </main>
    <StoryFooter />
  </div>
}

export function PublisherPage({ publisher }: { publisher: "gazette" | "storyRain" }) {
  const article = window.location.pathname.includes("/article/")
  useEffect(() => { document.title = publisher === "gazette" ? "Gentleman's Gazette | Silvr Demo" : "Story + Rain | Silvr Demo" }, [publisher])
  return publisher === "gazette" ? article ? <GazetteArticle /> : <GazetteHome /> : article ? <StoryArticle /> : <StoryHome />
}
