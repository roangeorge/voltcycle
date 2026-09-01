# Design Decisions — VoltCycle

## Page Structure

The site has four views: a landing page, an inventory browse page, individual bike detail pages, and a services/company page. The admin mockup sits on its own route.

The landing page exists to build trust first, sell second. A used e-bike purchase is a high-consideration buy — buyers need to feel confident in the seller before they'll even browse inventory. So the homepage opens with a strong hero and immediately follows with trust signals (bikes sold count, warranty, inspection). Featured bikes come next to pull visitors deeper, and a services teaser establishes VoltCycle as a full-service operation, not just a classifieds board.

The inventory page is separate from the homepage on purpose. Buyers who land on the homepage need convincing; buyers who click "Inventory" are already motivated. Mixing browse functionality into the homepage would dilute both jobs.

## Card Hierarchy — The Core Decision

The bike card is the single most important component. When someone is scanning 10+ used e-bikes, they need to narrow the list fast without clicking into every detail page.

I structured the card information in order of purchase-decision weight:

1. **Price** — biggest, boldest element. Used bike buyers are almost always price-constrained. Leading with price lets them eliminate bikes above budget instantly.

2. **Brand and model** — just below price. Brand recognition drives trust in the used market. A buyer who knows they want a Trek or Specialized needs to see that immediately.

3. **Battery health and range** — the hidden cost metric. Unlike acoustic bikes, a used e-bike with a degraded battery could need a $500-$800 replacement. Battery health percentage tells buyers whether the listed price is actually a deal. Range gives a practical sense of what the bike can do day-to-day. I grouped these on a single line with a bolt icon to make it scannable.

4. **Year, condition, frame size** — deprioritized to small, gray text. These matter, but they're secondary filters. A buyer won't skip a good-price, good-battery bike over frame size — they'll check that on the detail page.

The "View Details" CTA is a text link, not a button. Every card already has a click target (the whole card is wrapped in a link), so a heavy button would add visual noise without helping navigation.

## Progressive Disclosure

The card shows just enough to decide "worth a closer look" or "skip." Everything else lives on the detail page: full photo gallery, complete specs table, condition notes, and the bike's backstory. This keeps the browse experience fast while giving serious buyers the depth they need on detail pages.

The filter bar collapses on mobile because it would consume too much vertical space otherwise. Filters aren't the first thing a mobile user needs — they need to see bikes. A "Filters" toggle with an active-count badge communicates that filtering is available without stealing above-the-fold real estate.

## Mobile Approach

The layout is mobile-first in the Tailwind sense: base styles are mobile, breakpoints layer on complexity.

What changes:
- Bike grid goes from 1 column (mobile) to 2 (tablet) to 3 (desktop)
- Detail page stacks images above specs instead of side-by-side
- Filter bar collapses behind a toggle with a badge showing active filter count
- Navigation swaps inline links for a hamburger menu
- Hero text scales down; hero height adapts with viewport

What stays the same regardless of screen size:
- Card information hierarchy stays identical — the scanning pattern doesn't change on mobile
- Full content is always accessible — nothing is hidden-on-mobile except the filter controls (behind a toggle)
- Touch targets are minimum 44px

## Trade-offs

**Simplicity over feature completeness.** The filter options are deliberately limited — price range, brand, and sort. A production site might add category, battery health range, or year filters. But for an assessment, demonstrating that the filter pattern works and that the URL-based state management is sound matters more than covering every possible filter dimension.

**Static data over API simulation.** All bike data lives in a TypeScript file. I didn't build a fake API layer or simulated backend because it would add complexity that only serves to demonstrate API fetching patterns — not product thinking or design quality. The data module exports typed helper functions that a real API layer would replace 1:1.

**URL params for filter state over component state.** Filters are stored in URL search parameters (`/inventory?brand=Trek&sort=price-asc`) rather than React state. This costs slightly more code, but the user gets a shareable URL, working back-button behavior, and filters that survive navigation to a detail page and back. Real e-commerce sites work this way for exactly these reasons.

**Card density over maximum detail.** Each card intentionally omits some information (motor type, specific components, seller notes) that a buyer might want. The bet is that scanning speed matters more than information density on the browse page. Buyers who care about motor specs will click through to the detail page — and they'll get there faster because the browse page didn't slow them down with information overload.
