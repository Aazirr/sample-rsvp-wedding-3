# Data Model

## `guests` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (PK) | generated |
| `token` | text, unique, indexed | the unguessable value in the invite link |
| `name` | text | the named invitee (pre-filled on their page) |
| `status` | enum: `pending` \| `accepted` \| `declined` | defaults to `pending` |
| `responded_at` | timestamptz, nullable | set when they first respond; updated on change |
| `created_at` | timestamptz | defaults to now() |

### Future columns (planned, not built yet)

Add without rewrite when the couple decides:
- `meal_choice` text
- `message` text
- `plus_one_name` text
- `dietary_notes` text

## Token generation

- Generated server-side, **unguessable** (e.g. `nanoid` / crypto random, ~12+ chars, URL-safe).
- One token per guest, unique constraint at the DB level.
- The token IS the authentication for the invite page — knowing it = being invited.

## CSV export

One-click export from the admin dashboard.

**Current columns:**
```
name, status, responded_at
```

**Behavior:**
- Exports all guests (including `pending`).
- Filename like `rsvp-export-YYYY-MM-DD.csv`.
- Extensible — new schema columns get added to the export automatically/explicitly.

## Duplicate prevention (data-level)

- One row per guest, created by the admin ahead of time.
- No public/open insert path — guests cannot create rows.
- Unique constraint on `token`.
- Result: **a guest cannot RSVP twice and cannot create a duplicate entry.**
  Responding again only **updates** their existing row (answer is changeable).
