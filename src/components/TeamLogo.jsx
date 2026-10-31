import { openTeam } from '../team.js'

// A team logo. Given a sport and team, it opens that team's card when clicked.
export default function TeamLogo({ src, alt = '', size = 28, sport, team }) {
  const img = src ? (
    <img
      className="logo"
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
    />
  ) : (
    <span className="logo logo-empty" style={{ width: size, height: size }} />
  )
  if (!sport || !team?.id) return img
  return (
    <button
      type="button"
      className="logo-link"
      aria-label={`Open ${team.name ?? team.fullName ?? 'team'}`}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        openTeam(sport, { ...team, logo: team.logo ?? src })
      }}
    >
      {img}
    </button>
  )
}
