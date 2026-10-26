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
    quickLeagues: ['top25', '8', '7', '21', '23'],
    leagues: [
      { id: 'top25', label: 'Top 25', section: '' },
      { id: '50', label: 'Division I (All)', section: 'Division I' },
      { id: '2', label: 'ACC', section: 'Division I' },
      { id: '1', label: 'America East', section: 'Division I' },
      { id: '62', label: 'American', section: 'Division I' },
      { id: '46', label: 'ASUN', section: 'Division I' },
      { id: '3', label: 'Atlantic 10', section: 'Division I' },
      { id: '8', label: 'Big 12', section: 'Division I' },
      { id: '4', label: 'Big East', section: 'Division I' },
      { id: '5', label: 'Big Sky', section: 'Division I' },
      { id: '6', label: 'Big South', section: 'Division I' },
      { id: '7', label: 'Big Ten', section: 'Division I' },
      { id: '9', label: 'Big West', section: 'Division I' },
      { id: '10', label: 'CAA', section: 'Division I' },
      { id: '11', label: 'Conference USA', section: 'Division I' },
      { id: '45', label: 'Horizon League', section: 'Division I' },
      { id: '12', label: 'Ivy League', section: 'Division I' },
      { id: '14', label: 'MAC', section: 'Division I' },
      { id: '16', label: 'MEAC', section: 'Division I' },
      { id: '13', label: 'Metro Atlantic (MAAC)', section: 'Division I' },
      { id: '18', label: 'Missouri Valley', section: 'Division I' },
      { id: '44', label: 'Mountain West', section: 'Division I' },
      { id: '19', label: 'NEC', section: 'Division I' },
      { id: '20', label: 'OVC', section: 'Division I' },
      { id: '21', label: 'Pac-12', section: 'Division I' },
      { id: '22', label: 'Patriot League', section: 'Division I' },
      { id: '23', label: 'SEC', section: 'Division I' },
      { id: '24', label: 'Southern', section: 'Division I' },
      { id: '25', label: 'Southland', section: 'Division I' },
      { id: '49', label: 'Summit League', section: 'Division I' },
      { id: '27', label: 'Sun Belt', section: 'Division I' },
      { id: '26', label: 'SWAC', section: 'Division I' },
      { id: '30', label: 'UAC', section: 'Division I' },
      { id: '29', label: 'WCC', section: 'Division I' },
    ],
  },
  {
    id: 'wbb',
    name: "Women's Basketball",
    short: 'WBB',
    icon: '🏀',
    path: 'basketball/womens-college-basketball',
    divisions: [{ id: '50', label: 'Division I' }],
    quickLeagues: ['top25', '8', '7', '21', '23'],
    leagues: [
      { id: 'top25', label: 'Top 25', section: '' },
      { id: '50', label: 'Division I (All)', section: 'Division I' },
      { id: '2', label: 'ACC', section: 'Division I' },
      { id: '1', label: 'America East', section: 'Division I' },
      { id: '62', label: 'American', section: 'Division I' },
      { id: '46', label: 'ASUN', section: 'Division I' },
      { id: '3', label: 'Atlantic 10', section: 'Division I' },
      { id: '8', label: 'Big 12', section: 'Division I' },
      { id: '4', label: 'Big East', section: 'Division I' },
      { id: '5', label: 'Big Sky', section: 'Division I' },
      { id: '6', label: 'Big South', section: 'Division I' },
      { id: '7', label: 'Big Ten', section: 'Division I' },
      { id: '9', label: 'Big West', section: 'Division I' },
      { id: '10', label: 'CAA', section: 'Division I' },
      { id: '11', label: 'Conference USA', section: 'Division I' },
      { id: '45', label: 'Horizon League', section: 'Division I' },
      { id: '12', label: 'Ivy League', section: 'Division I' },
      { id: '14', label: 'MAC', section: 'Division I' },
      { id: '16', label: 'MEAC', section: 'Division I' },
      { id: '13', label: 'Metro Atlantic (MAAC)', section: 'Division I' },
      { id: '18', label: 'Missouri Valley', section: 'Division I' },
      { id: '44', label: 'Mountain West', section: 'Division I' },
      { id: '19', label: 'NEC', section: 'Division I' },
      { id: '20', label: 'OVC', section: 'Division I' },
      { id: '21', label: 'Pac-12', section: 'Division I' },
      { id: '22', label: 'Patriot League', section: 'Division I' },
      { id: '23', label: 'SEC', section: 'Division I' },
      { id: '24', label: 'Southern', section: 'Division I' },
      { id: '25', label: 'Southland', section: 'Division I' },
      { id: '47', label: 'Summit League', section: 'Division I' },
      { id: '27', label: 'Sun Belt', section: 'Division I' },
      { id: '26', label: 'SWAC', section: 'Division I' },
      { id: '30', label: 'UAC', section: 'Division I' },
      { id: '29', label: 'WCC', section: 'Division I' },
    ],
  },
  {
    id: 'bsb',
    name: 'Baseball',
    short: 'BASE',
    icon: '⚾',
    path: 'baseball/college-baseball',
    divisions: [],
    // ESPN has no conference data for college baseball, so conference
    // membership is borrowed from men's basketball (ESPN team ids are shared).
    confFrom: 'mbb',
    noRankings: true,
    quickLeagues: ['top25', '8', '7', '21', '23'],
    leagues: [
      { id: 'top25', label: 'Top 25', section: '' },
      { id: 'all', label: 'Division I (All)', section: 'Division I' },
      { id: '2', label: 'ACC', section: 'Division I' },
      { id: '1', label: 'America East', section: 'Division I' },
      { id: '62', label: 'American', section: 'Division I' },
      { id: '46', label: 'ASUN', section: 'Division I' },
      { id: '3', label: 'Atlantic 10', section: 'Division I' },
      { id: '8', label: 'Big 12', section: 'Division I' },
      { id: '4', label: 'Big East', section: 'Division I' },
      { id: '5', label: 'Big Sky', section: 'Division I' },
      { id: '6', label: 'Big South', section: 'Division I' },
      { id: '7', label: 'Big Ten', section: 'Division I' },
      { id: '9', label: 'Big West', section: 'Division I' },
      { id: '10', label: 'CAA', section: 'Division I' },
      { id: '11', label: 'Conference USA', section: 'Division I' },
      { id: '45', label: 'Horizon League', section: 'Division I' },
      { id: '12', label: 'Ivy League', section: 'Division I' },
      { id: '14', label: 'MAC', section: 'Division I' },
      { id: '16', label: 'MEAC', section: 'Division I' },
      { id: '13', label: 'Metro Atlantic (MAAC)', section: 'Division I' },
      { id: '18', label: 'Missouri Valley', section: 'Division I' },
      { id: '44', label: 'Mountain West', section: 'Division I' },
      { id: '19', label: 'NEC', section: 'Division I' },
      { id: '20', label: 'OVC', section: 'Division I' },
      { id: '21', label: 'Pac-12', section: 'Division I' },
      { id: '22', label: 'Patriot League', section: 'Division I' },
      { id: '23', label: 'SEC', section: 'Division I' },
      { id: '24', label: 'Southern', section: 'Division I' },
      { id: '25', label: 'Southland', section: 'Division I' },
      { id: '49', label: 'Summit League', section: 'Division I' },
      { id: '27', label: 'Sun Belt', section: 'Division I' },
      { id: '26', label: 'SWAC', section: 'Division I' },
      { id: '30', label: 'UAC', section: 'Division I' },
      { id: '29', label: 'WCC', section: 'Division I' },
    ],
  },
  {
    id: 'sb',
    name: 'Softball',
    short: 'SOFT',
    icon: '🥎',
    path: 'baseball/college-softball',
    divisions: [],
    confFrom: 'wbb',
    noRankings: true,
    quickLeagues: ['top25', '8', '7', '21', '23'],
    leagues: [
      { id: 'top25', label: 'Top 25', section: '' },
      { id: 'all', label: 'Division I (All)', section: 'Division I' },
      { id: '2', label: 'ACC', section: 'Division I' },
      { id: '1', label: 'America East', section: 'Division I' },
      { id: '62', label: 'American', section: 'Division I' },
      { id: '46', label: 'ASUN', section: 'Division I' },
      { id: '3', label: 'Atlantic 10', section: 'Division I' },
      { id: '8', label: 'Big 12', section: 'Division I' },
      { id: '4', label: 'Big East', section: 'Division I' },
      { id: '5', label: 'Big Sky', section: 'Division I' },
      { id: '6', label: 'Big South', section: 'Division I' },
      { id: '7', label: 'Big Ten', section: 'Division I' },
      { id: '9', label: 'Big West', section: 'Division I' },
      { id: '10', label: 'CAA', section: 'Division I' },
      { id: '11', label: 'Conference USA', section: 'Division I' },
      { id: '45', label: 'Horizon League', section: 'Division I' },
      { id: '12', label: 'Ivy League', section: 'Division I' },
      { id: '14', label: 'MAC', section: 'Division I' },
      { id: '16', label: 'MEAC', section: 'Division I' },
      { id: '13', label: 'Metro Atlantic (MAAC)', section: 'Division I' },
      { id: '18', label: 'Missouri Valley', section: 'Division I' },
      { id: '44', label: 'Mountain West', section: 'Division I' },
      { id: '19', label: 'NEC', section: 'Division I' },
      { id: '20', label: 'OVC', section: 'Division I' },
      { id: '21', label: 'Pac-12', section: 'Division I' },
      { id: '22', label: 'Patriot League', section: 'Division I' },
      { id: '23', label: 'SEC', section: 'Division I' },
      { id: '24', label: 'Southern', section: 'Division I' },
      { id: '25', label: 'Southland', section: 'Division I' },
      { id: '47', label: 'Summit League', section: 'Division I' },
      { id: '27', label: 'Sun Belt', section: 'Division I' },
      { id: '26', label: 'SWAC', section: 'Division I' },
      { id: '30', label: 'UAC', section: 'Division I' },
      { id: '29', label: 'WCC', section: 'Division I' },
    ],
  },
]

// Every league picker starts with Yesterday's Upsets.
for (const s of SPORTS) {
  if (!s.leagues) continue
  s.leagues.unshift({ id: 'upsets', label: "Yesterday's Upsets", section: '' })
  s.quickLeagues.unshift('upsets')
}

export const sportById = (id) => SPORTS.find((s) => s.id === id)

const DIVISION_IDS = new Set(['upsets', '80', '81', '35', '36', '50', 'all'])
const SECTION_DIVISION = { FBS: '80', FCS: '81', 'Division I': '50' }

/**
 * Resolve a league picker id ('top25', a division or a conference) into
 * { id, label, section, division, conference, top25 }. division is the ESPN
 * group to query (undefined = the sport's default feed).
 */
export function leagueInfo(sport, id) {
  const l =
    sport.leagues?.find((x) => x.id === id) ?? sport.leagues?.find((x) => x.id === 'top25') ?? sport.leagues?.[0]
  if (!l) return null
  const upsets = l.id === 'upsets'
  // Upsets behave like Top 25 on Rankings and Standings.
  const top25 = l.id === 'top25' || upsets
  const isDivision = top25 || DIVISION_IDS.has(l.id)
  let division = top25 ? sport.divisions[0]?.id : isDivision ? l.id : SECTION_DIVISION[l.section]
  if (sport.confFrom || division === 'all') division = undefined
  return { ...l, top25, upsets, division, conference: isDivision ? null : l.id }
}

/** The conferences a sport's picker offers (for following). */
export const conferencesOf = (sport) =>
  (sport.leagues ?? []).filter((l) => l.id !== 'top25' && !DIVISION_IDS.has(l.id))

/** Team ids in a conference, from standings (or the borrowed sport's standings). */
export async function conferenceMembers(sport, league) {
  const source = sport.confFrom ? sportById(sport.confFrom) : sport
  // Football standings are split by division; other sports return all of D1.
  const division = sport.byWeek ? league.division : undefined
  const groups = await fetchStandings(source, division)
  return new Set(groups.filter((g) => groupMatches(g, league)).flatMap((g) => g.entries.map((e) => String(e.team.id))))
}

/** Does a standings group correspond to this league picker entry? */
export function groupMatches(group, league) {
  if (String(group.id) === league.id) return true
  const label = league.label.toLowerCase().replace(/ \(.*\)$/, '')
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
  if (sport.byWeek && !opts.date) {
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
    period: status.period ?? 0,
    clock: status.clock ?? null, // seconds left in the period
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

// ---------- team detail ----------

function scoreValue(score) {
  if (score == null) return ''
  if (typeof score === 'object') return score.displayValue ?? String(score.value ?? '')
  return String(score)
}

function normalizeScheduleEvent(e, teamId) {
  const comp = e.competitions?.[0] ?? {}
  const type = (comp.status ?? e.status ?? {}).type ?? {}
  const competitors = comp.competitors ?? []
  const us = competitors.find((c) => String(c.team?.id ?? c.id) === String(teamId))
  const them = competitors.find((c) => c !== us)
  const t = them?.team ?? {}
  const rank = them?.curatedRank?.current
  const usScore = scoreValue(us?.score)
  const themScore = scoreValue(them?.score)
  const state = type.state ?? 'pre'
  return {
    id: e.id,
    date: e.date,
    state,
    detail: type.shortDetail ?? type.detail ?? '',
    home: us?.homeAway === 'home',
    neutral: !!comp.neutralSite,
    conferenceGame: !!comp.conferenceCompetition,
    result:
      state === 'post' && usScore !== '' ? (us?.winner ? 'W' : them?.winner ? 'L' : 'T') : null,
    score: usScore !== '' && themScore !== '' ? `${usScore}-${themScore}` : '',
    pointsFor: Number(usScore) || 0,
    pointsAgainst: Number(themScore) || 0,
    link: e.links?.find((l) => l.rel?.includes('summary'))?.href ?? e.links?.[0]?.href ?? null,
    opponent: {
      id: t.id,
      name: t.shortDisplayName ?? t.location ?? t.displayName,
      fullName: t.displayName,
      abbr: t.abbreviation,
      logo: teamLogo(t),
      rank: rank && rank <= 25 ? rank : null,
    },
  }
}

function normalizeStatCategories(raw) {
  const cats =
    raw?.results?.stats?.categories ?? raw?.statistics?.splits?.categories ?? raw?.splits?.categories ?? []
  return cats
    .map((c) => ({
      name: c.displayName ?? c.name,
      stats: (c.stats ?? [])
        .filter((s) => s.displayValue != null && s.displayValue !== '')
        .map((s) => ({
          name: s.displayName ?? s.shortDisplayName ?? s.name,
          value: s.perGameDisplayValue && /per ?game/i.test(s.displayName ?? '') ? s.perGameDisplayValue : s.displayValue,
          rank: s.rankDisplayValue ?? (s.rank ? `#${s.rank}` : ''),
        })),
    }))
    .filter((c) => c.stats.length)
}

function recordFrom(games) {
  const w = games.filter((g) => g.result === 'W').length
  const l = games.filter((g) => g.result === 'L').length
  const t = games.filter((g) => g.result === 'T').length
  return games.length ? `${w}-${l}${t ? `-${t}` : ''}` : null
}

// ESPN's /teams/{id} endpoint doesn't send CORS headers, so browsers can't
// read it. The card is built from /schedule and /statistics (which do) plus
// the rankings feed.
export async function fetchTeam(sport, id) {
  const base = `${SITE}/${sport.path}/teams/${id}`
  const [schedule, stats, polls] = await Promise.allSettled([
    getJSON(`${base}/schedule`),
    getJSON(`${base}/statistics`),
    fetchRankings(sport),
  ])
  if (schedule.status === 'rejected') {
    // ESPN has no team pages for some sports (college baseball, softball).
    if (/ 40[04]$/.test(schedule.reason?.message ?? ''))
      return { id, limited: true, records: [], games: [], stats: [], rank: null, standing: '', link: null }
    throw schedule.reason
  }
  const t = schedule.value.team ?? stats.value?.team ?? {}
  const games = (schedule.value.events ?? []).map((e) => normalizeScheduleEvent(e, t.id ?? id))
  const done = games.filter((g) => g.result)

  const records = [
    { type: 'total', label: 'Record', summary: t.recordSummary || recordFrom(done) },
    { type: 'conf', label: 'Conference', summary: recordFrom(done.filter((g) => g.conferenceGame)) },
    { type: 'home', label: 'Home', summary: recordFrom(done.filter((g) => g.home && !g.neutral)) },
    { type: 'away', label: 'Away', summary: recordFrom(done.filter((g) => !g.home && !g.neutral)) },
    { type: 'neutral', label: 'Neutral', summary: recordFrom(done.filter((g) => g.neutral)) },
  ].filter((r) => r.summary)

  let rank = null
  if (polls.status === 'fulfilled') {
    for (const poll of polls.value) {
      const hit = poll.ranks.find((r) => String(r.team.id) === String(t.id ?? id))
      if (hit) {
        rank = { rank: hit.rank, poll: poll.short }
        break
      }
    }
  }

  return {
    id: t.id ?? id,
    name: t.displayName ?? [t.location, t.name].filter(Boolean).join(' '),
    short: t.shortDisplayName ?? t.location,
    location: t.location ?? '',
    nickname: t.name,
    seasonYear: schedule.value.season?.year ?? null,
    abbr: t.abbreviation,
    color: t.color ? `#${t.color}` : null,
    logo: teamLogo(t),
    rank,
    standing: t.standingSummary ?? '',
    season: schedule.value.season?.displayName ?? '',
    records,
    link: t.clubhouse ?? null,
    games,
    stats: stats.status === 'fulfilled' ? normalizeStatCategories(stats.value) : [],
  }
}

// ---------- team directory (for adding favorites) ----------

// Built from standings, since ESPN's /teams list has no CORS headers either.
export async function fetchTeams(sport) {
  const divisions = sport.id === 'cfb' ? ['80', '81'] : [undefined]
  const groups = (await Promise.all(divisions.map((d) => fetchStandings(sport, d)))).flat()
  const seen = new Set()
  return groups
    .flatMap((g) => g.entries.map((e) => ({ ...e.team, conference: g.abbr || g.name })))
    .filter((t) => t.id && !seen.has(t.id) && seen.add(t.id))
    .sort((a, b) => (a.fullName ?? a.name).localeCompare(b.fullName ?? b.name))
}

// ---------- roster & players ----------

const WEB = 'https://site.web.api.espn.com/apis/common/v3/sports'

function normalizePlayer(a) {
  return {
    id: a.id,
    name: a.fullName ?? a.displayName,
    jersey: a.jersey ?? '',
    position: a.position?.abbreviation ?? '',
    positionName: a.position?.displayName ?? a.position?.name ?? '',
    headshot: a.headshot?.href ?? null,
    height: a.displayHeight ?? '',
    weight: a.displayWeight ?? '',
    year: a.experience?.displayValue ?? '',
    hometown: a.birthPlace?.displayText ?? [a.birthPlace?.city, a.birthPlace?.state].filter(Boolean).join(', '),
  }
}

const GROUP_LABEL = { offense: 'Offense', defense: 'Defense', specialTeam: 'Special Teams', specialteam: 'Special Teams' }

/** Returns [{ label, players }] — football groups by unit, other sports are one list. */
export async function fetchRoster(sport, teamId) {
  const raw = await getJSON(`${SITE}/${sport.path}/teams/${teamId}/roster`)
  const athletes = raw.athletes ?? []
  const groups = athletes.some((a) => Array.isArray(a.items))
    ? athletes.map((g) => ({
        label: GROUP_LABEL[g.position] ?? g.position ?? 'Players',
        players: (g.items ?? []).map(normalizePlayer),
      }))
    : [{ label: 'Players', players: athletes.map(normalizePlayer) }]
  const coach = raw.coach?.[0]
  return {
    groups: groups.filter((g) => g.players.length),
    coach: coach ? [coach.firstName, coach.lastName].filter(Boolean).join(' ') : '',
  }
}

function normalizeStatsTable(s) {
  // overview.statistics: { labels, displayNames, splits: [{ displayName, stats: [...] }] }
  if (!s?.labels?.length || !s.splits?.length) return null
  return {
    labels: s.labels,
    names: s.displayNames ?? s.labels,
    rows: s.splits.map((r) => ({ label: r.displayName, values: r.stats ?? [] })),
  }
}

export async function fetchAthlete(sport, id) {
  const base = `${WEB}/${sport.path}/athletes/${id}`
  const [info, overview] = await Promise.allSettled([getJSON(base), getJSON(`${base}/overview`)])
  if (info.status === 'rejected') throw info.reason
  const a = info.value.athlete ?? {}
  const ov = overview.status === 'fulfilled' ? overview.value : {}
  return {
    id: a.id ?? id,
    name: a.displayName ?? a.fullName,
    jersey: a.displayJersey ?? (a.jersey ? `#${a.jersey}` : ''),
    position: a.position?.displayName ?? '',
    headshot: a.headshot?.href ?? null,
    height: a.displayHeight ?? '',
    weight: a.displayWeight ?? '',
    year: a.displayExperience ?? '',
    hometown: a.displayBirthPlace ?? '',
    team: a.team?.displayName ?? '',
    status: a.status?.name && a.status.name !== 'Active' ? a.status.name : '',
    link: a.links?.find((l) => l.rel?.includes('playercard'))?.href ?? a.links?.[0]?.href ?? null,
    summary: a.statsSummary?.statistics?.length
      ? {
          title: a.statsSummary.displayName ?? 'Season stats',
          stats: a.statsSummary.statistics.map((s) => ({
            name: s.shortDisplayName ?? s.abbreviation ?? s.displayName,
            full: s.displayName,
            value: s.displayValue,
            rank: s.rankDisplayValue ?? '',
          })),
        }
      : null,
    table: normalizeStatsTable(ov.statistics),
    news: (ov.news ?? []).slice(0, 5).map((n) => ({
      headline: n.headline,
      link: n.links?.web?.href ?? null,
      date: n.published ?? n.lastModified ?? null,
    })),
  }
}

/** Official athletics site: ESPN doesn't publish it, so jump to the top search result. */
export function schoolSiteUrl(teamName) {
  return `https://duckduckgo.com/?q=${encodeURIComponent(`\\${teamName} official athletics website`)}`
}

// ---------- fun facts & coaches ----------

const https = (url) => url?.replace(/^http:/, 'https:')

let draftPromise = null
/** NFL draft picks by college, built into the site at deploy time. */
export function fetchDraft() {
  draftPromise ??= fetch('./data/draft.json')
    .then((r) => (r.ok ? r.json() : { byCollege: {} }))
    .catch(() => ({ byCollege: {} }))
  return draftPromise
}

export async function draftPicksFor(team) {
  const { byCollege } = await fetchDraft()
  return (byCollege[`${team.location}|${team.nickname}`] ?? []).map(([year, round, overall, name, pos, nfl]) => ({
    year,
    round,
    overall,
    name,
    pos,
    nfl,
  }))
}

/** Wikipedia page summary (CORS-enabled REST API), or null. */
export async function fetchWiki(title) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replaceAll(' ', '_'))}`)
    if (!res.ok) return null
    const w = await res.json()
    if (w.type === 'disambiguation') return null
    return {
      title: w.title,
      description: w.description ?? '',
      extract: w.extract ?? '',
      image: w.originalimage?.source ?? w.thumbnail?.source ?? null,
      thumb: w.thumbnail?.source ?? null,
      link: w.content_urls?.desktop?.page ?? null,
    }
  } catch {
    return null
  }
}

const PROGRAM_SUFFIX = { cfb: 'football', mbb: "men's basketball", wbb: "women's basketball", bsb: 'baseball', sb: 'softball' }
export const programWikiTitle = (sport, teamName) => `${teamName} ${PROGRAM_SUFFIX[sport.id]}`

const CORE_SPORTS = 'https://sports.core.api.espn.com/v2/sports'

/** Head coach from ESPN's core API (the only coach ESPN publishes), plus a Wikipedia bio. */
export async function fetchHeadCoach(sport, teamId, seasonYear) {
  const [sp, league] = sport.path.split('/')
  const year = seasonYear ?? new Date().getFullYear()
  const list = await getJSON(`${CORE_SPORTS}/${sp}/leagues/${league}/seasons/${year}/teams/${teamId}/coaches`)
  const ref = list.items?.[0]?.$ref
  if (!ref) return null
  const coach = await getJSON(https(ref))
  const person = coach.person?.$ref ? await getJSON(https(coach.person.$ref)).catch(() => coach) : coach
  const career = person.careerRecords?.[0]?.$ref
    ? await getJSON(https(person.careerRecords[0].$ref)).catch(() => null)
    : null
  const seasonRecord = coach.records?.[0]?.record?.$ref
    ? await getJSON(https(coach.records[0].record.$ref)).catch(() => null)
    : null
  const name = [person.firstName ?? coach.firstName, person.lastName ?? coach.lastName].filter(Boolean).join(' ')
  const wiki = await fetchWiki(name)
  return {
    name,
    seasons: person.coachSeasons?.length ?? null,
    career: career?.summary ?? career?.displayValue ?? null,
    season: seasonRecord?.summary ?? seasonRecord?.displayValue ?? null,
    // Only trust the Wikipedia page if it's about a coach.
    wiki: wiki && /coach/i.test(`${wiki.description} ${wiki.extract}`) ? wiki : null,
  }
}

/** Winner was ranked lower than (or unranked against) the team it beat. */
export function isUpset(g) {
  if (g.state !== 'post' || !g.home || !g.away) return false
  const winner = g.home.winner ? g.home : g.away.winner ? g.away : null
  if (!winner) return false
  const loser = winner === g.home ? g.away : g.home
  return !!loser.rank && (winner.rank ?? 99) > loser.rank
}

// ---------- close-game alerts ----------

// When a live game counts as "close and late", per sport.
const CLOSE = {
  cfb: { margin: 8, late: (g) => g.period >= 4 }, // 4th quarter or OT, one score
  mbb: { margin: 6, late: (g) => g.period > 2 || (g.period === 2 && g.clock != null && g.clock <= 300) }, // last 5 min of 2nd half or OT
  wbb: { margin: 6, late: (g) => g.period >= 4 }, // 4th quarter or OT
  bsb: { margin: 2, late: (g) => g.period >= 8 }, // 8th inning on
  sb: { margin: 2, late: (g) => g.period >= 6 }, // 6th inning on (7-inning games)
}

export function isCloseGame(g) {
  const rule = CLOSE[g.sport]
  if (!rule || g.state !== 'in' || !g.home || !g.away) return false
  const a = Number(g.home.score)
  const b = Number(g.away.score)
  if (Number.isNaN(a) || Number.isNaN(b)) return false
  return Math.abs(a - b) <= rule.margin && rule.late(g)
}

// ---------- game detail ----------

const signed = (n) => (n == null || Number.isNaN(Number(n)) ? '' : Number(n) > 0 ? `+${Number(n)}` : String(Number(n)))
const ordinal = (n) => `${n}${[, 'st', 'nd', 'rd'][(n % 100 >> 3) ^ 1 && n % 10] || 'th'}`
const isBaseball = (sport) => sport.path.startsWith('baseball/')

/** "Q3", "H2", "2OT", "Top 7th": how each sport names a period. */
export function periodLabel(sport, n, half) {
  if (!n) return ''
  if (isBaseball(sport)) return half ? `${half === 'Top' ? 'Top' : 'Bot'} ${ordinal(n)}` : ordinal(n)
  const regulation = sport.id === 'mbb' ? 2 : 4
  if (n <= regulation) return `${regulation === 2 ? 'H' : 'Q'}${n}`
  return n === regulation + 1 ? 'OT' : `${n - regulation}OT`
}

function normalizeLeader(l) {
  const a = l?.athlete
  if (!a) return null
  return {
    id: a.id,
    name: a.shortName ?? a.displayName,
    fullName: a.displayName,
    position: a.position?.abbreviation ?? '',
    jersey: a.jersey ?? '',
    headshot: a.headshot?.href ?? null,
    line: l.displayValue ?? '',
    value: l.value ?? null,
  }
}

function normalizeGameTeam(c) {
  const t = c.team ?? {}
  return {
    id: t.id,
    name: t.shortDisplayName ?? t.location ?? t.displayName,
    fullName: t.displayName,
    abbr: t.abbreviation,
    logo: teamLogo(t),
    color: t.color ? `#${t.color}` : null,
    score: c.score ?? '',
    rank: c.rank && c.rank <= 25 ? c.rank : null,
    winner: !!c.winner,
    record: c.record?.find((r) => r.type === 'total')?.displayValue ?? c.record?.[0]?.displayValue ?? '',
    homeAway: c.homeAway,
    lines: (c.linescores ?? []).map((l) => l.displayValue ?? ''),
    hits: (c.linescores ?? []).reduce((n, l) => n + (l.hits ?? 0), 0),
    errors: (c.linescores ?? []).reduce((n, l) => n + (l.errors ?? 0), 0),
  }
}

// Box score tables come back unnamed for basketball and baseball.
const BOX_TITLES = { baseball: ['Batting', 'Pitching'], basketball: ['Players'] }

/** Everything ESPN's game summary has: leaders, scoring, plays, odds, team stats and box score. */
export async function fetchGame(sport, id, fetchOpts) {
  const raw = await getJSON(`${SITE}/${sport.path}/summary?event=${id}`, fetchOpts)
  const comp = raw.header?.competitions?.[0] ?? {}
  const type = comp.status?.type ?? {}
  const competitors = (comp.competitors ?? []).map(normalizeGameTeam)
  const home = competitors.find((c) => c.homeAway === 'home') ?? competitors[0]
  const away = competitors.find((c) => c.homeAway === 'away') ?? competitors[1]
  const byId = Object.fromEntries(competitors.map((c) => [c.id, c]))
  const baseball = isBaseball(sport)

  // Leaders: one row per category with the away and home leader side by side.
  const leaderRows = []
  for (const side of raw.leaders ?? []) {
    const who = byId[side.team?.id]?.homeAway
    if (!who) continue
    for (const cat of side.leaders ?? []) {
      let row = leaderRows.find((r) => r.name === cat.name)
      if (!row) leaderRows.push((row = { name: cat.name, label: cat.displayName, away: null, home: null }))
      row[who] = normalizeLeader(cat.leaders?.[0])
    }
  }

  // Basketball and baseball send a flat play-by-play list instead of drives.
  const flatPlays = (raw.plays ?? [])
    .filter((p) => p.text)
    .map((p) => ({
      id: p.id,
      text: p.text,
      period: p.period?.number,
      half: p.period?.type,
      clock: p.clock?.displayValue ?? '',
      scoring: !!p.scoringPlay,
      team: byId[p.team?.id] ?? null,
      away: p.awayScore,
      home: p.homeScore,
    }))

  const scoring = raw.scoringPlays?.length
    ? raw.scoringPlays.map((p) => ({
        id: p.id,
        type: p.type?.text ?? '',
        team: byId[p.team?.id] ?? null,
        text: p.text,
        period: p.period?.number,
        clock: p.clock?.displayValue ?? '',
        away: p.awayScore,
        home: p.homeScore,
      }))
    : baseball
      ? flatPlays.filter((p) => p.scoring).map((p) => ({ ...p, type: 'Run scores', clock: '' }))
      : []

  const allDrives = [...(raw.drives?.previous ?? []), ...(raw.drives?.current ? [raw.drives.current] : [])]
  const drives = allDrives
    .map((d) => ({
      id: d.id,
      team: byId[d.team?.id] ?? null,
      description: d.description ?? '',
      result: d.displayResult ?? d.result ?? '',
      live: d === raw.drives?.current,
      plays: (d.plays ?? []).map((p) => ({
        id: p.id,
        text: p.text,
        period: p.period?.number,
        clock: p.clock?.displayValue ?? '',
        down: p.start?.shortDownDistanceText ?? '',
        scoring: !!p.scoringPlay,
      })),
    }))
    .reverse()

  // Play-by-play grouped by period (newest first) for sports without drives.
  const periods = []
  for (const p of flatPlays) {
    const key = baseball ? `${p.half}-${p.period}` : p.period
    let group = periods.find((g) => g.key === key)
    if (!group) periods.push((group = { key, label: periodLabel(sport, p.period, baseball ? p.half : null), plays: [] }))
    group.plays.push(p)
  }
  periods.reverse()

  // Current down & distance, from the most recent play of the live drive.
  const last = raw.drives?.current?.plays?.at(-1)
  const situation = type.state === 'in' ? (last?.end?.downDistanceText ?? last?.start?.downDistanceText ?? '') : ''
  const possession = type.state === 'in' ? (last?.start?.team?.id ?? raw.drives?.current?.team?.id ?? null) : null

  const pick = raw.pickcenter?.[0]
  const odds = pick
    ? {
        provider: pick.provider?.name ?? '',
        details: pick.details ?? '',
        total: pick.overUnder ?? null,
        away: { spread: signed(pick.spread != null ? -pick.spread : null), moneyLine: signed(pick.awayTeamOdds?.moneyLine) },
        home: { spread: signed(pick.spread), moneyLine: signed(pick.homeTeamOdds?.moneyLine) },
      }
    : null

  const stats = (() => {
    const [a, h] = ['away', 'home'].map((side) => raw.boxscore?.teams?.find((t) => t.homeAway === side)?.statistics ?? [])
    const seen = new Set()
    return (a.length ? a : h)
      .map((s, i) => ({ label: s.label, away: a[i]?.displayValue ?? '', home: h[i]?.displayValue ?? '' }))
      .filter((r) => r.label && !seen.has(r.label) && seen.add(r.label))
  })()
  if (baseball && !stats.length && away?.lines.length) {
    stats.push(
      { label: 'Runs', away: away.score, home: home.score },
      { label: 'Hits', away: String(away.hits), home: String(home.hits) },
      { label: 'Errors', away: String(away.errors), home: String(home.errors) },
    )
  }

  const titles = BOX_TITLES[sport.path.split('/')[0]] ?? []
  const players = Object.fromEntries(
    (raw.boxscore?.players ?? []).map((p) => [
      byId[p.team?.id]?.homeAway ?? p.team?.id,
      (p.statistics ?? []).map((c, i) => ({
        name: c.name ?? `table-${i}`,
        title: (c.text ?? titles[i] ?? c.name ?? 'Players').replace(new RegExp(`^${p.team?.displayName ?? '\\0'} `), ''),
        labels: c.labels ?? [],
        rows: (c.athletes ?? []).map((r) => ({
          id: r.athlete?.id,
          name: r.athlete?.displayName,
          jersey: r.athlete?.jersey ?? '',
          position: r.athlete?.position?.abbreviation ?? '',
          starter: !!r.starter,
          dnp: !!r.didNotPlay,
          stats: r.stats ?? [],
        })),
        totals: c.totals ?? [],
      })),
    ]),
  )

  const info = raw.gameInfo ?? {}
  const periodCount = Math.max(away?.lines.length ?? 0, home?.lines.length ?? 0)
  return {
    id,
    sport: sport.id,
    state: type.state ?? 'pre',
    detail: type.shortDetail ?? type.detail ?? '',
    date: comp.date ?? null,
    home,
    away,
    situation,
    possession,
    linescore: periodCount
      ? {
          labels: Array.from({ length: periodCount }, (_, i) =>
            baseball ? String(i + 1) : periodLabel(sport, i + 1).replace(/^[QH]/, ''),
          ),
          baseball,
        }
      : null,
    leaders: leaderRows,
    scoring,
    drives,
    periods,
    odds,
    stats,
    players,
    venue: info.venue?.fullName ?? '',
    city: [info.venue?.address?.city, info.venue?.address?.state].filter(Boolean).join(', '),
    weather: info.weather
      ? [info.weather.temperature != null && `${info.weather.temperature}°`, info.weather.conditionId].filter(Boolean).join(' · ')
      : '',
    attendance: info.attendance || null,
    broadcast: (comp.broadcasts ?? []).flatMap((b) => b.media?.shortName ?? b.station ?? []).join(', '),
    link: raw.header?.links?.find((l) => l.rel?.includes('summary'))?.href ?? null,
  }
}

// ---------- league leaders ----------

const LEADERS = 'https://site.web.api.espn.com/apis/site/v3/sports'

// Which ESPN leader categories to show, grouped into sections, per sport.
export const LEADER_SECTIONS = {
  cfb: [
    { title: 'Quarterbacks', icon: '🎯', cats: ['passingYards', 'passingTouchdowns', 'quarterbackRating'] },
    { title: 'Running backs', icon: '💨', cats: ['rushingYards', 'rushingTouchdowns'] },
    { title: 'Wide receivers', icon: '🙌', cats: ['receivingYards', 'receptions', 'receivingTouchdowns'] },
    { title: 'Defense', icon: '🛡️', cats: ['totalTackles', 'sacks', 'interceptions', 'interceptionYards'] },
    { title: 'Kickers', icon: '🦵', cats: ['kickoffYards'] },
  ],
  basketball: [
    { title: 'Scoring', icon: '🔥', cats: ['pointsPerGame', 'points', '3PointsMadePerGame'] },
    { title: 'Rebounding & playmaking', icon: '🧠', cats: ['reboundsPerGame', 'assistsPerGame', 'doubleDouble'] },
    { title: 'Defense', icon: '🛡️', cats: ['stealsPerGame', 'blocksPerGame'] },
    { title: 'Shooting', icon: '🎯', cats: ['fieldGoalPercentage', '3PointPct', 'FreeThrowPct'] },
    { title: 'Iron men', icon: '⏱️', cats: ['minutesPerGame'] },
  ],
}

const PCT_CATS = new Set(['3PointPct', 'FreeThrowPct'])
const LEADER_LABELS = { quarterbackRating: 'Passer Rating', kickoffYards: 'Kickoff Yards', doubleDouble: 'Double-Doubles' }

function leaderValue(cat, l) {
  if (PCT_CATS.has(cat) && l.value != null) return `${(l.value * 100).toFixed(1)}%`
  if (cat === 'fieldGoalPercentage') return `${l.displayValue}%`
  const v = l.displayValue ?? ''
  return /^\d{4,}$/.test(v) ? Number(v).toLocaleString() : v
}

/** The season ESPN's leaders feed is on now: next year's label once a fall/winter season starts. */
function leaderSeason(sport) {
  const d = new Date()
  // Basketball seasons are labeled by the year they end in.
  return sport.path.startsWith('basketball/') && d.getMonth() >= 9 ? d.getFullYear() + 1 : d.getFullYear()
}

/**
 * Top-10 leaderboards per stat. group = an ESPN division or conference id
 * (football only; basketball's feed is all of D1). Falls back to last season
 * when the new one hasn't started.
 */
export async function fetchLeaders(sport, group) {
  const sections = LEADER_SECTIONS[sport.byWeek ? 'cfb' : sport.path.startsWith('basketball/') ? 'basketball' : '']
  if (!sections) return null
  let season = leaderSeason(sport)
  const q = (s) => `${LEADERS}/${sport.path}/leaders?season=${s}${sport.byWeek && group ? `&group=${group}` : ''}`
  let raw
  try {
    raw = await getJSON(q(season))
    if (!raw.leaders?.categories?.some((c) => c.leaders?.length)) throw new Error('empty')
  } catch {
    season -= 1
    raw = await getJSON(q(season))
  }
  const cats = Object.fromEntries(
    (raw.leaders?.categories ?? []).map((c) => [
      c.name,
      {
        name: c.name,
        label: LEADER_LABELS[c.name] ?? c.displayName,
        abbr: c.abbreviation ?? '',
        leaders: (c.leaders ?? []).map((l, i) => ({
          rank: i + 1,
          id: l.athlete?.id,
          name: l.athlete?.displayName ?? '',
          jersey: l.athlete?.jersey ?? '',
          position: l.athlete?.position?.abbreviation ?? '',
          headshot: l.athlete?.headshot?.href ?? null,
          value: leaderValue(c.name, l),
          team: l.team
            ? {
                id: l.team.id,
                name: l.team.shortDisplayName ?? l.team.nickname ?? l.team.displayName,
                abbr: l.team.abbreviation,
                logo: teamLogo(l.team),
                color: l.team.color ? `#${l.team.color}` : null,
              }
            : null,
        })),
      },
    ]),
  )
  return {
    season,
    label: sport.path.startsWith('basketball/') ? `${season - 1}–${String(season).slice(2)}` : String(season),
    sections: sections
      .map((s) => ({ ...s, cats: s.cats.map((c) => cats[c]).filter((c) => c?.leaders.length) }))
      .filter((s) => s.cats.length),
  }
}

/** Season stat line for a leader's hero card (from the athlete feed). */
export async function fetchStatLine(sport, id) {
  const raw = await getJSON(`${WEB}/${sport.path}/athletes/${id}`)
  return (raw.athlete?.statsSummary?.statistics ?? []).map((s) => ({
    name: s.shortDisplayName ?? s.abbreviation ?? s.displayName,
    full: s.displayName,
    value: s.displayValue,
    rank: s.rankDisplayValue ?? '',
  }))
}
