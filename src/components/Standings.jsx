import { useState } from 'react'
import { fetchRankings, fetchStandings, groupMatches, leagueInfo, sportById } from '../api.js'
import { buildHash, useData } from '../hooks.js'
import LeagueBar, { SearchBox, matchesTeam } from './LeagueBar.jsx'
import TeamLogo from './TeamLogo.jsx'
import TeamName from './TeamName.jsx'
import { ErrorBox, Loading } from './Status.jsx'

async function load(sport, division, withRanks) {
  const [own, borrowed, polls] = await Promise.all([
    fetchStandings(sport, division),
    sport.confFrom ? fetchStandings(sportById(sport.confFrom)) : null,
    withRanks && !sport.noRankings ? fetchRankings(sport).catch(() => []) : [],
  ])
  // Sports without conference standings: regroup their single D1 table by the
  // borrowed sport's conferences.
  let groups = own
  if (borrowed) {
    const entries = own.flatMap((g) => g.entries)
    groups = borrowed
      .map((g) => {
        const ids = new Set(g.entries.map((e) => String(e.team.id)))
        return { ...g, entries: entries.filter((e) => ids.has(String(e.team.id))) }
      })
      .filter((g) => g.entries.length)
  }
  // Rank badges come from the first poll for this division (AP for FBS).
  const fcs = division === '81'
  const poll = polls.find((p) => /fcs/i.test(p.name) === fcs)
  const ranks = new Map(poll?.ranks.map((r) => [r.team.id, r.rank]) ?? [])
  return { groups, ranks }
}

export default function Standings({ sport, params }) {
  const league = leagueInfo(sport, params.g)
  const division = league ? (sport.byWeek ? league.division : undefined) : (params.div ?? sport.divisions[0]?.id)
  const { data, error, loading, refresh } = useData(
    () => load(sport, division, !!league),
    [sport.id, division],
  )
  const [conf, setConf] = useState('all')
  const [query, setQuery] = useState('')

  const go = (next) => {
    window.location.hash = buildHash(sport.id, 'standings', { ...params, ...next })
  }

  const groups = (data?.groups ?? [])
    .filter((g) =>
      league ? !league.conference || groupMatches(g, league) : conf === 'all' || g.id === conf,
    )
    .map((g) => ({
      ...g,
      entries: g.entries.filter(
        (e) => (!league?.top25 || !data.ranks.size || data.ranks.has(e.team.id)) && matchesTeam(e.team, query),
      ),
    }))
    .filter((g) => g.entries.length)

  return (
    <section>
      {league ? (
        <LeagueBar sport={sport} league={league.id} onLeague={(g) => go({ g })} query={query} onQuery={setQuery} />
      ) : (
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
          {data?.groups.length > 1 && (
            <select aria-label="Conference" value={conf} onChange={(e) => setConf(e.target.value)}>
              <option value="all">All conferences</option>
              {data.groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          )}
          <SearchBox value={query} onChange={setQuery} />
        </div>
      )}

      {loading && <Loading label="Loading standings…" />}
      {error && <ErrorBox error={error} onRetry={refresh} />}
      {data && !groups.length && (
        <div className="state">
          {query
            ? 'No teams match that search.'
            : league?.top25
              ? 'No ranked teams found in the standings.'
              : 'No standings available yet.'}
        </div>
      )}

      <div className="standings-grid">
        {groups.map((g) => {
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
                          <TeamLogo src={e.team.logo} size={20} sport={sport.id} team={e.team} />
                          {data.ranks.has(e.team.id) && <span className="rank">{data.ranks.get(e.team.id)}</span>}
                          <TeamName sport={sport.id} team={e.team} />
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
