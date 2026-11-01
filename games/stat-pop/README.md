# STAT POP! — MATH 2200 Candy Quest

A static, mobile-friendly practice quest based on the supplied MATH 2200 practice quiz and answer key. The game uses no accounts, analytics, or student identifiers. Progress is saved locally in the browser on the current device.

## Run locally

Serve this folder with a static server (ES modules do not reliably work from a `file:` URL):

```sh
python -m http.server 8000
```

Open `http://localhost:8000/`. A modern browser is required.

## Deploy

Copy the project to a folder in a GitHub Pages repository and link to its `index.html`. All project paths are relative so the game can run under a repository subpath. Serve from the repository's configured Pages branch or folder. If updating an existing website, fetch its current branch first and preserve existing site content. No server, build step, or GitHub Actions workflow is needed.

## Maintenance

- `js/data/questions.js` holds prompts, answer choices, explanations, source IDs and world assignments. Choice answers refer to stable IDs rather than display positions. Numeric answers use a tolerance.
- `js/config.js` holds world names, the home link, and the exam notice. Set `examNotice` to an empty string to remove it.
- `js/engine.js` contains grading, mastery, retry, and local storage logic. `js/app.js` handles the interface. Styles live in `css/style.css`.
- `COVERAGE_REPORT.md` documents source coverage. Review the original quiz and answer key when changing course content.
- Questions become mastered only after a correct response; mastery is calculated from mastered questions. Incorrect answers are saved for a later retry. Worlds unlock as the previous world is mastered. The last celebration requires all questions to be mastered.
- Use **Reset progress** on the world map and confirm to clear progress. Clearing browser storage also removes it. Storage may be unavailable in private or restricted browser configurations.
- The motion toggle is in the top bar. The application also honors the operating system's reduced-motion preference.
- Use `?dev=1` for development details in question cards.

## Tests

Run `npm test` with Node.js installed. The tests check source coverage, grading, mastery, retry, and storage behavior. Verify course content against the supplied source materials before publishing updates.

## Artwork

The game uses original artwork inspired by a general candy and cloud aesthetic. The source reference images are not included in the deployed game.

