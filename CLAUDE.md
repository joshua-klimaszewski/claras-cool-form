# Clara's Cool Form

Student self-assessment wizard (25 traits, 1-5 scale) ending in a radar chart
that's automatically emailed to the student and to a fixed admin email.

See `plans/SPEC.md` for the full spec and `plans/LOG.md` for session history
and open questions — check LOG.md at the start of each session.

## Stack
- React + Vite, deployed to GitHub Pages (`base: '/claras-cool-form/'`)
- `recharts` for the radar chart
- `@emailjs/browser` for client-side email sending (no backend)

## Key files
- `src/data/traits.js` — the 25 trait definitions (placeholder until real
  content is provided)
- `src/emailConfig.js` — EmailJS service/template/public keys + admin
  recipient email (needs real values filled in)
- `src/components/` — wizard steps, radar chart, email step

## Workflow
Feature branches (`feat/<name>`, `fix/<name>`) only; `main` is protected.
`ci.yml` runs build checks on PRs; `deploy.yml` publishes `dist/` to
`gh-pages` on merge to `main`.
