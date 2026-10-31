import { useEffect, useState } from 'react'
import { fetchGame, periodLabel, sportById } from '../api.js'
import { useData } from '../hooks.js'
import { closeGame, isTopPanel, useOpenGame } from '../team.js'
import { Headshot, PlayerView } from './Roster.jsx'
import TeamLogo from './TeamLogo.jsx'
import TeamName from './TeamName.jsx'
import { ErrorBox, Loading } from './Status.jsx'

const TABS = [
  { id: 'game', label: 'Game' },
  { id: 'box', label: 'Box Score' },
  { id: 'stats', label: 'Team Stats' },
  { id: 'plays', label: 'Plays' },
]

const when = (iso) =>
  iso
    ? new Date(iso).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
    : ''

function Scorebug({ g }) {
  const pre = g.state === 'pre'
  const row = (t, side) => (
    <div className={`gd-team${g.state === 'post' && !t.winner ? ' lost' : ''}`}>
      <TeamLogo src={t.logo} size={56} sport={g.sport} team={t} />
      <TeamName sport={g.sport} team={t} className="gd-name">
        {t.rank && <span className="rank">{t.rank}</span>}
        {t.name}
      </TeamName>
      <span className="muted tiny">{[t.record, side].filter(Boolean).join(' · ')}</span>
    </div>
  )
  return (
    <div className="gd-score">
      {row(g.away, 'Away')}
      <div className="gd-mid">
        <div className="gd-nums">
          <strong className={g.away.winner ? 'won' : ''}>{pre ? '' : g.away.score}</strong>
          <span className="gd-status">
            {g.state === 'in' && <span className="live-dot" />}
            {pre ? 'Upcoming' : g.detail}
          </span>
          <strong className={g.home.winner ? 'won' : ''}>{pre ? '' : g.home.score}</strong>
        </div>
        {g.situation && (
          <span className="gd-sit">
            {g.possession && <span className="poss">●</span>} {g.situation}
          </span>
        )}
        <span className="muted tiny">{when(g.date)}</span>
      </div>
      {row(g.home, 'Home')}
    </div>
  )
}

function Linescore({ g }) {
  const ls = g.linescore
  if (!ls || g.state === 'pre') return null
  return (
    <section className="tc-section">
      <div className="table-scroll">
        <table className="standings gd-linescore">
          <thead>
            <tr>
              <th className="left" />
              {ls.labels.map((l, i) => (
                <th key={i}>{l}</th>
              ))}
              <th>{ls.baseball ? 'R' : 'T'}</th>
              {ls.baseball && <th>H</th>}
              {ls.baseball && <th>E</th>}
            </tr>
          </thead>
          <tbody>
            {[g.away, g.home].map((t) => (
              <tr key={t.id} className={t.winner ? 'won' : ''}>
                <td className="left">
                  <span className="team-inline">
                    <TeamLogo src={t.logo} size={20} sport={g.sport} team={t} />
                    <TeamName sport={g.sport} team={t}>{t.abbr}</TeamName>
                  </span>
                </td>
                {ls.labels.map((_, i) => (
                  <td key={i}>{t.lines[i] ?? ''}</td>
                ))}
                <td className="gd-total-cell">{t.score}</td>
                {ls.baseball && <td>{t.hits}</td>}
                {ls.baseball && <td>{t.errors}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Leaders({ g, onPlayer }) {
  if (!g.leaders.length) return null
  const side = (l) =>
    l ? (
      <button className="gd-leader" onClick={() => onPlayer({ id: l.id, name: l.fullName, jersey: l.jersey, position: l.position })}>
        <Headshot src={l.headshot} name={l.fullName} size={44} />
        <span className="gd-leader-text">
          <strong>{l.value ?? ''}</strong>
          <span>
            {l.name} <span className="muted">{l.position}</span>
          </span>
          <span className="muted tiny">{l.line}</span>
        </span>
      </button>
    ) : (
      <span className="muted tiny gd-none">None</span>
    )
  return (
    <section className="tc-section">
      <h4>{g.state === 'pre' ? 'Season leaders' : 'Game leaders'}</h4>
      <div className="gd-leaders-head">
        <span>
          <TeamLogo src={g.away.logo} size={20} sport={g.sport} team={g.away} /> <TeamName sport={g.sport} team={g.away}>{g.away.abbr}</TeamName>
        </span>
        <span>
          <TeamName sport={g.sport} team={g.home}>{g.home.abbr}</TeamName> <TeamLogo src={g.home.logo} size={20} sport={g.sport} team={g.home} />
        </span>
      </div>
      {g.leaders.map((r) => (
        <div key={r.name} className="gd-leader-row">
          {side(r.away)}
          <span className="gd-cat">{r.label}</span>
          {side(r.home)}
        </div>
      ))}
    </section>
  )
}

function Scoring({ g, sport }) {
  if (!g.scoring.length) return null
  return (
    <section className="tc-section">
      <h4>Scoring summary</h4>
      <ul className="gd-scoring">
        {g.scoring.map((p) => (
          <li key={p.id}>
            <TeamLogo src={p.team?.logo} size={30} />
            <div>
              <strong>{p.type}</strong>
              <span className="muted tiny">
                {' '}
                {[p.clock, periodLabel(sport, p.period, p.half)].filter(Boolean).join(' · ')}
              </span>
              <p>{p.text}</p>
            </div>
            <span className="gd-running">
              <span>{p.away}</span>
              <span className="muted tiny">{g.away.abbr}</span>
              <span>{p.home}</span>
              <span className="muted tiny">{g.home.abbr}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

const recordLine = (t) => {
  const conf = t.confRecord && t.confRecord !== '0-0' ? `${t.confRecord} Conf` : ''
  return [t.record, conf].filter(Boolean).join(', ')
}

function OddsCell({ line, odds, big }) {
  return (
    <td className={`od-cell${big ? ' od-ml' : ''}`}>
      <span className="od-box">
        <strong>{line || '—'}</strong>
        {odds && <span>{odds}</span>}
      </span>
    </td>
  )
}

function Odds({ g }) {
  const o = g.odds
  if (!o) return null
  const time = g.date ? new Date(g.date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''
  return (
    <section className="tc-section od">
      <header className="od-head">
        <h4>Game odds</h4>
        {o.provider && (
          <span className="od-by muted tiny">
            Odds by{' '}
            {o.logo ? (
              <picture>
                {o.logoDark && <source srcSet={o.logoDark} media="(prefers-color-scheme: dark)" />}
                <img src={o.logo} alt={o.provider} height="16" />
              </picture>
            ) : (
              <strong>{o.provider}</strong>
            )}
          </span>
        )}
      </header>
      <div className="table-scroll">
        <table className="od-table">
          <thead>
            <tr>
              <th className="left muted">{g.state === 'pre' ? time : g.state === 'in' ? 'Live' : 'Closing'}</th>
              {o.hasOpen && <th>Open</th>}
              <th>Spread</th>
              <th>Total</th>
              <th>ML</th>
            </tr>
          </thead>
          <tbody>
            {[
              [g.away, o.away],
              [g.home, o.home],
            ].map(([t, x]) => (
              <tr key={t.id}>
                <td className="left od-team">
                  <span className="team-inline">
                    <TeamLogo src={t.logo} size={24} sport={g.sport} team={t} />
                    <span>
                      <TeamName sport={g.sport} team={t}>
                        <span className="od-full">{t.fullName ?? t.name}</span>
                        <span className="od-short">{t.name}</span>
                      </TeamName>
                      {recordLine(t) && <span className="muted tiny od-rec">({recordLine(t)})</span>}
                    </span>
                  </span>
                </td>
                {o.hasOpen && (
                  <td className="od-open">
                    <strong>{x.open || '—'}</strong>
                    {x.openOdds && <span className="muted">{x.openOdds}</span>}
                  </td>
                )}
                <OddsCell line={x.spread} odds={x.spreadOdds} />
                <OddsCell line={x.total} odds={x.totalOdds} />
                <OddsCell line={x.moneyLine} big />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted tiny">Odds and lines subject to change. 21+. Gambling problem? Call 1-800-GAMBLER.</p>
    </section>
  )
}

// ---------- matchup predictor ----------

const hexRgb = (hex) => {
  const h = (hex ?? '').replace('#', '')
  if (h.length !== 6) return null
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}
const lum = (rgb) => (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])

/** Team colors for the ring: skip ones that vanish on the background, and keep the two sides apart. */
function ringColors(away, home) {
  const dark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const usable = (c) => {
    const rgb = hexRgb(c)
    return rgb && (dark ? lum(rgb) > 0.2 : lum(rgb) < 0.9) ? rgb : null
  }
  const homeRgb = usable(home.color) ?? usable(home.altColor) ?? [55, 65, 81]
  const choices = [away.color, away.altColor].map(usable).filter(Boolean)
  const awayRgb = choices.find((c) => dist(c, homeRgb) > 90) ?? (dist([156, 163, 175], homeRgb) > 90 ? [156, 163, 175] : [200, 16, 46])
  const css = (c) => `rgb(${c.join(',')})`
  return { away: css(awayRgb), home: css(homeRgb) }
}

const pct = (n) => `${Number(n).toFixed(1)}%`

function Predictor({ g }) {
  const p = g.predictor
  if (!p) return null
  const colors = ringColors(g.away, g.home)
  const R = 80
  const C = 2 * Math.PI * R
  const gap = p.away > 0 && p.home > 0 ? 6 : 0
  const homeLen = Math.max(0, (p.home / 100) * C - gap)
  const awayLen = Math.max(0, (p.away / 100) * C - gap)
  const patternId = `od-hatch-${g.id}`
  const label = (t, side) => (
    <div className={`mp-side mp-${side}`}>
      <strong>{pct(p[side])}</strong>
      <span className="muted">
        {side === 'away' && <span className="mp-swatch hatched" style={{ '--c': colors.away }} />}
        {t.abbr}
        {side === 'home' && <span className="mp-swatch" style={{ background: colors.home }} />}
      </span>
    </div>
  )
  return (
    <section className="tc-section mp">
      <h4>{p.live ? 'Live win probability' : 'Matchup predictor'}</h4>
      <div className="mp-body">
        {label(g.away, 'away')}
        <svg className="mp-ring" viewBox="0 0 200 200" role="img" aria-label={`${g.away.name} ${pct(p.away)}, ${g.home.name} ${pct(p.home)}`}>
          <defs>
            <pattern id={patternId} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <rect width="2.2" height="5" fill={colors.away} />
            </pattern>
          </defs>
          <g transform="rotate(-90 100 100)">
            {/* Home fills clockwise from the top, away counter-clockwise. */}
            <circle cx="100" cy="100" r={R} fill="none" stroke={colors.home} strokeWidth="18" strokeDasharray={`${homeLen} ${C}`} strokeDashoffset={-gap / 2} />
            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={`url(#${patternId})`}
              strokeWidth="18"
              strokeDasharray={`${awayLen} ${C}`}
              strokeDashoffset={-gap / 2}
              transform="scale(1 -1) translate(0 -200)"
            />
          </g>
          <line x1="100" y1="42" x2="100" y2="158" className="mp-divider" />
          <image href={g.away.logo ?? ''} x="46" y="78" width="44" height="44" />
          <image href={g.home.logo ?? ''} x="110" y="78" width="44" height="44" />
        </svg>
        {label(g.home, 'home')}
      </div>
      <p className="muted tiny mp-foot">{g.state === 'post' && !p.live ? 'Pregame projection · ' : ''}According to ESPN Analytics</p>
    </section>
  )
}

function Venue({ g }) {
  const bits = [g.venue, g.city, g.weather, g.broadcast, g.attendance && `${Number(g.attendance).toLocaleString()} attendance`].filter(Boolean)
  return bits.length ? <p className="muted tiny gd-venue">{bits.join(' · ')}</p> : null
}

function BoxScore({ g, onPlayer }) {
  const [side, setSide] = useState('away')
  const cats = (g.players[side] ?? []).filter((c) => c.rows.length)
  if (!Object.keys(g.players).length) return <p className="muted">The box score isn't posted yet.</p>
  return (
    <>
      <div className="seg small gd-sides">
        {['away', 'home'].map((s) => (
          <button key={s} className={s === side ? 'on' : ''} onClick={() => setSide(s)}>
            {g[s].name}
          </button>
        ))}
      </div>
      {!cats.length && <p className="muted">No player stats for {g[side].name} yet.</p>}
      {cats.map((c) => (
        <section key={c.name} className="tc-section">
          <h4>{c.title}</h4>
          <div className="table-scroll">
            <table className="standings">
              <thead>
                <tr>
                  <th className="left" />
                  {c.labels.map((l) => (
                    <th key={l}>{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.id ?? r.name}>
                    <td className="left">
                      <button className="team-link" onClick={() => onPlayer({ id: r.id, name: r.name, jersey: r.jersey })}>
                        {r.name}
                      </button>
                      {r.position && <span className="muted tiny"> {r.position}</span>}
                    </td>
                    {r.stats.map((v, i) => (
                      <td key={i}>{v}</td>
                    ))}
                  </tr>
                ))}
                {c.totals.length > 0 && (
                  <tr className="gd-total">
                    <td className="left">Total</td>
                    {c.totals.map((v, i) => (
                      <td key={i}>{v}</td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  )
}

function TeamStats({ g }) {
  if (!g.stats.length) return <p className="muted">Team stats aren't posted yet.</p>
  return (
    <section className="tc-section">
      <div className="gd-leaders-head">
        <span>
          <TeamLogo src={g.away.logo} size={20} sport={g.sport} team={g.away} /> <TeamName sport={g.sport} team={g.away}>{g.away.abbr}</TeamName>
        </span>
        <span>
          <TeamName sport={g.sport} team={g.home}>{g.home.abbr}</TeamName> <TeamLogo src={g.home.logo} size={20} sport={g.sport} team={g.home} />
        </span>
      </div>
      <dl className="tc-statlist gd-stats">
        {g.stats.map((s) => (
          <div key={s.label}>
            <dd>{s.away}</dd>
            <dt>{s.label}</dt>
            <dd>{s.home}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Plays({ g, sport }) {
  if (!g.drives.length && g.periods.length) return <PeriodPlays g={g} />
  if (!g.drives.length) return <p className="muted">No plays yet.</p>
  return (
    <div className="gd-drives">
      {g.drives.map((d, i) => (
        <details key={d.id} className="draft-year" open={i === 0}>
          <summary>
            <TeamLogo src={d.team?.logo} size={18} /> {[d.team?.abbr, d.result || (d.live ? 'In progress' : '')].filter(Boolean).join(' · ')}
            <span className="muted"> · {d.description}</span>
          </summary>
          <ul className="gd-plays">
            {[...d.plays].reverse().map((p) => (
              <li key={p.id} className={p.scoring ? 'scoring' : ''}>
                <span className="muted tiny">
                  {periodLabel(sport, p.period)} {p.clock}
                  {p.down && ` · ${p.down}`}
                </span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}

// Basketball and baseball play-by-play, one collapsible section per period.
function PeriodPlays({ g }) {
  return (
    <div className="gd-drives">
      {g.periods.map((per, i) => (
        <details key={per.key} className="draft-year" open={i === 0}>
          <summary>
            {per.label} <span className="muted">· {per.plays.length} plays</span>
          </summary>
          <ul className="gd-plays">
            {[...per.plays].reverse().map((p) => (
              <li key={p.id} className={p.scoring ? 'scoring' : ''}>
                <span className="muted tiny">
                  {[p.clock, p.team?.abbr, p.away != null && `${g.away.abbr} ${p.away}–${p.home} ${g.home.abbr}`]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}

function Body({ open }) {
  const sport = sportById(open.sport)
  const { data, error, loading, refresh } = useData(({ fresh }) => fetchGame(sport, open.id, { fresh }), [open.id], {
    pollMs: 15_000,
    shouldPoll: (d) => d.state === 'in',
  })
  const [tab, setTab] = useState('game')
  const [player, setPlayer] = useState(null)

  if (player) return <PlayerView sport={sport} player={player} onBack={() => setPlayer(null)} />
  if (loading)
    return (
      <>
        <h2 className="ed-title">
          {open.away?.name} @ {open.home?.name}
        </h2>
        <Loading label="Loading game…" />
      </>
    )
  if (error && !data) return <ErrorBox error={error} onRetry={refresh} />

  const g = data
  return (
    <>
      <Scorebug g={g} />
      <div className="seg small gd-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={t.id === tab ? 'on' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'game' && (
        <>
          <Linescore g={g} />
          {/* Lines lead before the game; afterwards the box score comes first. */}
          {g.state === 'pre' && <Odds g={g} />}
          <Predictor g={g} />
          <Leaders g={g} onPlayer={setPlayer} />
          <Scoring g={g} sport={sport} />
          {g.state !== 'pre' && <Odds g={g} />}
          <Venue g={g} />
        </>
      )}
      {tab === 'box' && <BoxScore g={g} onPlayer={setPlayer} />}
      {tab === 'stats' && <TeamStats g={g} />}
      {tab === 'plays' && <Plays g={g} sport={sport} />}

      {g.link && (
        <p className="tc-foot">
          <a href={g.link} target="_blank" rel="noreferrer" className="more">
            Full Gamecast on ESPN ↗
          </a>
        </p>
      )}
    </>
  )
}

export default function GameDetail() {
  const open = useOpenGame()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape' || e.defaultPrevented || !isTopPanel(open.z)) return
      e.preventDefault()
      closeGame()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null
  return (
    <div className="tc-overlay" style={{ zIndex: open.z }} onClick={closeGame}>
      <aside className="tc-panel gd-panel" role="dialog" aria-modal="true" aria-label="Game details" onClick={(e) => e.stopPropagation()}>
        <button className="tc-close" onClick={closeGame} aria-label="Close">
          ×
        </button>
        <Body key={open.id} open={open} />
      </aside>
    </div>
  )
}
