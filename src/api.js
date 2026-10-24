// Data comes from ESPN's public (unauthenticated) site API, called straight
// from the browser. Every response is normalized here so the components never
// touch ESPN's raw shapes.

const SITE = 'https://site.api.espn.com/apis/site/v2/sports'
const CORE = 'https://site.api.espn.com/apis/v2/sports'

export const SPORTS = [
  {
    id: 'cfb',
    name: 'Football',
    short: 'CFB',
    icon: '🏈',
    path: 'football/college-football',
    byWeek: true,
    divisions: [
      { id: '80', label: 'FBS' },
      { id: '81', label: 'FCS' },
    ],
    // Scoreboard league picker, mirroring ESPN's college football scoreboard.
    // 'top25' is FBS filtered to ranked teams.
    quickLeagues: ['top25', '4', '5', '9', '8'],
    leagues: [
      { id: 'top25', label: 'Top 25', section: '' },
      { id: '80', label: 'FBS (All)', section: 'FBS' },
      { id: '1', label: 'ACC', section: 'FBS' },
      { id: '151', label: 'American', section: 'FBS' },
      { id: '4', label: 'Big 12', section: 'FBS' },
      { id: '5', label: 'Big Ten', section: 'FBS' },
      { id: '12', label: 'Conference USA', section: 'FBS' },
      { id: '18', label: 'FBS Independents', section: 'FBS' },
      { id: '15', label: 'MAC', section: 'FBS' },
      { id: '17', label: 'Mountain West', section: 'FBS' },
      { id: '9', label: 'Pac-12', section: 'FBS' },
      { id: '8', label: 'SEC', section: 'FBS' },
      { id: '37', label: 'Sun Belt', section: 'FBS' },
      { id: '81', label: 'FCS (All)', section: 'FCS' },
      { id: '20', label: 'Big Sky', section: 'FCS' },
      { id: '48', label: 'CAA', section: 'FCS' },
      { id: '32', label: 'FCS Independents', section: 'FCS' },
      { id: '22', label: 'Ivy League', section: 'FCS' },
      { id: '24', label: 'MEAC', section: 'FCS' },
      { id: '21', label: 'MVFC', section: 'FCS' },
      { id: '25', label: 'NEC', section: 'FCS' },
      { id: '26', label: 'OVC', section: 'FCS' },
      { id: '27', label: 'Patriot', section: 'FCS' },
      { id: '28', label: 'Pioneer', section: 'FCS' },
      { id: '31', label: 'SWAC', section: 'FCS' },
      { id: '29', label: 'Southern', section: 'FCS' },
      { id: '30', label: 'Southland', section: 'FCS' },
      { id: '176', label: 'UAC', section: 'FCS' },
      { id: '35', label: 'NCAA Division II', section: 'Other divisions' },
      { id: '36', label: 'NCAA Division III', section: 'Other divisions' },
    ],
  },
  {
    id: 'mbb',
    name: "Men's Basketball",
    short: 'MBB',
    icon: '🏀',
    path: 'basketball/mens-college-basketball',
    divisions: [{ id: '50', label: 'Division I' }],
  },
  {
    id: 'wbb',
    name: "Women's Basketball",
    short: 'WBB',
    icon: '🏀',
    path: 'basketball/womens-college-basketball',
    divisions: [{ id: '50', label: 'Division I' }],
  },
  {
    id: 'bsb',
    name: 'Baseball',
    short: 'BASE',
    icon: '⚾',
    path: 'baseball/college-baseball',
    divisions: [],
  },
  {
    id: 'sb',
    name: 'Softball',
    short: 'SOFT',
    icon: '🥎',
    path: 'baseball/college-softball',
    divisions: [],
  },
]

export const sportById = (id) => SPORTS.find((s) => s.id === id)

const SECTION_DIVISION = { FBS: '80', FCS: '81' }
const DIVISION_IDS = new Set(['80', '81', '35', '36'])

/**
 * Resolve a league picker id ('top25', a division or a conference) into
 * { id, label, section, division, conference, top25 }.
 */
export function leagueInfo(sport, id) {
  const l = sport.leagues?.find((x) => x.id === id) ?? sport.leagues?.[0]
  if (!l) return null
  const top25 = l.id === 'top25'
  const isDivision = top25 || DIVISION_IDS.has(l.id)
  return {
    ...l,
    top25,
    division: top25 ? '80' : isDivision ? l.id : SECTION_DIVISION[l.section],
    conference: isDivision ? null : l.id,
  }
}

/** Does a standings group correspond to this league picker entry? */
export function groupMatches(group, league) {
  if (String(group.id) === league.id) return true
  const label = league.label.toLowerCase()
  const name = group.name.toLowerCase()
  return group.abbr?.toLowerCase() === label || name === label || name.startsWith(`${label} · `)
}

// ---------- fetching ----------

const cache = new Map()
const CACHE_MS = 20_000

async function getJSON(url, { fresh = false } = {}) {
  const hit = cache.get(url)
  if (!fresh && hit && Date.now() - hit.at < CACHE_MS) return hit.data
  const res = await fetch(url)
  if (!res.ok) throw new Error(`ESPN returned ${res.status}`)
  const data = await res.json()
  cache.set(url, { at: Date.now(), data })
  return data
}

// ---------- dates ----------

export function toKey(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}${m}${day}`
}

export function fromKey(key) {
  return new Date(+key.slice(0, 4), +key.slice(4, 6) - 1, +key.slice(6, 8))
}

export function shiftKey(key, days) {
  const d = fromKey(key)
  d.setDate(d.getDate() + days)
  return toKey(d)
}

export const todayKey = () => toKey(new Date())

// ---------- scoreboard ----------

/**
 * opts: { date: 'YYYYMMDD' } for day-based sports,
 *       { week, seasonType } for football (both optional = current week),
 *       { division } group id.
 */
export async function fetchScoreboard(sport, opts = {}, fetchOpts) {
  const q = new URLSearchParams({ limit: '1000' })
  if (sport.byWeek) {
    if (opts.week) q.set('week', opts.week)
    if (opts.seasonType) q.set('seasontype', opts.seasonType)
  } else if (opts.date) {
    q.set('dates', opts.date)
  }
  const division = opts.division ?? sport.divisions[0]?.id
  if (division) q.set('groups', division)

  const raw = await getJSON(`${SITE}/${sport.path}/scoreboard?${q}`, fetchOpts)
  const league = raw.leagues?.[0] ?? {}
  return {
    events: (raw.events ?? []).map((e) => normalizeEvent(e, sport)),
    week: raw.week?.number ?? null,
    seasonType: raw.season?.type ?? null,
    calendar: normalizeCalendar(league.calendar),
    seasonStart: league.calendarStartDate ?? league.season?.startDate ?? null,
    seasonEnd: league.calendarEndDate ?? league.season?.endDate ?? null,
  }
}

function normalizeCalendar(cal) {
  // Football calendars are [{label, value, entries:[{label, value, startDate}]}];
  // day-based sports return a flat list of date strings, which we don't need.
  if (!Array.isArray(cal) || typeof cal[0] !== 'object') return []
  return cal.flatMap((part) =>
    (part.entries ?? []).map((w) => ({
      label: w.label,
      detail: w.detail,
      week: w.value,
      seasonType: part.value,
      group: part.label,
      start: w.startDate,
      end: w.endDate,
    })),
  )
}

function teamLogo(team) {
  return team?.logo ?? team?.logos?.[0]?.href ?? null
}

function normalizeCompetitor(c, situation) {
  const t = c.team ?? {}
  const rank = c.curatedRank?.current
  return {
    id: t.id,
    name: t.shortDisplayName ?? t.location ?? t.displayName ?? t.name,
    fullName: t.displayName ?? t.name,
    abbr: t.abbreviation,
    logo: teamLogo(t),
    color: t.color ? `#${t.color}` : null,
    score: c.score ?? '',
    rank: rank && rank <= 25 ? rank : null,
    record: c.records?.find((r) => r.type === 'total')?.summary ?? c.records?.[0]?.summary ?? '',
    winner: !!c.winner,
    possession: situation?.possession != null && situation.possession === t.id,
  }
}

function normalizeEvent(e, sport) {
  const comp = e.competitions?.[0] ?? {}
  const status = comp.status ?? e.status ?? {}
  const type = status.type ?? {}
  const sit = comp.situation
  const competitors = comp.competitors ?? []
  const home = competitors.find((c) => c.homeAway === 'home') ?? competitors[0]
  const away = competitors.find((c) => c.homeAway === 'away') ?? competitors[1]

  return {
    id: e.id,
    sport: sport.id,
    date: e.date,
    state: type.state ?? 'pre', // pre | in | post
    detail: type.shortDetail ?? type.detail ?? '',
    completed: !!type.completed,
    neutral: !!comp.neutralSite,
    conferenceGame: !!comp.conferenceCompetition,
    note: comp.notes?.[0]?.headline ?? '',
    venue: comp.venue?.fullName ?? '',
    broadcast:
      comp.broadcasts?.flatMap((b) => b.names ?? []).join(', ') ||
      comp.geoBroadcasts?.map((b) => b.media?.shortName).filter(Boolean).join(', ') ||
      '',
    situation: sit?.downDistanceText ?? sit?.shortDownDistanceText ?? '',
    link: e.links?.find((l) => l.rel?.includes('summary'))?.href ?? e.links?.[0]?.href ?? null,
    home: home ? normalizeCompetitor(home, sit) : null,
    away: away ? normalizeCompetitor(away, sit) : null,
  }
}

// ---------- rankings ----------

export async function fetchRankings(sport) {
  const raw = await getJSON(`${SITE}/${sport.path}/rankings`)
  return (raw.rankings ?? []).map((poll) => ({
    id: poll.id ?? poll.name,
    name: poll.name,
    short: poll.shortName ?? poll.name,
    headline: poll.headline ?? '',
    date: poll.date ?? null,
    ranks: (poll.ranks ?? []).map((r) => ({
      rank: r.current,
      previous: r.previous,
      trend: r.trend,
      points: r.points,
      firstPlace: r.firstPlaceVotes,
      record: r.recordSummary ?? '',
      team: {
        id: r.team?.id,
        name: r.team?.nickname ?? r.team?.location ?? r.team?.name,
        fullName: [r.team?.location, r.team?.name].filter(Boolean).join(' '),
        abbr: r.team?.abbreviation,
        logo: teamLogo(r.team),
      },
    })),
    others: (poll.others ?? []).map((o) => ({
      name: o.team?.nickname ?? o.team?.location ?? o.team?.name,
      points: o.points,
    })),
    dropped: (poll.droppedOut ?? []).map(
      (o) => o.team?.nickname ?? o.team?.location ?? o.team?.name,
    ),
  }))
}

// ---------- standings ----------

const RECORD = /^\d+-\d+(-\d+)?$/

function findStat(stats, ...keys) {
  const lower = keys.map((k) => k.toLowerCase())
  return stats.find(
    (s) => lower.includes(s.type?.toLowerCase()) || lower.includes(s.name?.toLowerCase()),
  )
}

function recordOf(stat) {
  const v = stat?.displayValue ?? stat?.summary
  return v && RECORD.test(v) ? v : null
}

function pct(record) {
  if (!record) return -1
  const [w, l, t = 0] = record.split('-').map(Number)
  const g = w + l + t
  return g ? (w + t / 2) / g : 0
}

function normalizeEntry(entry) {
  const stats = entry.stats ?? []
  const wins = findStat(stats, 'wins')?.value
  const losses = findStat(stats, 'losses')?.value
  const overall =
    recordOf(findStat(stats, 'total', 'overall')) ??
    (wins != null && losses != null ? `${wins}-${losses}` : '')
  const conf = recordOf(findStat(stats, 'vsconf', 'vsConf', 'conference')) ?? ''
  const t = entry.team ?? {}
  return {
    team: {
      id: t.id,
      name: t.shortDisplayName ?? t.location ?? t.displayName,
      fullName: t.displayName,
      abbr: t.abbreviation,
      logo: teamLogo(t),
    },
    overall,
    conf,
    gb: findStat(stats, 'gamesBehind')?.displayValue ?? '',
    streak: findStat(stats, 'streak')?.displayValue ?? '',
    seed: findStat(stats, 'playoffSeed')?.value ?? null,
  }
}

function sortEntries(entries) {
  const seeded = entries.every((e) => e.seed > 0)
  return [...entries].sort((a, b) =>
    seeded
      ? a.seed - b.seed
      : pct(b.conf) - pct(a.conf) ||
        parseInt(b.conf) - parseInt(a.conf) ||
        pct(b.overall) - pct(a.overall),
  )
}

function collectGroups(node, prefix, out) {
  const label = prefix && node.name !== prefix ? `${prefix} · ${node.name}` : node.name
  const entries = node.standings?.entries
  if (entries?.length) {
    out.push({
      id: node.id ?? label,
      name: label,
      abbr: node.abbreviation ?? '',
      entries: sortEntries(entries.map(normalizeEntry)),
    })
  }
  for (const child of node.children ?? []) collectGroups(child, label, out)
  return out
}

export async function fetchStandings(sport, division) {
  const q = new URLSearchParams()
  const group = division ?? sport.divisions[0]?.id
  if (group) q.set('group', group)
  const raw = await getJSON(`${CORE}/${sport.path}/standings?${q}`)
  const out = []
  for (const child of raw.children ?? []) collectGroups(child, '', out)
  if (!out.length && raw.standings) collectGroups(raw, '', out)
  return out
}
