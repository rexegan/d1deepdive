import { useState } from 'react'
import { fetchStandings } from '../api.js'
import { buildHash, useData } from '../hooks.js'
import TeamLogo from './TeamLogo.jsx'
import { ErrorBox, Loading } from './Status.jsx'

export default function Standings({ sport, params }) {
  const division = params.div ?? sport.divisions[0]?.id
  const { data, error, loading, refresh } = useData(
    () => fetchStandings(sport, division),
    [sport.id, division],
  )
  const [conf, setConf] = useState('all')

  const go = (next) => {
    window.location.hash = buildHash(sport.id, 'standings', { ...params, ...next })
  }

  return (
    <section>
      <div className="toolbar">
        {sport.divisions.length > 1 && (
          <div className="seg">
            {sport.divisions.map((d) => (
              <button key={d.id} className={d.id === division ? 'on' : ''} onClick={() => go({ div: d.id })}>
                {d.label}
              </button>
            ))}
          </div>
        )}
        {data?.length > 1 && (
          <select aria-label="Conference" value={conf} onChange={(e) => setConf(e.target.value)}>
            <option value="all">All conferences</option>
            {data.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading && <Loading label="Loading standings…" />}
      {error && <ErrorBox error={error} onRetry={refresh} />}
      {data && !data.length && <div className="state">No standings available yet.</div>}

      <div className="standings-grid">
        {data
          ?.filter((g) => conf === 'all' || g.id === conf)
          .map((g) => {
            const showGB = g.entries.some((e) => e.gb)
            const showStreak = g.entries.some((e) => e.streak)
            const showConf = g.entries.some((e) => e.conf)
            return (
              <div key={g.id} className="conf-card">
                <h3>{g.name}</h3>
                <table className="standings">
                  <thead>
                    <tr>
                      <th className="left">Team</th>
                      {showConf && <th>Conf</th>}
                      <th>Overall</th>
                      {showGB && <th>GB</th>}
                      {showStreak && <th>Strk</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {g.entries.map((e) => (
                      <tr key={e.team.id ?? e.team.name}>
                        <td className="left">
                          <span className="team-inline">
                            <TeamLogo src={e.team.logo} size={20} />
                            {e.team.name}
                          </span>
                        </td>
                        {showConf && <td>{e.conf}</td>}
                        <td>{e.overall}</td>
                        {showGB && <td>{e.gb}</td>}
                        {showStreak && <td>{e.streak}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}
      </div>
    </section>
  )
}
