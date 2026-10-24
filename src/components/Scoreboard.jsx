import { useMemo, useState } from 'react'
import { fetchScoreboard, fromKey, shiftKey, todayKey } from '../api.js'
import { buildHash, useData, useFavorites } from '../hooks.js'
import GameCard from './GameCard.jsx'
import { ErrorBox, Loading, Updated } from './Status.jsx'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'top25', label: 'Top 25' },
  { id: 'mine', label: 'My Teams' },
  { id: 'live', label: 'Live' },
]

const hasLive = (d) => d.events.some((e) => e.state === 'in')

function dayLabel(key) {
  const today = todayKey()
  if (key === today) return 'Today'
  if (key === shiftKey(today, -1)) return 'Yesterday'
  if (key === shiftKey(today, 1)) return 'Tomorrow'
  return fromKey(key).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function Scoreboard({ sport, params }) {
  const date = params.date ?? todayKey()
  // Sports with a league picker use ?g=<group>; 'top25' is FBS filtered to ranked teams.
  const league = sport.leagues ? (params.g ?? 'top25') : null
  const top25Only = league === 'top25'
  const division = league ? (top25Only ? '80' : league) : (params.div ?? sport.divisions[0]?.id)
  const { week, st } = params
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const { isFav, list: favList } = useFavorites()

  const { data, error, loading, updated, polling, refresh } = useData(
    (o) =>
      fetchScoreboard(
        sport,
        sport.byWeek ? { week, seasonType: st, division } : { date, division },
        o,
      ),
    [sport.id, date, week, st, division],
    { shouldPoll: hasLive },
  )

  const go = (next) => {
    window.location.hash = buildHash(sport.id, 'scores', { ...params, ...next })
  }

  const games = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    return data.events.filter((g) => {
      const teams = [g.home, g.away].filter(Boolean)
      if ((top25Only || filter === 'top25') && !teams.some((t) => t.rank)) return false
      if (filter === 'mine' && !teams.some((t) => isFav(sport.id, t.id))) return false
      if (filter === 'live' && g.state !== 'in') return false
      if (q && !teams.some((t) => `${t.name} ${t.fullName} ${t.abbr}`.toLowerCase().includes(q)))
        return false
      return true
    })
    // favList is read so the list re-filters when a team is followed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filter, query, favList.length, sport.id, top25Only])

  const sections = [
    { id: 'in', title: 'Live', games: games.filter((g) => g.state === 'in') },
    { id: 'pre', title: 'Upcoming', games: games.filter((g) => g.state === 'pre') },
    { id: 'post', title: 'Final', games: games.filter((g) => g.state === 'post') },
  ]

  const currentWeek = data?.calendar.find(
    (w) => String(w.week) === String(week ?? data?.week) && String(w.seasonType) === String(st ?? data?.seasonType),
  )

  const filterSeg = (
    <div className="seg small">
      {FILTERS.filter((f) => !(sport.leagues && f.id === 'top25')).map((f) => (
        <button key={f.id} className={f.id === filter ? 'on' : ''} onClick={() => setFilter(f.id)}>
          {f.label}
        </button>
      ))}
    </div>
  )

  const searchBox = (
    <input
      className="search"
      type="search"
      placeholder="Find a team"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )

  return (
    <section>
      <div className="toolbar">
        {!sport.leagues && sport.divisions.length > 1 && (
          <div className="seg">
            {sport.divisions.map((d) => (
              <button
                key={d.id}
                className={d.id === division ? 'on' : ''}
                onClick={() => go({ div: d.id, week: null, st: null })}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}

        {sport.byWeek ? (
          <div className="date-nav">
            <select
              aria-label="Week"
              value={currentWeek ? `${currentWeek.seasonType}:${currentWeek.week}` : ''}
              onChange={(e) => {
                const [s, w] = e.target.value.split(':')
                go({ st: s, week: w })
              }}
            >
              {!currentWeek && <option value="">Current week</option>}
              {data?.calendar.map((w) => (
                <option key={`${w.seasonType}:${w.week}`} value={`${w.seasonType}:${w.week}`}>
                  {w.seasonType !== '2' && w.group ? `${w.group}: ` : ''}
                  {w.label}
                  {w.detail ? ` (${w.detail})` : ''}
                </option>
              ))}
            </select>
            {(week || st) && (
              <button className="btn ghost" onClick={() => go({ week: null, st: null })}>
                This week
              </button>
            )}
          </div>
        ) : (
          <div className="date-nav">
            <button className="btn ghost" onClick={() => go({ date: shiftKey(date, -1) })} aria-label="Previous day">
              ‹
            </button>
            <label className="date-label">
              {dayLabel(date)}
              <input
                type="date"
                value={`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`}
                onChange={(e) => e.target.value && go({ date: e.target.value.replaceAll('-', '') })}
              />
            </label>
            <button className="btn ghost" onClick={() => go({ date: shiftKey(date, 1) })} aria-label="Next day">
              ›
            </button>
            {date !== todayKey() && (
              <button className="btn ghost" onClick={() => go({ date: null })}>
                Today
              </button>
            )}
          </div>
        )}
      </div>

      {sport.leagues ? (
        <div className="toolbar league-bar">
          <div className="seg">
            {sport.quickLeagues.map((id) => (
              <button key={id} className={id === league ? 'on' : ''} onClick={() => go({ g: id, week: null, st: null })}>
                {sport.leagues.find((l) => l.id === id).label}
              </button>
            ))}
          </div>
          <select aria-label="League" value={league} onChange={(e) => go({ g: e.target.value, week: null, st: null })}>
            {[...new Set(sport.leagues.map((l) => l.section))].map((section) => {
              const items = sport.leagues.filter((l) => l.section === section)
              return section ? (
                <optgroup key={section} label={section}>
                  {items.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.label}
                    </option>
                  ))}
                </optgroup>
              ) : (
                items.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))
              )
            })}
          </select>
          {searchBox}
        </div>
      ) : (
        <div className="toolbar">
          {filterSeg}
          {searchBox}
        </div>
      )}

      <div className="status-bar">
        <Updated updated={updated} polling={polling} onRefresh={refresh} />
        {sport.leagues && filterSeg}
      </div>

      {loading && <Loading label="Loading games…" />}
      {error && !data && <ErrorBox error={error} onRetry={refresh} />}

      {data && !data.events.length && (
        <div className="state">
          <p>No {sport.name.toLowerCase()} games {sport.byWeek ? 'this week' : `on ${dayLabel(date).toLowerCase()}`}.</p>
          {data.seasonStart && new Date(data.seasonStart) > new Date() && (
            <p className="muted">
              Season starts {new Date(data.seasonStart).toLocaleDateString([], { month: 'long', day: 'numeric' })}.
            </p>
          )}
        </div>
      )}

      {data && data.events.length > 0 && !games.length && (
        <div className="state">
          <p>No games match{filter === 'mine' ? '. Tap ☆ next to a team to follow it.' : '.'}</p>
        </div>
      )}

      {sections.map(
        (s) =>
          s.games.length > 0 && (
            <div key={s.id} className="game-section">
              <h3>
                {s.title} <span className="count">{s.games.length}</span>
              </h3>
              <div className="grid">
                {s.games.map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
            </div>
          ),
      )}
    </section>
  )
}
