# VoltCycle

A polished, responsive website for a fictional pre-owned e-bike business. Built as a UI/UX frontend assessment.

**Live:** [deployed URL TBD]

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

## Pages

- **/** — Landing page with hero, featured inventory, services teaser
- **/inventory** — Browse all bikes with price/brand filters and sorting (URL-param based)
- **/inventory/[id]** — Bike detail with photo gallery, full specs, and contact CTA
- **/services** — Company info, service offerings with pricing, contact details
- **/admin** — Admin dashboard mockup (styled, non-functional)

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Design rationale

See [DECISIONS.md](./DECISIONS.md) for the full write-up on information hierarchy, mobile approach, and trade-offs.
