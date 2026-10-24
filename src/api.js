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

export const sportById = (id) => SPORTS.find((s) => s.id === id)

const DIVISION_IDS = new Set(['80', '81', '35', '36', '50', 'all'])
const SECTION_DIVISION = { FBS: '80', FCS: '81', 'Division I': '50' }

/**
 * Resolve a league picker id ('top25', a division or a conference) into
 * { id, label, section, division, conference, top25 }. division is the ESPN
 * group to query (undefined = the sport's default feed).
 */
export function leagueInfo(sport, id) {
  const l = sport.leagues?.find((x) => x.id === id) ?? sport.leagues?.[0]
  if (!l) return null
  const top25 = l.id === 'top25'
  const isDivision = top25 || DIVISION_IDS.has(l.id)
  let division = top25 ? sport.divisions[0]?.id : isDivision ? l.id : SECTION_DIVISION[l.section]
  if (sport.confFrom || division === 'all') division = undefined
  return { ...l, top25, division, conference: isDivision ? null : l.id }
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
    nickname: t.name,
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
