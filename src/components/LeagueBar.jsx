// Shared football league picker: quick tabs, a dropdown of every league, and
// team search on the far right. Used by Scores, Rankings and Standings.
import { useFavorites } from '../hooks.js'

export default function LeagueBar({ sport, league, onLeague, query, onQuery }) {
  const { isConfFav, toggleConf } = useFavorites()
  const current = sport.leagues.find((l) => l.id === league)
  const isConf = current && current.section && !/\(All\)|Division I{1,3}$/.test(current.label)
  const sections = [...new Set(sport.leagues.map((l) => l.section))]
  const option = (l) => (
    <option key={l.id} value={l.id}>
      {l.label}
    </option>
  )
  return (
    <div className="toolbar league-bar">
      <div className="seg">
        {sport.quickLeagues.map((id) => (
          <button key={id} className={id === league ? 'on' : ''} onClick={() => onLeague(id)}>
            {sport.leagues.find((l) => l.id === id).label}
          </button>
        ))}
      </div>
      <select aria-label="League" value={league} onChange={(e) => onLeague(e.target.value)}>
        {sections.map((section) => {
          const items = sport.leagues.filter((l) => l.section === section)
          return section ? (
            <optgroup key={section} label={section}>
              {items.map(option)}
            </optgroup>
          ) : (
            items.map(option)
          )
        })}
      </select>
      {isConf && (
        <button
          className={`btn follow-conf${isConfFav(sport.id, league) ? ' on' : ''}`}
          onClick={() => toggleConf(sport.id, current)}
          title={isConfFav(sport.id, league) ? 'Unfollow conference' : 'Follow conference'}
        >
          {isConfFav(sport.id, league) ? '★ Following' : '☆ Follow'} {current.label}
        </button>
      )}
      <SearchBox value={query} onChange={onQuery} />
    </div>
  )
}

export function SearchBox({ value, onChange }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Find a team"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export const matchesTeam = (team, query) => {
  const q = query.trim().toLowerCase()
  return !q || `${team.name} ${team.fullName} ${team.abbr ?? ''}`.toLowerCase().includes(q)
}
