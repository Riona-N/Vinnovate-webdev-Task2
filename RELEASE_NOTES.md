Release Notes — Badminton Theme Update

Date: 2025-12-23

Summary:
- Re-themed UI to a badminton aesthetic using a court-green + racket-yellow palette.
- Added decorative and animated shuttlecock SVG in the hero with reduced-motion support and accessibility considerations.
- Introduced inline SVG icon sprite (shuttle, racket) and used icons in footer and gallery headings.
- Implemented a high-contrast toggle with persistence via localStorage.
- Improved accessibility: keyboard focus styles, :focus-visible support, aria attributes on controls, and contrast fixes for light backgrounds.
- Updated chart colors to match the new palette and tuned shadows/gradients across components.

Files Modified:
- `styles.css` — theme variables, component styles, animations, contrast fixes.
- `index.html` — inserted shuttlecock SVG and SVG sprite, added contrast toggle control.
- `script.js` — added contrast toggle initialization, persisted preference handling, updated chart color vars.
- `RELEASE_NOTES.md` — (this file) summary and deployment notes.

Suggested Commit Message:
"feat(theme): apply badminton court theme (green/yellow), add shuttlecock, icons, and high-contrast mode"

Deployment Notes:
- This is a static front-end update (HTML/CSS/JS). No build step required.
- Recommended steps:
  1. Run a final local check in different browsers and at multiple viewport sizes.
  2. Commit changes and push to the repository:
     git add .
     git commit -m "feat(theme): apply badminton court theme (green/yellow), add shuttlecock, icons, and high-contrast mode"
     git push
  3. Deploy to static hosting (e.g., GitHub Pages, Netlify, or Vercel) as usual.

Post-deploy Checklist:
- Verify the contrast toggle persists across reloads and works in both light/dark OS modes.
- Validate keyboard navigation and focus-visible outlines across interactive elements.
- Optional: run an automated accessibility (a11y) and contrast audit (e.g., Lighthouse or axe) and address any reported failures.

Notes & Follow-ups:
- I started the Wrap-up & polish phase and added these release notes. Next, I can:
  - run a full visual sweep and make small CSS tweaks (spacing, font sizes, specific component alignments), or
  - run an automated accessibility report and fix any issues it finds.

If you'd like, I can proceed with either of those next steps now — reply with "visual" or "audit" to pick one.