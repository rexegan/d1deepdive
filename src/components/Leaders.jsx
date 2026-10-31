import { useEffect, useState } from 'react'
import { fetchLeaders, fetchStatLine } from '../api.js'
import { buildHash, useData } from '../hooks.js'
import { Headshot, PlayerView } from './Roster.jsx'
import TeamLogo from './TeamLogo.jsx'
import TeamName from './TeamName.jsx'
import { ErrorBox, Loading } from './Status.jsx'

// Football leaders can be narrowed to a division or conference (ESPN group ids).
const QUICK = ['80', '81', '8', '5', '4', '1']
const QUICK_LABEL = { 80: 'FBS', 81: 'FCS' }

function groupOptions(sport) {
  return (sport.leagues ?? []).filter((l) => ['FBS', 'FCS'].includes(l.section))
}

const num = (v) => parseFloat(String(v).replace(/[^0-9.-]/g, '')) || 0

// Season line (yards, TDs, rating…) for the #1 player, loaded on demand.
function StatLine({ sport, id }) {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    let live = true
    fetchStatLine(sport, id)
      .then((s) => live && setStats(s))
      .catch(() => live && setStats([]))
    return () => {
      live = false
    }
  }, [sport, id])
  if (!stats?.length) return null
  return (
    <div className="ll-line">
      {stats.map((s) => (
        <span key={s.full} title={s.rank ? `${s.full} · ${s.rank} nationally` : s.full}>
          <strong>{s.value}</strong> {s.name}
        </span>
      ))}
    </div>
  )
}

function Category({ sport, cat, onPlayer }) {
  const [top, ...rest] = cat.leaders
  const max = num(top.value) || 1
  const player = (l) => () => onPlayer({ id: l.id, name: l.name, jersey: l.jersey, position: l.position, headshot: l.headshot })
  return (
    <article className="ll-card" style={top.team?.color ? { '--team': top.team.color } : undefined}>
      <h4 className="ll-cat">{cat.label}</h4>
      <div className="ll-hero">
        <button className="ll-hero-photo" onClick={player(top)} aria-label={`${top.name} profile`}>
          <Headshot src={top.headshot} name={top.name} size={88} />
          <span className="ll-crown">1</span>
        </button>
        <div className="ll-hero-text">
          <button className="ll-name" onClick={player(top)}>
            {top.name}
          </button>
          <span className="ll-team">
            <TeamLogo src={top.team?.logo} size={18} sport={sport.id} team={top.team} />
            <TeamName sport={sport.id} team={top.team} />
            <span className="muted">
              {[top.position, top.jersey && `#${top.jersey}`].filter(Boolean).join(' · ')}
            </span>
          </span>
          <strong className="ll-value">
            {top.value} <small>{cat.abbr}</small>
          </strong>
        </div>
      </div>
      <StatLine sport={sport} id={top.id} />
      <ol className="ll-list" start={2}>
        {rest.map((l) => (
          <li key={`${l.id}-${l.rank}`}>
            <span className="ll-rank">{l.rank}</span>
            <button className="ll-who" onClick={player(l)}>
              <Headshot src={l.headshot} name={l.name} size={34} />
              <span>
                <span className="ll-pname">{l.name}</span>
                <span className="muted tiny ll-sub">
                  <TeamLogo src={l.team?.logo} size={14} /> {l.team?.abbr} {l.position && `· ${l.position}`}
                </span>
              </span>
            </button>
            <span className="ll-bar-wrap">
              <strong>{l.value}</strong>
              <span className="ll-bar" style={{ width: `${Math.max(8, (num(l.value) / max) * 100)}%` }} />
            </span>
          </li>
        ))}
      </ol>
    </article>
  )
}

export default function Leaders({ sport, params }) {
  const football = !!sport.byWeek
  const options = football ? groupOptions(sport) : []
  const group = football ? (options.some((o) => o.id === params.g) ? params.g : '80') : undefined
  const { data, error, loading, refresh } = useData(() => fetchLeaders(sport, group), [sport.id, group])
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    if (!player) return
    const onKey = (e) => e.key === 'Escape' && setPlayer(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [player])

  const go = (g) => {
    window.location.hash = buildHash(sport.id, 'leaders', { ...params, g })
  }

  if (!loading && !error && !data)
    return (
      <div className="state">
        ESPN doesn't publish national stat leaders for college {sport.name.toLowerCase()} yet. Box scores and player
        stats are in each game's details.
      </div>
    )

  return (
    <section className="leaders">
      <div className="ll-top">
        <div>
          <h2 className="ll-title">League Leaders</h2>
          <p className="muted tiny">
            {data ? `${data.label} season` : ' '}
            {football ? ` · ${options.find((o) => o.id === group)?.label ?? ''}` : ' · All of Division I'}
            {' · '}tap any player for their full profile
          </p>
        </div>
        {football && (
          <div className="ll-filters">
            <div className="seg small">
              {QUICK.map((id) => (
                <button key={id} className={id === group ? 'on' : ''} onClick={() => go(id)}>
                  {QUICK_LABEL[id] ?? options.find((o) => o.id === id)?.label}
                </button>
              ))}
            </div>
            <select aria-label="Division or conference" value={group} onChange={(e) => go(e.target.value)}>
              {['FBS', 'FCS'].map((sec) => (
                <optgroup key={sec} label={sec}>
                  {options
                    .filter((o) => o.section === sec)
                    .map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
        )}
      </div>

      {loading && <Loading label="Loading leaders…" />}
      {error && <ErrorBox error={error} onRetry={refresh} />}

      {data && (
        <>
          <nav className="ll-jump" aria-label="Sections">
            {data.sections.map((s) => (
              <a key={s.title} href={`#ll-${s.title}`} onClick={(e) => (e.preventDefault(), document.getElementById(`ll-${s.title}`)?.scrollIntoView({ behavior: 'smooth' }))}>
                {s.icon} {s.title}
              </a>
            ))}
          </nav>
          {data.sections.map((s) => (
            <section key={s.title} id={`ll-${s.title}`} className="ll-section">
              <h3>
                {s.icon} {s.title}
              </h3>
              <div className="ll-grid">
                {s.cats.map((c) => (
                  <Category key={c.name} sport={sport} cat={c} onPlayer={setPlayer} />
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      {player && (
        <div className="tc-overlay" onClick={() => setPlayer(null)}>
          <aside className="tc-panel" role="dialog" aria-modal="true" aria-label="Player" onClick={(e) => e.stopPropagation()}>
            <button className="tc-close" onClick={() => setPlayer(null)} aria-label="Close">
              ×
            </button>
            <PlayerView sport={sport} player={player} onBack={() => setPlayer(null)} />
          </aside>
        </div>
      )}
    </section>
  )
}
