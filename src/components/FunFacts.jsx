import { draftPicksFor, fetchWiki, programWikiTitle } from '../api.js'
import { FINALISTS, WINNERS } from '../data/heisman.js'
import { useData } from '../hooks.js'
import { Loading } from './Status.jsx'

async function load(sport, team) {
  const [wiki, picks] = await Promise.all([
    fetchWiki(programWikiTitle(sport, team.name)),
    sport.id === 'cfb' ? draftPicksFor(team) : [],
  ])
  return { wiki, picks }
}

function DraftHistory({ picks }) {
  if (!picks.length) return <p className="muted">No NFL draft picks found for this school since 2000.</p>
  const years = [...new Set(picks.map((p) => p.year))].sort((a, b) => b - a)
  const firstRound = picks.filter((p) => p.round === 1).length
  const topPicks = picks.filter((p) => p.overall === 1)
  return (
    <>
      <div className="tc-stats">
        <div className="tc-big">
          <span className="label">Drafted since {Math.min(...years)}</span>
          <strong>{picks.length}</strong>
        </div>
        <div className="tc-big">
          <span className="label">1st-round picks</span>
          <strong>{firstRound}</strong>
        </div>
        {topPicks.length > 0 && (
          <div className="tc-big">
            <span className="label">#1 overall</span>
            <strong>{topPicks.length}</strong>
          </div>
        )}
      </div>
      {years.map((y, i) => {
        const list = picks.filter((p) => p.year === y).sort((a, b) => a.overall - b.overall)
        return (
          <details key={y} className="draft-year" open={i < 2}>
            <summary>
              {y} NFL Draft <span className="muted">· {list.length} picked</span>
            </summary>
            <ul className="draft-list">
              {list.map((p) => (
                <li key={`${p.overall}-${p.name}`}>
                  <span className="muted pick">
                    Rd {p.round} · #{p.overall}
                  </span>
                  <strong>{p.name}</strong>
                  <span className="muted">{p.pos}</span>
                  <span className="nfl">{p.nfl}</span>
                </li>
              ))}
            </ul>
          </details>
        )
      })}
    </>
  )
}

export default function FunFacts({ sport, team }) {
  const { data, loading } = useData(() => load(sport, team), [sport.id, team.id])
  if (loading) return <Loading label="Digging up fun facts…" />

  const winners = sport.id === 'cfb' ? WINNERS.filter((w) => w.school === team.location) : []
  const finalists = sport.id === 'cfb' ? FINALISTS.filter((f) => f.school === team.location) : []

  return (
    <div className="fun-facts">
      {data.wiki && (
        <section className="tc-section program">
          {data.wiki.thumb && <img src={data.wiki.thumb} alt="" className="program-img" />}
          <div>
            <h4>{data.wiki.title}</h4>
            <p>{data.wiki.extract}</p>
            {data.wiki.link && (
              <a href={data.wiki.link} target="_blank" rel="noreferrer" className="more">
                Read more on Wikipedia ↗
              </a>
            )}
          </div>
        </section>
      )}

      {sport.id === 'cfb' && (
        <>
          <section className="tc-section">
            <h4>🏆 Heisman Trophy winners ({winners.length})</h4>
            {winners.length ? (
              <ul className="facts-list">
                {winners.map((w) => (
                  <li key={w.year}>
                    <span className="muted year">{w.year}</span> <strong>{w.name}</strong>{' '}
                    <span className="muted">{w.pos}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No Heisman winners yet.</p>
            )}
          </section>

          <section className="tc-section">
            <h4>Heisman finalists (since 2010)</h4>
            {finalists.length ? (
              <ul className="facts-list">
                {finalists.map((f) => (
                  <li key={f.year + f.name}>
                    <span className="muted year">{f.year}</span> <strong>{f.name}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No other Heisman finalists since 2010.</p>
            )}
          </section>

          <section className="tc-section">
            <h4>🏈 NFL Draft picks</h4>
            <DraftHistory picks={data.picks} />
          </section>
        </>
      )}

      {!data.wiki && sport.id !== 'cfb' && <p className="muted">No fun facts found for this program yet.</p>}
    </div>
  )
}
