import { useEffect, useState } from 'react'
import { SPORTS, fetchTeams, sportById } from '../api.js'
import { useData, useFavorites } from '../hooks.js'
import { setEditorOpen, useEditorOpen } from '../team.js'
import { SearchBox, matchesTeam } from './LeagueBar.jsx'
import TeamLogo from './TeamLogo.jsx'
import { ErrorBox, Loading } from './Status.jsx'

function AddTeams({ sport }) {
  const { data, error, loading, refresh } = useData(() => fetchTeams(sport), [sport.id])
  const [query, setQuery] = useState('')
  const { isFav, toggle } = useFavorites()

  if (loading) return <Loading label="Loading teams…" />
  if (error) return <ErrorBox error={error} onRetry={refresh} />
  const results = query.trim() ? data.filter((t) => matchesTeam(t, query)).slice(0, 40) : []

  return (
    <>
      <SearchBox value={query} onChange={setQuery} />
      {query.trim() && !results.length && <p className="muted">No teams match.</p>}
      {!query.trim() && <p className="muted tiny">Type a school name to find it.</p>}
      <ul className="ed-list">
        {results.map((t) => {
          const fav = isFav(sport.id, t.id)
          return (
            <li key={t.id}>
              <TeamLogo src={t.logo} size={22} />
              <span className="ed-name">{t.fullName}</span>
              <button className={`btn ${fav ? '' : 'primary'}`} onClick={() => toggle(sport.id, t)}>
                {fav ? 'Following' : '+ Add'}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default function MyTeamsEditor() {
  const open = useEditorOpen()
  const [sportId, setSportId] = useState(SPORTS[0].id)
  const { list, toggle } = useFavorites()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setEditorOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null
  const close = () => setEditorOpen(false)

  return (
    <div className="tc-overlay" onClick={close}>
      <aside className="tc-panel" role="dialog" aria-modal="true" aria-label="Edit My Teams" onClick={(e) => e.stopPropagation()}>
        <button className="tc-close" onClick={close} aria-label="Close">
          ×
        </button>
        <h2 className="ed-title">Edit My Teams</h2>

        <section className="tc-section">
          <h4>Following ({list.length})</h4>
          {list.length === 0 ? (
            <p className="muted">You aren't following any teams yet. Add some below.</p>
          ) : (
            <ul className="ed-list">
              {list.map((f) => (
                <li key={`${f.sport}:${f.id}`}>
                  <TeamLogo src={f.logo} size={22} />
                  <span className="ed-name">
                    {f.name} <span className="muted">· {sportById(f.sport)?.name}</span>
                  </span>
                  <button className="btn danger" onClick={() => toggle(f.sport, f)} aria-label={`Remove ${f.name}`}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="tc-section">
          <h4>Add a team</h4>
          <div className="seg small ed-sports">
            {SPORTS.map((s) => (
              <button key={s.id} className={s.id === sportId ? 'on' : ''} onClick={() => setSportId(s.id)}>
                {s.short}
              </button>
            ))}
          </div>
          <AddTeams key={sportId} sport={sportById(sportId)} />
        </section>

        <button className="btn ed-done" onClick={close}>
          Done
        </button>
      </aside>
    </div>
  )
}

export function EditTeamsButton() {
  return (
    <button className="btn small-btn" onClick={() => setEditorOpen(true)}>
      Edit
    </button>
  )
}
