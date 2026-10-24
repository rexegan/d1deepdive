import { useState } from 'react'
import { fetchRankings, fetchStandings, groupMatches, leagueInfo } from '../api.js'
import { buildHash, useData, useFavorites } from '../hooks.js'
import LeagueBar, { SearchBox, matchesTeam } from './LeagueBar.jsx'
import TeamLogo from './TeamLogo.jsx'
import TeamName from './TeamName.jsx'
import { ErrorBox, Loading } from './Status.jsx'

function Move({ rank, previous }) {
  if (!previous || previous === 0) return <span className="move new">NEW</span>
  const diff = previous - rank
  if (diff > 0) return <span className="move up">▲{diff}</span>
  if (diff < 0) return <span className="move down">▼{-diff}</span>
  return <span className="move same">–</span>
}

const LOWER_DIVISION = /division i{2,3}\b|\bd-?i{2,3}\b|\bdiv\.? i{2,3}\b/i

// Which polls belong to the picked league's division.
function pollsFor(polls, league) {
  if (!league) return polls
  if (league.section === 'FCS') return polls.filter((p) => /fcs/i.test(p.name))
  if (league.section === 'Other divisions') {
    const want = league.id === '35' ? /\bii\b|\bd-?2\b/i : /\biii\b|\bd-?3\b/i
    return polls.filter((p) => LOWER_DIVISION.test(p.name) && want.test(p.name))
  }
  return polls.filter((p) => !/fcs/i.test(p.name) && !LOWER_DIVISION.test(p.name))
}

async function load(sport, league) {
  const [polls, groups] = await Promise.all([
    fetchRankings(sport),
    league?.conference ? fetchStandings(sport, league.division) : null,
  ])
  const members = groups
    ? new Set(groups.filter((g) => groupMatches(g, league)).flatMap((g) => g.entries.map((e) => e.team.id)))
    : null
  return { polls: pollsFor(polls, league), members }
}

export default function Rankings({ sport, params }) {
  const league = leagueInfo(sport, params.g)
  const { data, error, loading, refresh } = useData(() => load(sport, league), [sport.id, league?.id])
  const [pollId, setPollId] = useState(null)
  const [query, setQuery] = useState('')
  const { isFav, toggle } = useFavorites()

  const bar = league ? (
    <LeagueBar
      sport={sport}
      league={league.id}
      onLeague={(g) => (window.location.hash = buildHash(sport.id, 'rankings', { g }))}
      query={query}
      onQuery={setQuery}
    />
  ) : (
    <div className="toolbar">
      <SearchBox value={query} onChange={setQuery} />
    </div>
  )

  const body = () => {
    if (loading) return <Loading label="Loading rankings…" />
    if (error) return <ErrorBox error={error} onRetry={refresh} />
    if (!data.polls.length)
      return (
        <div className="state">
          {league?.section === 'Other divisions'
            ? `ESPN doesn't publish ${league.label} rankings.`
            : 'No rankings published yet this season.'}
        </div>
      )

    const poll = data.polls.find((p) => p.id === pollId) ?? data.polls[0]
    const ranks = poll.ranks.filter(
      (r) => (!data.members || data.members.has(r.team.id)) && matchesTeam(r.team, query),
    )

    return (
      <>
        <div className="toolbar">
          <div className="seg">
            {data.polls.map((p) => (
              <button key={p.id} className={p.id === poll.id ? 'on' : ''} onClick={() => setPollId(p.id)}>
                {p.short}
              </button>
            ))}
          </div>
        </div>
        {poll.headline && <p className="muted poll-head">{poll.headline}</p>}

        {ranks.length === 0 ? (
          <div className="state">
            {query
              ? 'No ranked teams match that search.'
              : `No ${league?.label ?? ''} teams are ranked in the ${poll.short}.`}
          </div>
        ) : (
          <ol className="table rank-table">
            {ranks.map((r) => (
              <li key={r.team.id ?? r.rank} className="row">
                <span className="rk">{r.rank}</span>
                <Move rank={r.rank} previous={r.previous} />
                <TeamLogo src={r.team.logo} size={28} />
                <span className="team-cell">
                  <strong>
                    <TeamName sport={sport.id} team={r.team}>
                      {r.team.fullName || r.team.name}
                    </TeamName>
                  </strong>
                  <span className="muted">
                    {r.record}
                    {r.firstPlace ? ` · ${r.firstPlace} first-place` : ''}
                  </span>
                </span>
                {r.points > 0 && <span className="pts">{r.points} pts</span>}
                <button
                  className={`star${isFav(sport.id, r.team.id) ? ' on' : ''}`}
                  onClick={() => toggle(sport.id, r.team)}
                  aria-label="Follow team"
                >
                  {isFav(sport.id, r.team.id) ? '★' : '☆'}
                </button>
              </li>
            ))}
          </ol>
        )}

        {!data.members && !query && poll.others.length > 0 && (
          <p className="muted small-print">
            <strong>Others receiving votes:</strong>{' '}
            {poll.others.map((o) => `${o.name} ${o.points}`).join(', ')}
          </p>
        )}
        {!data.members && !query && poll.dropped.length > 0 && (
          <p className="muted small-print">
            <strong>Dropped out:</strong> {poll.dropped.join(', ')}
          </p>
        )}
      </>
    )
  }

  return (
    <section>
      {bar}
      {body()}
    </section>
  )
}
