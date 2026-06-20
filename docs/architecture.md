# Architecture

## Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js (App Router)** | Single deploy for the showcase site |
| Styling | **Global CSS + Tailwind utilities** | Existing visual system from the source sample |
| Content source | `content/config.ts` | Central place for placeholder names, dates, venues, and copy |
| Assets | `public/gallery/` | Static showcase images |
| Hosting | **Vercel** | No environment variables required for this sample build |

## Project layout

```text
package-three-sample/
|- docs/
|- app/
|- components/
|- content/
|- public/gallery/
`- package.json
```

## Deployment

This sample should build on Vercel without any `.env` configuration.
