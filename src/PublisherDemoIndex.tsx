const demos = [
  {
    name: "Gentleman's Gazette",
    description: "Classic menswear, considered tailoring, and a shoppable editorial experience.",
    image: "/assets/gg-editorial-banner.jpg",
    alt: "Gentlemen in tailored jackets at an outdoor editorial",
    href: "/gentlemans-gazette",
    label: "Explore Gentleman's Gazette",
    className: "font-serif",
  },
  {
    name: "Story + Rain",
    description: "Contemporary fashion and a shoppable look from the Well Suited editorial.",
    image: "/assets/sr-well-suited.jpg",
    alt: "Contemporary tailored look from the Well Suited editorial",
    href: "/story-and-rain",
    label: "Explore Story + Rain",
    className: "font-serif tracking-tight",
  },
]

export function PublisherDemoIndex() {
  return (
    <main className="min-h-screen bg-[#f7f6f3] px-5 py-10 text-[#191919] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-black/15 pb-7 sm:mb-14 sm:pb-9">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#777]">Silvr · Publisher demos</p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-6xl">Choose an editorial experience</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#666] sm:text-lg">
            Explore how Silvr shopping fits naturally into each publisher’s fashion stories.
          </p>
        </header>

        <section aria-label="Publisher experiences" className="grid gap-8 md:grid-cols-2 md:gap-6">
          {demos.map((demo) => (
            <article key={demo.href} className="group">
              <a href={demo.href} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                <div className="aspect-[1.55] overflow-hidden bg-[#e7e5e0]">
                  <img
                    src={demo.image}
                    alt={demo.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-4 border-b border-black/20 py-5">
                  <div>
                    <h2 className={`text-2xl sm:text-3xl ${demo.className}`}>{demo.name}</h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-[#666]">{demo.description}</p>
                  </div>
                  <span aria-hidden="true" className="shrink-0 text-2xl transition-transform group-hover:translate-x-1">↗</span>
                </div>
                <span className="sr-only">{demo.label}</span>
              </a>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
