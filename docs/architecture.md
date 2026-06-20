# Architecture

## Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js (App Router)** | Public site, invite/RSVP pages, admin, and API routes in one deploy |
| Database | **Neon** (serverless Postgres) | Free tier comfortably covers a wedding |
| Hosting | **Vercel** | Git-based deploys, free tier |
| DB access | Drizzle ORM *or* `pg` | Lightweight query layer, easy to read & extend |
| Styling | TBD (Tailwind likely) | Decided at scaffold time |

## High-level layout (planned)

```
wedding-invitation/
├── docs/                  # ← this documentation
├── app/
│   ├── page.tsx           # public homepage (hero + scenes)
│   ├── invite/[token]/    # personal RSVP page
│   ├── admin-[secret]/    # secret admin dashboard
│   └── api/               # RSVP + admin API routes
├── components/            # hero, intro, gallery, light-leak overlay, etc.
├── lib/                   # db client, token generation, csv export
├── public/
│   └── gallery/           # photoshoot images dropped in here
├── content/               # editable content/config (dates, venue, copy)
└── .env.local             # secrets — NEVER committed
```

## Secrets / environment

Stored in `.env.local` (gitignored), set in Vercel project settings for prod:

| Var | Purpose |
|-----|---------|
| `DATABASE_URL` | Neon Postgres connection string |
| `ADMIN_PASSWORD` | Password for the admin dashboard |
| `ADMIN_PATH_SECRET` | The unguessable segment of the admin URL |

> Real values are never committed. They're created in Neon/Vercel at deploy time.

## Extensibility

The schema and RSVP form are intentionally minimal now (accept/decline + name)
but built to add fields later without a rewrite — see [data-model.md](./data-model.md)
and [decisions.md](./decisions.md).
