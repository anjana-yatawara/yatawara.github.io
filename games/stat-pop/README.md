# STAT POP! — MATH 2200 Candy Quest

A 64-question continuous, mobile-friendly practice quiz based on the supplied MATH 2200 quiz and answer key. It samples the major topics with some cumulative review; it does not include every source subpart. Students answer the activities in order and receive one final score: the number answered correctly on the first submission. Progress is saved in the browser on the current device; no accounts, analytics, or student identifiers are used.

## Run locally

Serve this folder with a static server (ES modules require HTTP):

```sh
python -m http.server 8000
```

Open `http://localhost:8000/` in a modern browser.

## Deploy

Copy the project to a folder in a GitHub Pages repository and link to its `index.html`. Project paths are relative, so the quiz also works under a repository subpath. Fetch the current Pages branch before updating an existing website. No build step or server is needed.

## Maintenance

- `js/data/questions.js` contains the full 161-activity bank. `js/data/quizSelection.js` selects and orders the 64 questions used in the quiz. Numeric answers use a tolerance.
- `js/config.js` contains the home link and the editable exam notice. Set `examNotice` to an empty string to remove it.
- `js/engine.js` handles grading and saved progress; `js/app.js` handles the interface; styles live in `css/style.css`.
- `COVERAGE_REPORT.md` maps the full question bank (not just the shortened quiz) to the source material. Review the original quiz and answer key when changing content.
- Students receive feedback after each submission. The final score counts correct first submissions. Restarting clears the current quiz progress after confirmation. Progress is stored only in the current browser and may be unavailable when storage is blocked.
- The motion toggle is in the top bar; the application also honors the operating system's reduced-motion setting.
- Use `?dev=1` to inspect question details during development.

## Tests

Run `npm test` with Node.js installed. Verify course content against the supplied source materials before publishing changes.

## Artwork

The game uses original artwork inspired by a general candy and cloud aesthetic. Reference images are not included.
