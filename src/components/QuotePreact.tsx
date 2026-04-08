import { useEffect, useState } from "preact/hooks";
import type { Quote } from "../../payload-types";

function QuotePreact(
  { quotes, length }: { quotes: Quote[]; length: number },
) {
  const [quote, setQuote] = useState<Quote | null>(
    null,
  );

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * length)]);
  }, []);

  return (
    <section class="section-padding relative flex w-full flex-col items-center justify-center overflow-hidden shadow-inner panel-oxblood">
      <figure class="relative z-10 mx-auto flex w-full max-w-360 flex-col rounded-sm bg-accent-soft/30 px-6 py-12 shadow-2xl backdrop-blur-md ring-2 ring-saffron/70 ring-offset-4 ring-offset-accent before:pointer-events-none before:absolute before:inset-2 before:rounded-sm before:border before:border-gold/30 md:px-10 md:py-16 lg:flex-row lg:items-center lg:px-16 lg:py-20 xl:px-24">
        
        {/* Left Side: Tibetan */}
        <div class="flex flex-1 flex-col items-center justify-center lg:pr-12 xl:pr-16">
          {quote?.originalQuoteHtml ? (
            <div
              lang={quote.originalQuoteLang!}
              class="w-full text-center font-tibetan text-4xl leading-[1.8] tracking-widest text-saffron drop-shadow-md sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]"
              dangerouslySetInnerHTML={{
                __html: quote.originalQuoteHtml,
              }}
            />
          ) : null}

          {/* Premium Lotus Illustration */}
          <div class="mt-8 flex items-center justify-center text-gold/80 lg:mt-12">
            <svg class="h-10 w-10 drop-shadow-md md:h-12 md:w-12 xl:h-14 xl:w-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M50 85 C50 85, 20 60, 25 35 C30 20, 50 15, 50 15 C50 15, 70 20, 75 35 C80 60, 50 85, 50 85" fill="currentColor" fill-opacity="0.15" />
              <path d="M50 85 C50 85, 10 50, 5 30 C0 10, 30 20, 50 40" stroke-width="2" />
              <path d="M50 85 C50 85, 90 50, 95 30 C100 10, 70 20, 50 40" stroke-width="2" />
              <path d="M50 85 C50 85, 0 65, 0 45 C0 25, 20 30, 40 50" />
              <path d="M50 85 C50 85, 100 65, 100 45 C100 25, 80 30, 60 50" />
              <circle cx="50" cy="85" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Central Divider: Premium 8-Spoke Dharma Wheel */}
        <div class="my-12 flex shrink-0 items-center justify-center lg:my-0 lg:mx-8 xl:mx-12">
          <svg class="h-20 w-20 text-gold drop-shadow-lg md:h-24 md:w-24 xl:h-28 xl:w-28" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="40" fill="currentColor" fill-opacity="0.12" stroke-width="2.5" />
            <circle cx="50" cy="50" r="34" stroke-width="1.5" stroke-dasharray="2 5" />
            <circle cx="50" cy="50" r="10" stroke-width="3" />
            <circle cx="50" cy="50" r="3.5" fill="currentColor" />
            <path d="M50 10 L50 40 M50 60 L50 90 M10 50 L40 50 M60 50 L90 50 M21.7 21.7 L42.9 42.9 M57.1 57.1 L78.3 78.3 M21.7 78.3 L42.9 57.1 M57.1 42.9 L78.3 21.7" stroke-width="2.5" />
            <path d="M50 0 L54 6 L46 6 Z M100 50 L94 46 L94 54 Z M0 50 L6 46 L6 54 Z M50 100 L54 94 L46 94 Z" fill="currentColor" stroke="none" />
            <path d="M14.6 14.6 L20 16 L16 20 Z M85.4 14.6 L80 16 L84 20 Z M85.4 85.4 L80 84 L84 80 Z M14.6 85.4 L20 84 L16 80 Z" fill="currentColor" stroke="none" />
          </svg>
        </div>

        {/* Right Side: Translation */}
        <div class="flex flex-1 flex-col items-center justify-center lg:pl-12 xl:pl-16">
          {quote && (
            <blockquote class="w-full text-center font-display text-xl font-medium italic leading-[1.8] text-white/95 text-balance md:text-2xl lg:text-3xl xl:text-[2rem] xl:leading-[1.7]">
              <div dangerouslySetInnerHTML={{ __html: quote.quoteHtml! }} />
            </blockquote>
          )}
          
          <figcaption class="mt-10 text-center text-sm font-semibold uppercase tracking-[0.25em] text-saffron/90 md:mt-12 lg:text-base">
            &#8212; <cite class="not-italic">{quote?.source}</cite>
          </figcaption>
        </div>
        
      </figure>
    </section>
  );
}

export default QuotePreact;
