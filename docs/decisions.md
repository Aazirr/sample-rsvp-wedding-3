# Decisions

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | Sample scope | **Static showcase only** | Keeps the handoff lightweight and easy to deploy |
| 2 | RSVP section | **Visual demo, not live data** | Preserves the presentation without backend setup |
| 3 | Admin tools | **Removed from sample** | Avoids auth, database, and maintenance overhead |
| 4 | Content management | **Single config file** | Fast for placeholder swaps and client demos |
| 5 | Deployment target | **Vercel with zero env vars** | Easiest path for a stable showcase URL |
