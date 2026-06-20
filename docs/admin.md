# Admin Dashboard

A private dashboard for the couple/admin to manage guests and responses.

## Access

- **Secret URL + password.**
  - Lives at an unguessable path, e.g. `/admin-[ADMIN_PATH_SECRET]`.
  - Also requires `ADMIN_PASSWORD` to unlock.
- Both values come from environment variables (see [architecture.md](./architecture.md)).

## Features

### Manage guests
- **Add guest:** enter a name → system auto-generates a unique token + copyable
  invite link.
- **Copy link:** one-click copy of each guest's personal URL to send manually
  (text / Messenger / email yourself).
- List of all guests with their current status.

### Live dashboard
- Counts: **total / accepted / declined / pending**.
- Per-guest status and response time.

### Export
- **Export CSV** button → downloads `name, status, responded_at` (extensible).
  See [data-model.md](./data-model.md#csv-export).

## Distribution model

Admin generates links and sends them manually — no automated emailing in v1.
(Auto-email could be added later if guest emails are collected.)

## Out of scope (v1)

- Multiple admin accounts / email login (single shared password is enough).
- Editing/disabling invites (possible later enhancement).
- Bulk CSV import of a guest list (possible later enhancement).
