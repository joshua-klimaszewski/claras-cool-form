# Clara's Cool Form — Spec

## Purpose
A student self-assessment wizard: 25 traits, rated 1-5 each, ending in a radar
chart visualization that is emailed automatically to the student and to a
fixed admin/designated email.

## Flow

1. **Intake** — name, email, program (dropdown), year (dropdown), all
   required/validated, before starting the assessment.
2. **Trait wizard** — 25 questions, one per step, each rated on a 1-5 scale.
   Each step shows the trait's name and full definition; the 5-point scale
   itself has fixed labels (see Rating scale below). Progress indicator shown
   throughout.
3. **Results** — a radar chart (25 axes, one per trait — axis labels show only
   the trait name, not its definition) rendered from the student's answers.
4. **Auto-email** — on reaching the results screen, the app automatically:
   - renders the radar chart to an image
   - sends an email containing the chart to the student's collected email
   - sends the same email to a fixed admin email configured in the app

## Rating scale

1 = I don't know how to do this
2 = I'm a beginner
3 = I'm average at this
4 = I'm good at this
5 = I've mastered this

## Traits

The real 25 traits (name + definition) and intake dropdown options
(Program, Year) live in `src/data/traits.js`, sourced from the program's
Google Doc.

## Tech choices

- **React + Vite**, deployed to GitHub Pages (base path `/claras-cool-form/`).
- **recharts** for the radar chart (`RadarChart` component).
- **EmailJS** (`@emailjs/browser`) for client-side email sending — no backend
  needed. Requires a EmailJS account + service/template IDs (see
  `src/emailConfig.js`).
- Admin destination email is a constant in `src/emailConfig.js`, not
  user-editable in the UI.

## Out of scope (for MVP)

- Persisting/storing submitted assessments anywhere (no database).
- Editing/retaking without a full page reload.
- Auth/accounts.
