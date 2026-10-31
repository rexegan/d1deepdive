import TeamLogo from './TeamLogo.jsx'
import { useFavorites } from '../hooks.js'
import TeamName from './TeamName.jsx'
import { isCloseGame } from '../api.js'
import { openGame } from '../team.js'

// "Sat, Oct 25 · 7:30 PM" in the viewer's time zone; date only when the time isn't set yet.
function kickoff(game) {
  const d = new Date(game.date)
  const day = d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  if (/TBD|TBA/i.test(game.detail)) return day
  return `${day} · ${d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
}

function TeamRow({ team, sport, game }) {
  const { isFav, toggle } = useFavorites()
  if (!team) return null
  const fav = isFav(sport, team.id)
  const lost = game.state === 'post' && !team.winner
  return (
    <div className={`team-row${lost ? ' lost' : ''}${team.winner ? ' won' : ''}`}>
      <TeamLogo src={team.logo} alt="" size={26} sport={sport} team={team} />
      <div className="team-name">
        {team.rank && <span className="rank">{team.rank}</span>}
        <TeamName sport={sport} team={team} className="name" />
        {team.possession && <span className="poss" title="Possession">●</span>}
        {team.record && <span className="record">{team.record}</span>}
      </div>
      <button
        className={`star${fav ? ' on' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          toggle(sport, team)
        }}
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
  const status = game.state === 'pre' ? 'Upcoming' : game.detail
  return (
    <article
      className={`game game-${game.state} clickable`}
      tabIndex={0}
      aria-label={`${game.away?.name} at ${game.home?.name}: open game details`}
      onClick={() => openGame(game)}
      onKeyDown={(e) => e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openGame(game))}
    >
      <header className="game-head">
        <span className={`status status-${game.state}`}>
          {game.state === 'in' && <span className="live-dot" />}
          {status}
        </span>
        {isCloseGame(game) && <span className="close-badge">Close game</span>}
        {showSport && <span className="sport-tag">{showSport}</span>}
        {game.broadcast && <span className="tv">{game.broadcast}</span>}
      </header>
      <div className="game-when">
        <span>{kickoff(game)}</span>
        <span className="game-more">Details ›</span>
      </div>
      <TeamRow team={game.away} sport={game.sport} game={game} />
      {game.state === 'post' && <div className="game-final">Final</div>}
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
          <a href={game.link} target="_blank" rel="noreferrer" className="more" onClick={(e) => e.stopPropagation()}>
            {game.state === 'pre' ? 'Preview' : game.state === 'in' ? 'Gamecast' : 'Box score'} ↗
          </a>
        )}
      </footer>
    </article>
  )
}
