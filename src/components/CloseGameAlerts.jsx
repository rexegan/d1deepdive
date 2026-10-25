import { useEffect, useRef, useState } from 'react'
import { SPORTS, fetchScoreboard, isCloseGame, todayKey } from '../api.js'
import { useData } from '../hooks.js'
import { openTeam } from '../team.js'

const PREF_KEY = 'd1dd:closeAlerts'

async function loadClose({ fresh }) {
  const today = todayKey()
  const results = await Promise.allSettled(
    SPORTS.map((s) => fetchScoreboard(s, s.byWeek ? {} : { date: today }, { fresh })),
  )
  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value.events : [])).filter(isCloseGame)
}

function readPref() {
  try {
    return localStorage.getItem(PREF_KEY) === 'on'
  } catch {
    return false
  }
}

const label = (g) => `${g.away.abbr ?? g.away.name} ${g.away.score} – ${g.home.abbr ?? g.home.name} ${g.home.score}`

// A banner, on every page, of live games that are close late. Optionally
// pops a browser notification the first time a game turns close.
export default function CloseGameAlerts() {
  const { data } = useData(loadClose, [], { pollMs: 45_000, shouldPoll: () => true })
  const [notify, setNotify] = useState(readPref)
  const [dismissed, setDismissed] = useState(() => new Set())
  const seen = useRef(new Set())
  const games = data ?? []

  useEffect(() => {
    for (const g of games) {
      if (seen.current.has(g.id)) continue
      seen.current.add(g.id)
      if (notify && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification(`Close game: ${label(g)}`, { body: g.detail, tag: `close-${g.id}`, icon: g.home.logo ?? undefined })
        } catch {
          // some browsers only allow notifications from a service worker
        }
      }
    }
  }, [games, notify])

  const toggleNotify = async () => {
    let on = !notify
    if (on && 'Notification' in window && Notification.permission !== 'granted') {
      on = (await Notification.requestPermission()) === 'granted'
    }
    setNotify(on)
    try {
      localStorage.setItem(PREF_KEY, on ? 'on' : 'off')
    } catch {
      // preference lasts for this visit only
    }
  }

  const visible = games.filter((g) => !dismissed.has(g.id))
  const canNotify = typeof window !== 'undefined' && 'Notification' in window

  return (
    <div className={`close-alerts${visible.length ? ' active' : ''}`}>
      {visible.length > 0 && (
        <>
          <span className="close-title">
            <span className="live-dot" /> Close game{visible.length > 1 ? 's' : ''}
          </span>
          <div className="close-list">
            {visible.map((g) => (
              <div key={g.id} className="close-game">
                <span className="sport-tag">{SPORTS.find((s) => s.id === g.sport)?.short}</span>
                <button className="team-link" onClick={() => openTeam(g.sport, g.away)}>
                  {g.away.rank && <span className="rank">{g.away.rank}</span>} {g.away.abbr ?? g.away.name}
                </button>
                <strong>{g.away.score}</strong>
                <span className="muted">–</span>
                <strong>{g.home.score}</strong>
                <button className="team-link" onClick={() => openTeam(g.sport, g.home)}>
                  {g.home.rank && <span className="rank">{g.home.rank}</span>} {g.home.abbr ?? g.home.name}
                </button>
                <span className="clock">{g.detail}</span>
                {g.link && (
                  <a href={g.link} target="_blank" rel="noreferrer" className="more">
                    Gamecast ↗
                  </a>
                )}
                <button
                  className="close-x"
                  onClick={() => setDismissed((d) => new Set(d).add(g.id))}
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {canNotify && (
        <button className={`notify-btn${notify ? ' on' : ''}`} onClick={toggleNotify} title="Browser alerts for close games">
          {notify ? '🔔 Close-game alerts on' : '🔕 Alert me to close games'}
        </button>
      )}
    </div>
  )
}
