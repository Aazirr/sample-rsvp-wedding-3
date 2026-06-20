# Build Roadmap & Status

## Current status
**Phase 4 complete.** Site fully scaffolded and built. Ready for Neon DB + Vercel deploy and real content.

---

## Phases

### Phase 1 — Scaffold ✓
- [x] Init Next.js (App Router) project
- [x] Add Tailwind + base dark theme tokens (coal, crimson, brass palette)
- [x] Set up Neon connection + `.env.local` template (DATABASE_URL, ADMIN_PASSWORD)
- [x] Create `guests` schema (`lib/db.ts`)
- [x] `content/config.ts` + `public/gallery/` folder

### Phase 2 — Public site ✓
- [x] Cinematic intro (match → smoke → crest → reveal), skippable, once/visit
- [x] Hero (names, date, hero image placeholder, red light leak)
- [x] Our Story (placeholder noir copy)
- [x] The Order of the Day (details/map/timeline placeholders)
- [x] The Dress Code (palette swatches + attire note)
- [x] Gallery (6-frame grid, placeholder frames, drop photos into `public/gallery/`)
- [x] Footer
- [x] Red light leak scroll effect — fixed overlay with scroll-driven intensity
- [x] Mobile-first layout throughout — tap targets ≥52px, fluid type, responsive grid

### Phase 3 — Invite & RSVP ✓
- [x] `/invite/[token]` page: validate token, pre-filled name, Accept/Decline
- [x] Change-answer flow (change response button shown after submit)
- [x] Invalid token → themed "invitation not found" page
- [x] `POST /api/rsvp` — update status + responded_at

### Phase 4 — Admin ✓
- [x] `/admin` — password gate (cookie session, 8h)
- [x] Add guest → generates unique token + copyable invite link
- [x] Live counts (total/accepted/declined/pending)
- [x] CSV export (`GET /admin/api/export`)

### Phase 5 — Deploy
- [ ] Create Neon DB + run `initDb()` once to create the `guests` table
- [ ] Create Vercel project, connect GitHub repo
- [ ] Set env vars in Vercel (DATABASE_URL, ADMIN_PASSWORD)
- [ ] Smoke test full flow end-to-end on prod URL
- [ ] Hand off `/admin` URL + password to couple

### Phase 6 — Real content (ongoing)
- [ ] Fill in `content/config.ts` — date, time, venues, map links, timeline
- [ ] Drop photoshoot images into `public/gallery/` (hero.jpg + photo-1.jpg … photo-6.jpg)
- [ ] Replace placeholder "Our Story" copy with real text

---

## Content to collect (blocks final launch, not the build)
- Event date / time / venues / map / timeline
- Photoshoot images
- Real "Our Story" text
- Footer closing line
