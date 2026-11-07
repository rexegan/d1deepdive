// Builds public/data/cfb-defense.json for National Stats:
//   jersey: { athleteId: '55' } for every FBS roster (ESPN's stat feeds
//           leave jersey numbers out)
//   tfl:    { teamId: total } team tackles for loss, summed from every
//           player's TFL (ESPN's team stat feed has no defensive numbers)
//   player: { athleteId: [tfl, teamId, name, position] } this season's TFL
//           for every FBS player with one (ESPN's leaders feed and the athlete
//           feeds behind player profiles leave TFL out)
//   teams:  { teamId: [abbreviation, short name, color] }
// Runs in CI before the Vite build; on failure it writes what it has so the
// site still deploys.
import { mkdir, writeFile } from 'node:fs/promises'

const SITE = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football'
const WEB = 'https://site.web.api.espn.com/apis/common/v3/sports/football/college-football'
const Q = 'region=us&lang=en&contentorigin=espn&seasontype=2'

async function getJSON(url, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`${res.status} ${url}`)
      return await res.json()
    } catch (err) {
      if (i >= tries) throw err
      await new Promise((r) => setTimeout(r, 1000 * i))
    }
  }
}

const out = { built: new Date().toISOString(), season: null, jersey: {}, tfl: {}, player: {}, teams: {} }

// The season with numbers in it: this year's, or last year's before kickoff.
let season = new Date().getFullYear()
let teams = []
for (const s of [season, season - 1]) {
  try {
    const raw = await getJSON(`${WEB}/statistics/byteam?${Q}&page=1&limit=200&season=${s}`)
    teams = (raw.teams ?? []).map((t) => t.team?.id).filter(Boolean)
    for (const { team: t } of raw.teams ?? []) {
      if (t?.id) out.teams[t.id] = [t.abbreviation ?? '', t.shortDisplayName ?? t.displayName ?? '', t.color ?? '']
    }
    if (teams.length) {
      season = s
      break
    }
  } catch (err) {
    console.warn(`teams ${s}: ${err.message}`)
  }
}
out.season = season

// Jersey numbers from each team's roster, ten at a time.
for (let i = 0; i < teams.length; i += 10) {
  await Promise.all(
    teams.slice(i, i + 10).map(async (id) => {
      try {
        const raw = await getJSON(`${SITE}/teams/${id}/roster`)
        for (const g of raw.athletes ?? []) {
          for (const a of g.items ?? [g]) if (a.id && a.jersey) out.jersey[a.id] = String(a.jersey)
        }
      } catch (err) {
        console.warn(`roster ${id}: ${err.message}`)
      }
    }),
  )
}

// Team TFL: every FBS player ranked by TFL, paged until the zeros start.
try {
  for (let page = 1; page <= 10; page++) {
    const raw = await getJSON(
      `${WEB}/statistics/byathlete?${Q}&isqualified=false&page=${page}&limit=1000` +
        `&sort=defensive.tacklesForLoss:desc&season=${season}&group=80&category=defense`,
    )
    const col = (raw.categories ?? []).find((c) => c.name === 'defensive')?.names?.indexOf('tacklesForLoss') ?? -1
    if (col < 0) break
    let any = false
    for (const row of raw.athletes ?? []) {
      const a = row.athlete ?? {}
      const team = a.teams?.[0]?.id ?? a.teamId
      const v = parseFloat(row.categories?.find((c) => c.name === 'defensive')?.totals?.[col])
      if (!(v > 0)) continue
      if (a.id) out.player[a.id] = [v, team ?? null, a.displayName ?? '', a.position?.abbreviation ?? '']
      if (team) out.tfl[team] = (out.tfl[team] ?? 0) + v
      any = true
    }
    if (!any || page >= (raw.pagination?.pages ?? 1)) break
  }
} catch (err) {
  console.warn(`tfl: ${err.message}`)
}

await mkdir('public/data', { recursive: true })
await writeFile('public/data/cfb-defense.json', JSON.stringify(out))
console.log(
  `cfb-defense.json: ${season}, ${teams.length} teams, ${Object.keys(out.jersey).length} jerseys, ` +
    `${Object.keys(out.tfl).length} teams and ${Object.keys(out.player).length} players with TFL`,
)
