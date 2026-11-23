# Global Supplements Academy — proof of concept

A static demo site for product learning across the Global Supplements brands: **NAF**, **Natural VetCare (NVC)** and **NutriLabs**.

## Features
- Home page and a themed learning hub for each brand, styled after that brand's own website
- Courses made of **video lessons**, **click-through presentations** and **multiple-choice quizzes** (instant feedback, explanations, 80% pass mark)
- Progress tracking, a "My learning" dashboard and a printable **certificate** for each completed course
- Works on mobile and desktop; no build step and no server code

## Run it locally
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Edit content
All courses, slides and quiz questions live in `js/data.js`.
- **Videos:** set `youtubeId` (for example `"dQw4w9WgXcQ"`) or `src` (an `.mp4` URL). Leave both empty to show the demo placeholder player.
- **Presentations:** each slide takes a `heading`, plus optional `body`, `bullets` and a `stat` callout.
- **Quizzes:** each question takes the `q` text, `options`, the correct `answer` (counted from 0) and an `explain` line.

## Notes for the proof of concept
- Progress is saved only in the visitor's browser (`localStorage`). A production version would add learner accounts and a backend or LMS.
- The course copy is illustrative and needs a technical and regulatory review before real use.
- To host it, any static host works, such as GitHub Pages, Netlify or Azure Static Web Apps.
