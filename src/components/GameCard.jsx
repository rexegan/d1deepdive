import TeamLogo from './TeamLogo.jsx'
import { useFavorites } from '../hooks.js'
import TeamName from './TeamName.jsx'

function startTime(iso) {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function TeamRow({ team, sport, game }) {
  const { isFav, toggle } = useFavorites()
  if (!team) return null
  const fav = isFav(sport, team.id)
  const lost = game.state === 'post' && !team.winner
  return (
    <div className={`team-row${lost ? ' lost' : ''}${team.winner ? ' won' : ''}`}>
      <TeamLogo src={team.logo} alt="" size={26} />
      <div className="team-name">
        {team.rank && <span className="rank">{team.rank}</span>}
        <TeamName sport={sport} team={team} className="name" />
        {team.possession && <span className="poss" title="Possession">●</span>}
        {team.record && <span className="record">{team.record}</span>}
      </div>
      <button
        className={`star${fav ? ' on' : ''}`}
        onClick={() => toggle(sport, team)}
        aria-label={fav ? `Unfollow ${team.name}` : `Follow ${team.name}`}
        title={fav ? 'Unfollow' : 'Follow team'}
      >
        {fav ? '★' : '☆'}
      </button>
      <div className="score">{game.state === 'pre' ? '' : team.score}</div>
    </div>
  )
}

export default function GameCard({ game, showSport }) {
  const status =
    game.state === 'pre'
      ? /TBD|TBA/i.test(game.detail)
        ? game.detail
        : startTime(game.date)
      : game.detail
  return (
    <article className={`game game-${game.state}`}>
      <header className="game-head">
        <span className={`status status-${game.state}`}>
          {game.state === 'in' && <span className="live-dot" />}
          {status}
        </span>
        {showSport && <span className="sport-tag">{showSport}</span>}
        {game.broadcast && <span className="tv">{game.broadcast}</span>}
      </header>
      <TeamRow team={game.away} sport={game.sport} game={game} />
      <TeamRow team={game.home} sport={game.sport} game={game} />
      <footer className="game-foot">
        <span className="meta">
          {game.situation && game.state === 'in' ? (
            <strong>{game.situation}</strong>
          ) : (
            game.note || (game.neutral ? `Neutral · ${game.venue}` : game.venue)
          )}
        </span>
        {game.link && (
          <a href={game.link} target="_blank" rel="noreferrer" className="more">
            {game.state === 'pre' ? 'Preview' : game.state === 'in' ? 'Gamecast' : 'Box score'} ↗
          </a>
        )}
      </footer>
    </article>
  )
}
