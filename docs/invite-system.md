# Invite & RSVP System

The core feature: **unique, single-purpose invites that make duplicate
applicants structurally impossible.**

## Model: one person per invite

- The admin creates each guest ahead of time → the system generates a unique,
  unguessable token → that token becomes the guest's personal link:

  ```
  yoursite.com/invite/7Kq9-mZ2x
  ```

- **No open signup exists.** There is no public "RSVP here" form anyone can fill.
  The only way to respond is via a pre-issued token. This blocks gate-crashers
  and duplicates at the root.

## Guest flow

1. Guest opens their personal link → `/invite/[token]`.
2. The page validates the token:
   - **Valid:** cinematic page fades in, greets them by **pre-filled name**
     ("Welcome, **[Name]**"), shows **Accept / Decline**.
   - **Invalid / unknown:** in-theme page — *"This invitation could not be found."*
3. Guest confirms their name and chooses **Accept** or **Decline** → confirmation animation.
4. **Changeable:** returning to the same link lets them switch their answer.
   The existing response is shown and can be updated.

### Name handling
- **Pre-filled, guest confirms.** Admin assigns the name when creating the invite;
  the guest just confirms it. (Most cinematic & personal; avoids typos.)

### Change-after-submit
- **Allowed.** Forgiving if someone misclicks or plans change. Updates the same row.

## Why duplicates are impossible

| Risk | How it's prevented |
|------|--------------------|
| Same person RSVPs twice | One token = one row; responding again **updates**, never inserts |
| Two people share a link | Still one row — last response wins (couple controls distribution) |
| Stranger RSVPs | No token → invalid page; no open form to submit |
| Typo'd duplicate names | Names are pre-assigned by admin, not free-typed |

## States

```
pending  ──Accept──▶ accepted ──(change)──▶ declined
   │                     ▲                      │
   └──────Decline────────┘◀────────(change)─────┘
```

## Edge cases to handle at build

- Token not found → themed 404-style invite page.
- Already responded → show current answer + allow change.
- Malformed token in URL → same as not found.
- (Optional later) expire/disable an invite from admin.
