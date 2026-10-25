// Builds public/data/draft.json: every NFL draft pick since 2000, grouped by
// college ("Location|Name", matching ESPN team names). Runs in CI before the
// Vite build; on failure it writes what it has so the site still deploys.
import { mkdir, writeFile } from 'node:fs/promises'

const FIRST = 2000
const last = new Date().getFullYear()
const byCollege = {}
let years = 0

for (let year = last; year >= FIRST; year--) {
  try {
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/draft?season=${year}`)
    if (!res.ok) continue
    const raw = await res.json()
    if (!raw.picks?.length || Number(raw.year) !== year) continue
    const teams = Object.fromEntries((raw.teams ?? []).map((t) => [t.id, t.abbreviation ?? t.displayName]))
    const positions = Object.fromEntries((raw.positions ?? []).map((p) => [p.id, p.abbreviation]))
    for (const p of raw.picks) {
      const a = p.athlete
      if (!a?.team?.location || p.status !== 'SELECTION_MADE') continue
      const key = `${a.team.location}|${a.team.name ?? ''}`
      ;(byCollege[key] ??= []).push([year, p.round, p.overall, a.displayName, positions[a.position?.id] ?? '', teams[p.teamId] ?? ''])
    }
    years++
  } catch (err) {
    console.warn(`draft ${year}: ${err.message}`)
  }
}

await mkdir('public/data', { recursive: true })
await writeFile('public/data/draft.json', JSON.stringify({ built: new Date().toISOString(), byCollege }))
console.log(`draft.json: ${years} drafts, ${Object.keys(byCollege).length} colleges`)
