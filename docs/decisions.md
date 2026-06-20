# Decision Log

Every locked decision and the reasoning, so future changes are deliberate.

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | Invite scope | **One person per invite** | Cleanest headcount; simplest accept/decline |
| 2 | RSVP fields | **Accept/decline + name only (for now)** | Couple will decide extra fields later with the brother; schema kept extensible |
| 3 | Hosting | **Vercel + Neon (Postgres)** | Free tiers cover a wedding; real backend + CSV export |
| 4 | Sending invites | **Admin page generates links** | Admin copies each link and sends manually; no email service needed in v1 |
| 5 | Guest name | **Pre-filled, guest confirms** | Most cinematic/personal; avoids typos & duplicate names |
| 6 | Change after submit | **Allowed** | Forgiving for misclicks / plan changes; updates same row |
| 7 | Admin auth | **Secret URL + password** | Hidden path + password is plenty for a single private admin |
| 8 | Intro animation | **Full cinematic cold-open** (match → smoke → crest → reveal) | Big wow on first load; skippable, once per visit |
| 9 | Music | **None** | Explicitly declined; avoids autoplay annoyance |
| 10 | Signature effects | **Red light leaks only** | Matches photoshoot; keeps site clean (grain/smoke/embers deferred) |
| 11 | Copy tone | **Themed but tasteful** | Readable for all guests; theme via subtle section names + visuals |
| 12 | Event details / photos / story | **Placeholders for now** | Real values added later via `content/` + `public/gallery/`; noir story copy to be drafted |

## Deferred / possible later
- Extra RSVP fields (meal choice, message, +1, dietary notes)
- Subtle film grain + vignette toggle
- Drifting smoke / cursor embers on main site
- Auto-emailing invites
- Bulk CSV import of guest list
- Editing/disabling invites from admin

## Open items
- Final event details, venue, map, timeline
- Photoshoot images
- Real "Our Story" text
- Exact brand hex values & font choices (decided at scaffold)
- Styling library (Tailwind likely)
