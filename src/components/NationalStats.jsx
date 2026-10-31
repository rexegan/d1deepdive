import { useEffect, useMemo, useState } from 'react'
import { conferenceMembers, fetchPlayerStats, fetchTeamStats, leagueInfo } from '../api.js'
import { statTabs } from '../data/nationalStats.js'
import { buildHash, useData, useFavorites } from '../hooks.js'
import { Headshot, PlayerView } from './Roster.jsx'
import TeamLogo from './TeamLogo.jsx'
import TeamName from './TeamName.jsx'
import { ErrorBox, Loading } from './Status.jsx'

// Football can be narrowed to a division or conference (ESPN group ids).
// ESPN's stat feeds cover FBS only and ignore conference filters, so
// conferences are filtered here by standings membership.
const QUICK = ['80', '8', '5', '4', '1', '9']
const QUICK_LABEL = { 80: 'All FBS' }
const PAGE = 50

function groupOptions(sport) {
  return (sport.leagues ?? []).filter((l) => l.section === 'FBS')
}

/** Rank rows by a column (ties share a rank), best first. */
function rankRows(rows, col) {
  const val = (r) => r.stats[col.k]?.v
  const dir = col.low ? 1 : -1
  const sorted = rows.filter((r) => val(r) != null).sort((a, b) => dir * (val(a) - val(b)))
  let rank = 0
  return sorted.map((r, i) => {
    if (i === 0 || val(r) !== val(sorted[i - 1])) rank = i + 1
    return { ...r, rank }
  })
}

// Basketball qualification: enough games (75% of the most anyone played)
// and, for percentages, the column's per-game minimum.
function qualifies(rows, col) {
  const maxGp = Math.max(0, ...rows.map((r) => r.stats['general.gamesPlayed']?.v ?? 0))
  return rows.filter((r) => {
    if ((r.stats['general.gamesPlayed']?.v ?? 0) < maxGp * 0.75) return false
    if (col.min && (r.stats[col.min[0]]?.v ?? 0) < col.min[1]) return false
    return true
  })
}

function StatTable({ sport, rows, cols, sortCol, onSort, kind, onPlayer }) {
  const { isFav } = useFavorites()
  const [shown, setShown] = useState(PAGE)
  useEffect(() => setShown(PAGE), [rows])
  const max = Math.max(...rows.map((r) => Math.abs(r.stats[sortCol.k]?.v ?? 0)), 1)

  if (!rows.length) return <div className="state">No numbers yet for this category.</div>

  return (
    <>
      <div className="ns-table-wrap">
        <table className="ns-table">
          <thead>
            <tr>
              <th className="ns-rk">RK</th>
              <th className="left ns-who">{kind === 'players' ? 'Player' : 'Team'}</th>
              {cols.map((c) => (
                <th key={c.k} className={c.k === sortCol.k ? 'on' : ''} title={c.t}>
                  {c.noSort ? (
                    c.l
                  ) : (
                    <button onClick={() => onSort(c)} aria-label={`Sort by ${c.t}`}>
                      {c.l}
                      {c.k === sortCol.k && <span className="ns-arrow">{c.low ? '▲' : '▼'}</span>}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, shown).map((r) => {
              const team = r.team
              const fav = team?.id && isFav(sport.id, team.id)
              return (
                <tr key={kind === 'players' ? r.id : r.team.id} className={fav ? 'fav' : ''}>
                  <td className="ns-rk">
                    <span className={r.rank <= 3 ? `ns-medal m${r.rank}` : ''}>{r.rank}</span>
                  </td>
                  <td className="left ns-who">
                    {kind === 'players' ? (
                      <span className="ns-player">
                        <button
                          className="ns-photo"
                          onClick={() => onPlayer(r)}
                          aria-label={`${r.name} profile`}
                          title="Player profile"
                        >
                          <Headshot src={r.headshot} name={r.name} size={32} />
                        </button>
                        <span className="ns-names">
                          <button className="ns-pname" onClick={() => onPlayer(r)}>
                            {r.name}
                          </button>
                          <span className="ns-sub muted">
                            <TeamLogo src={team?.logo} size={14} sport={sport.id} team={team} />
                            <TeamName sport={sport.id} team={team}>
                              {team?.abbr ?? team?.name}
                            </TeamName>
                            {r.position && <span>· {r.position}</span>}
                          </span>
                        </span>
                      </span>
                    ) : (
                      <span className="ns-player">
                        <TeamLogo src={team.logo} size={26} sport={sport.id} team={team} />
                        <TeamName sport={sport.id} team={team} className="ns-tname">
                          {team.name}
                        </TeamName>
                      </span>
                    )}
                  </td>
                  {cols.map((c) => {
                    const s = r.stats[c.k]
                    const on = c.k === sortCol.k
                    return (
                      <td key={c.k} className={on ? 'on' : ''}>
                        {on && s?.v != null && !c.low && (
                          <span className="ns-bar" style={{ width: `${Math.max(4, (Math.abs(s.v) / max) * 100)}%` }} />
                        )}
                        <span className="ns-val">{s?.d ?? '–'}</span>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {rows.length > shown && (
        <button className="ns-more" onClick={() => setShown((n) => n + PAGE)}>
          Show more ({rows.length - shown} left)
        </button>
      )}
    </>
  )
}

// Team ids in the picked football conference (null = all of FBS).
async function membersOf(sport, group) {
  const league = sport.byWeek ? leagueInfo(sport, group) : null
  return league?.conference ? conferenceMembers(sport, league) : null
}

function PlayerStats({ sport, tab, sortCol, group, onSort, onPlayer }) {
  const basketball = !sport.byWeek
  // A tab with a pool is fetched once by its pool stat and ranked here.
  const fetchSort = basketball
    ? (sortCol.fetch ?? sortCol.k)
    : tab.pool
      ? tab.pool.sort
      : (sortCol.sk ?? sortCol.k)
  const { data, error, loading, refresh } = useData(
    async () => {
      const [stats, members] = await Promise.all([
        fetchPlayerStats(sport, {
          sort: fetchSort,
          category: tab.category,
          // A conference is filtered from the national list, so pull a deeper one.
          limit: basketball ? 400 : (tab.pool?.limit ?? (group === '80' ? 250 : 600)),
        }),
        membersOf(sport, group),
      ])
      return { ...stats, rows: members ? stats.rows.filter((r) => members.has(String(r.team?.id))) : stats.rows }
    },
    [sport.id, fetchSort, tab.category, group],
  )
  const rows = useMemo(() => {
    if (!data) return []
    return rankRows(basketball ? qualifies(data.rows, sortCol) : data.rows, sortCol)
  }, [data, sortCol, basketball])

  if (loading) return <Loading label="Loading national stats…" />
  if (error) return <ErrorBox error={error} onRetry={refresh} />
  return (
    <>
      <p className="muted tiny ns-note">
        {data.label} season · {rows.length.toLocaleString()} qualified players ·{' '}
        {basketball ? 'Division I' : (groupOptions(sport).find((o) => o.id === group)?.label ?? '')}
      </p>
      <StatTable sport={sport} rows={rows} cols={tab.cols} sortCol={sortCol} onSort={onSort} kind="players" onPlayer={onPlayer} />
    </>
  )
}

function TeamStats({ sport, tab, sortCol, group, onSort }) {
  const league = sport.byWeek ? leagueInfo(sport, group) : null
  const { data, error, loading, refresh } = useData(
    async () => {
      const [stats, members] = await Promise.all([fetchTeamStats(sport), membersOf(sport, group)])
      return { ...stats, rows: members ? stats.rows.filter((r) => members.has(String(r.team.id))) : stats.rows }
    },
    [sport.id, group],
  )
  const rows = useMemo(() => (data ? rankRows(data.rows, sortCol) : []), [data, sortCol])

  if (loading) return <Loading label="Loading team stats…" />
  if (error) return <ErrorBox error={error} onRetry={refresh} />
  return (
    <>
      <p className="muted tiny ns-note">
        {data.label} season · {rows.length} teams · {sport.byWeek ? league?.label : 'Division I'}
      </p>
      <StatTable sport={sport} rows={rows} cols={tab.cols} sortCol={sortCol} onSort={onSort} kind="teams" />
    </>
  )
}

export default function NationalStats({ sport, params }) {
  const tabs = statTabs(sport)
  const football = !!sport.byWeek
  const options = football ? groupOptions(sport) : []
  const group = football ? (options.some((o) => o.id === params.g) ? params.g : '80') : undefined
  const kind = params.m === 'teams' ? 'teams' : 'players'
  const list = tabs?.[kind] ?? []
  const tab = list.find((t) => t.id === params.c) ?? list[0]
  const sortCol = tab?.cols.find((c) => c.k === params.s && !c.noSort) ?? tab?.cols.find((c) => c.k === tab.sort)
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    if (!player) return
    const onKey = (e) => e.key === 'Escape' && setPlayer(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [player])

  // Keep the scroll position when only the table changes.
  const go = (next) => {
    const y = window.scrollY
    // Runs after the router's own hashchange handler, which scrolls to the top.
    window.addEventListener('hashchange', () => window.scrollTo(0, y), { once: true })
    window.location.hash = buildHash(sport.id, 'stats', { ...params, ...next })
  }

  if (!tabs)
    return (
      <div className="state">
        ESPN doesn't publish national stats for college {sport.name.toLowerCase()}. Box scores and player stats are in
        each game's details.
      </div>
    )

  return (
    <section className="nstats">
      <div className="ll-top">
        <div>
          <h2 className="ll-title">National Stats</h2>
          <p className="muted tiny">Every {football ? 'FBS' : 'Division I'} player and team · tap a column to re-rank</p>
        </div>
        <div className="ll-filters">
          <div className="seg">
            {['players', 'teams'].map((k) => (
              <button key={k} className={k === kind ? 'on' : ''} onClick={() => go({ m: k, c: undefined, s: undefined })}>
                {k === 'players' ? 'Players' : 'Teams'}
              </button>
            ))}
          </div>
          {football && (
            <>
              <div className="seg small">
                {QUICK.map((id) => (
                  <button key={id} className={id === group ? 'on' : ''} onClick={() => go({ g: id })}>
                    {QUICK_LABEL[id] ?? options.find((o) => o.id === id)?.label}
                  </button>
                ))}
              </div>
              <select aria-label="Division or conference" value={group} onChange={(e) => go({ g: e.target.value })}>
                {options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      <nav className="ll-jump ns-tabs" aria-label="Stat categories">
        {list.map((t) => (
          <a
            key={t.id}
            href={buildHash(sport.id, 'stats', { ...params, c: t.id, s: undefined })}
            className={t.id === tab.id ? 'on' : ''}
            onClick={(e) => {
              e.preventDefault()
              go({ c: t.id, s: undefined })
            }}
          >
            {t.label}
          </a>
        ))}
      </nav>

      {kind === 'players' ? (
        <PlayerStats
          key={`${tab.id}`}
          sport={sport}
          tab={tab}
          sortCol={sortCol}
          group={group}
          onSort={(c) => go({ s: c.k })}
          onPlayer={setPlayer}
        />
      ) : (
        <TeamStats sport={sport} tab={tab} sortCol={sortCol} group={group} onSort={(c) => go({ s: c.k })} />
      )}

      {player && (
        <div className="tc-overlay" onClick={() => setPlayer(null)}>
          <aside className="tc-panel" role="dialog" aria-modal="true" aria-label="Player" onClick={(e) => e.stopPropagation()}>
            <button className="tc-close" onClick={() => setPlayer(null)} aria-label="Close">
              ×
            </button>
            <PlayerView
              sport={sport}
              player={{ id: player.id, name: player.name, position: player.position, headshot: player.headshot }}
              onBack={() => setPlayer(null)}
            />
          </aside>
        </div>
      )}
    </section>
  )
}
