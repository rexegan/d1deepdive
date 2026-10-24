import { SPORTS, fetchScoreboard, todayKey } from '../api.js'
import { buildHash, useData, useFavorites } from '../hooks.js'
import GameCard from './GameCard.jsx'
import TeamLogo from './TeamLogo.jsx'
import TeamName from './TeamName.jsx'
import { Loading, Updated } from './Status.jsx'

const ORDER = { in: 0, pre: 1, post: 2 }
const byInterest = (a, b) =>
  ORDER[a.state] - ORDER[b.state] ||
  bestRank(a) - bestRank(b) ||
  new Date(a.date) - new Date(b.date)
const bestRank = (g) => Math.min(g.home?.rank ?? 99, g.away?.rank ?? 99)

async function loadAll({ fresh }) {
  const today = todayKey()
  const results = await Promise.allSettled(
    SPORTS.map((s) => fetchScoreboard(s, s.byWeek ? {} : { date: today }, { fresh })),
  )
  return SPORTS.map((sport, i) => ({
    sport,
    data: results[i].status === 'fulfilled' ? results[i].value : null,
    error: results[i].status === 'rejected' ? results[i].reason : null,
  }))
}

const anyLive = (rows) => rows.some((r) => r.data?.events.some((e) => e.state === 'in'))

export default function Home() {
  const { data, loading, updated, polling, refresh } = useData(loadAll, [], { shouldPoll: anyLive })
  const { isFav, list: favs } = useFavorites()

  if (loading) return <Loading label="Checking every scoreboard…" />

  const all = data.flatMap((r) => r.data?.events ?? [])
  const live = all.filter((g) => g.state === 'in').sort(byInterest)
  const mine = all
    .filter((g) => [g.home, g.away].some((t) => t && isFav(g.sport, t.id)))
    .sort(byInterest)
  const tag = (g) => SPORTS.find((s) => s.id === g.sport)?.short

  return (
    <div className="home">
      <Updated updated={updated} polling={polling} onRefresh={refresh} />

      <section className="home-block">
        <h2>My Teams</h2>
        {favs.length === 0 ? (
          <p className="muted">
            Tap ☆ next to any team on a scoreboard or in the rankings to follow it. Their games show up
            here first.
          </p>
        ) : (
          <>
            <div className="fav-chips">
              {favs.map((f) => (
                <span key={`${f.sport}:${f.id}`} className="chip">
                  <TeamLogo src={f.logo} size={18} /> <TeamName sport={f.sport} team={f} />
                  <span className="muted"> · {SPORTS.find((s) => s.id === f.sport)?.short}</span>
                </span>
              ))}
            </div>
            {mine.length ? (
              <div className="grid">
                {mine.map((g) => (
                  <GameCard key={g.id} game={g} showSport={tag(g)} />
                ))}
              </div>
            ) : (
              <p className="muted">None of your teams play today.</p>
            )}
          </>
        )}
      </section>

      {live.length > 0 && (
        <section className="home-block">
          <h2>
            <span className="live-dot" /> Live now <span className="count">{live.length}</span>
          </h2>
          <div className="grid">
            {live.slice(0, 12).map((g) => (
              <GameCard key={g.id} game={g} showSport={tag(g)} />
            ))}
          </div>
        </section>
      )}

      {data.map(({ sport, data: d, error }) => {
        const events = d?.events ?? []
        const ranked = events.filter((g) => bestRank(g) < 99).sort(byInterest)
        const featured = (ranked.length ? ranked : [...events].sort(byInterest)).slice(0, 6)
        const scoresLink = buildHash(sport.id, 'scores')
        return (
          <section key={sport.id} className="home-block">
            <div className="block-head">
              <h2>
                {sport.icon} {sport.name}
              </h2>
              <a href={scoresLink} className="more">
                {events.length ? `All ${events.length} games ›` : 'Scores ›'}
              </a>
            </div>
            {error && <p className="muted">Couldn't load {sport.name.toLowerCase()} right now.</p>}
            {d && !events.length && (
              <p className="muted">
                No games {sport.byWeek ? 'this week' : 'today'}.
                {d.seasonStart && new Date(d.seasonStart) > new Date()
                  ? ` Season starts ${new Date(d.seasonStart).toLocaleDateString([], { month: 'long', day: 'numeric' })}.`
                  : ''}{' '}
                <a href={buildHash(sport.id, 'rankings')}>Rankings</a> ·{' '}
                <a href={buildHash(sport.id, 'standings')}>Standings</a>
              </p>
            )}
            {featured.length > 0 && (
              <>
                {ranked.length > 0 && <p className="muted sub">Top 25 {sport.byWeek ? 'this week' : 'today'}</p>}
                <div className="grid">
                  {featured.map((g) => (
                    <GameCard key={g.id} game={g} />
                  ))}
                </div>
              </>
            )}
          </section>
        )
      })}
    </div>
  )
}
