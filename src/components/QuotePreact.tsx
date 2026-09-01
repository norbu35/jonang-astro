import { useEffect, useState } from "preact/hooks";
import { SACRED_QUOTES, type Quote } from "../data/quotes";

function formatTibetanVerses(rawHtml?: string | null): string {
  if (!rawHtml) return "";
  // Strip outer paragraph tags
  let clean = rawHtml.replace(/^<p\b[^>]*>/i, "").replace(/<\/p>$/i, "").trim();
  
  // If raw string has no line breaks between verses, split after double-shads or shads
  if (!clean.includes("<br>") && !clean.includes("<br/>") && !clean.includes("<br />")) {
    clean = clean.replace(/(།\s*།|༎)\s*/g, "$1<br/>");
  }
  
  // Clean up trailing break tags
  clean = clean.replace(/(<br\s*\/?>)+$/i, "");
  
  // Map each poetic pada into a dedicated span with balanced wrapping
  const lines = clean.split(/<br\s*\/?>/i).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return rawHtml;
  return lines.map((line) => `<span class="tibetan-pada md:whitespace-nowrap">${line}</span>`).join("");
}

export default function QuotePreact() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * SACRED_QUOTES.length);
    setQuote(SACRED_QUOTES[randomIndex]);
  }, []);

  const activeQuote = quote || SACRED_QUOTES[0];

  return (
    <section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#a3282b] via-[#942023] to-[#86191c] text-white shadow-inner">
      
      {/* Radiant ambient warmth */}
      <div class="pointer-events-none absolute inset-0 bg-radial from-[#fdbc2d]/15 via-transparent to-transparent blur-2xl" aria-hidden="true"></div>

      <figure class="relative z-10 mx-auto flex w-full max-w-6xl flex-col rounded-2xl bg-black/25 px-6 py-8 sm:px-8 sm:py-10 shadow-2xl backdrop-blur-md border border-[#fdbc2d]/40 md:px-10 md:py-12 lg:flex-row lg:items-center lg:px-12 lg:py-12 xl:px-14">
        
        {/* Left Side: Tibetan */}
        <div class="flex flex-1 flex-col items-center justify-center lg:pr-8 xl:pr-10 w-full overflow-hidden">
          {activeQuote?.originalQuoteHtml ? (
            <div
              lang={activeQuote.originalQuoteLang || "bo"}
              class="tibetan-verse w-full text-center text-sm sm:text-base md:text-lg lg:text-[1.25rem] leading-[2] tracking-normal text-[#fdbc2d] font-tibetan-scholarly drop-shadow-sm font-bold"
              dangerouslySetInnerHTML={{
                __html: formatTibetanVerses(activeQuote.originalQuoteHtml),
              }}
            />
          ) : null}

          {/* Sacred Lotus Illustration */}
          <div class="mt-4 sm:mt-6 flex items-center justify-center text-[#fdbc2d]">
            <svg class="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 drop-shadow-sm" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M50 85 C50 85, 20 60, 25 35 C30 20, 50 15, 50 15 C50 15, 70 20, 75 35 C80 60, 50 85, 50 85" fill="currentColor" fill-opacity="0.2" />
              <path d="M50 85 C50 85, 10 50, 5 30 C0 10, 30 20, 50 40" stroke-width="2" />
              <path d="M50 85 C50 85, 90 50, 95 30 C100 10, 70 20, 50 40" stroke-width="2" />
              <path d="M50 85 C50 85, 0 65, 0 45 C0 25, 20 30, 40 50" />
              <path d="M50 85 C50 85, 100 65, 100 45 C100 25, 80 30, 60 50" />
              <circle cx="50" cy="85" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Central Divider: 8-Spoke Dharma Wheel */}
        <div class="my-6 sm:my-8 flex shrink-0 items-center justify-center lg:my-0 lg:mx-8 xl:mx-10">
          <svg class="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 text-[#fdbc2d] drop-shadow-lg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="40" fill="currentColor" fill-opacity="0.18" stroke-width="2.5" />
            <circle cx="50" cy="50" r="34" stroke-width="1.5" stroke-dasharray="2 5" />
            <circle cx="50" cy="50" r="10" stroke-width="3" />
            <circle cx="50" cy="50" r="3.5" fill="currentColor" />
            <path d="M50 10 L50 40 M50 60 L50 90 M10 50 L40 50 M60 50 L90 50 M21.7 21.7 L42.9 42.9 M57.1 57.1 L78.3 78.3 M21.7 78.3 L42.9 57.1 M57.1 42.9 L78.3 21.7" stroke-width="2.5" />
            <path d="M50 0 L54 6 L46 6 Z M100 50 L94 46 L94 54 Z M0 50 L6 46 L6 54 Z M50 100 L54 94 L46 94 Z" fill="currentColor" stroke="none" />
            <path d="M14.6 14.6 L20 16 L16 20 Z M85.4 14.6 L80 16 L84 20 Z M85.4 85.4 L80 84 L84 80 Z M14.6 85.4 L20 84 L16 80 Z" fill="currentColor" stroke="none" />
          </svg>
        </div>

        {/* Right Side: Translation */}
        <div class="flex flex-1 flex-col items-center justify-center lg:pl-8 xl:pl-10 w-full">
          {activeQuote && (
            <blockquote class="w-full text-center font-display text-base sm:text-lg md:text-xl font-normal italic leading-[1.8] text-white text-balance m-0 drop-shadow-sm">
              <div dangerouslySetInnerHTML={{ __html: activeQuote.quoteHtml }} />
            </blockquote>
          )}
          
          <figcaption class="mt-4 sm:mt-6 text-center text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#fdbc2d]">
            &#8212; <cite class="not-italic">{activeQuote?.source}</cite>
          </figcaption>
        </div>
        
      </figure>
    </section>
  );
}
