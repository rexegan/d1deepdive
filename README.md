# D1 Deep Dive

One place to follow NCAA Division I football, men's and women's basketball, baseball, and softball: live scores, schedules, AP/Coaches rankings, and conference standings.

- **Home** pulls every sport's scoreboard at once: your followed teams first, then live games, then each sport's Top 25 matchups.
- **Scores** by day (by week for football, FBS or FCS), filterable by Top 25, My Teams, Live, or team name. Live games auto-refresh every 30 seconds.
- **Follow teams** with the ☆ next to any team. Favorites are saved in your browser.

Data comes from ESPN's public site API, called directly from the browser (no backend, no API key).

## Development

```sh
npm install
npm run dev
```

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.
