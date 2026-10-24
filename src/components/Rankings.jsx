import { useState } from 'react'
import { fetchRankings } from '../api.js'
import { useData, useFavorites } from '../hooks.js'
import TeamLogo from './TeamLogo.jsx'
import { ErrorBox, Loading } from './Status.jsx'

function Move({ rank, previous }) {
  if (!previous || previous === 0) return <span className="move new">NEW</span>
  const diff = previous - rank
  if (diff > 0) return <span className="move up">▲{diff}</span>
  if (diff < 0) return <span className="move down">▼{-diff}</span>
  return <span className="move same">–</span>
}

export default function Rankings({ sport }) {
  const { data, error, loading, refresh } = useData(() => fetchRankings(sport), [sport.id])
  const [pollId, setPollId] = useState(null)
  const { isFav, toggle } = useFavorites()

  if (loading) return <Loading label="Loading rankings…" />
  if (error) return <ErrorBox error={error} onRetry={refresh} />
  if (!data?.length) return <div className="state">No rankings published yet this season.</div>

  const poll = data.find((p) => p.id === pollId) ?? data[0]

  return (
    <section>
      <div className="toolbar">
        <div className="seg">
          {data.map((p) => (
            <button key={p.id} className={p.id === poll.id ? 'on' : ''} onClick={() => setPollId(p.id)}>
              {p.short}
            </button>
          ))}
        </div>
      </div>
      {poll.headline && <p className="muted poll-head">{poll.headline}</p>}

      <ol className="table rank-table">
        {poll.ranks.map((r) => (
          <li key={r.team.id ?? r.rank} className="row">
            <span className="rk">{r.rank}</span>
            <Move rank={r.rank} previous={r.previous} />
            <TeamLogo src={r.team.logo} size={28} />
            <span className="team-cell">
              <strong>{r.team.fullName || r.team.name}</strong>
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

      {poll.others.length > 0 && (
        <p className="muted small-print">
          <strong>Others receiving votes:</strong>{' '}
          {poll.others.map((o) => `${o.name} ${o.points}`).join(', ')}
        </p>
      )}
      {poll.dropped.length > 0 && (
        <p className="muted small-print">
          <strong>Dropped out:</strong> {poll.dropped.join(', ')}
        </p>
      )}
    </section>
  )
}
