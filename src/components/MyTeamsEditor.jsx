import { useEffect, useState } from 'react'
import { SPORTS, conferencesOf, fetchTeams, sportById } from '../api.js'
import { useData, useFavorites } from '../hooks.js'
import { setEditorOpen, useEditorOpen } from '../team.js'
import { SearchBox, matchesTeam } from './LeagueBar.jsx'
import TeamLogo from './TeamLogo.jsx'
import TeamName from './TeamName.jsx'
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
              <TeamLogo src={t.logo} size={22} sport={sport.id} team={t} />
              <span className="ed-name">
                <TeamName sport={sport.id} team={t}>{t.fullName ?? t.name}</TeamName> <span className="muted">· {t.conference}</span>
              </span>
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
  const { list, toggle, conferences, toggleConf, isConfFav } = useFavorites()
  const [confSport, setConfSport] = useState(SPORTS[0].id)
  const [confPick, setConfPick] = useState('')

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
        <h2 className="ed-title">Edit My Teams &amp; Conferences</h2>

        <section className="tc-section">
          <h4>Teams ({list.length})</h4>
          {list.length === 0 ? (
            <p className="muted">You aren't following any teams yet. Add some below.</p>
          ) : (
            <ul className="ed-list">
              {list.map((f) => (
                <li key={`${f.sport}:${f.id}`}>
                  <TeamLogo src={f.logo} size={22} sport={f.sport} team={f} />
                  <span className="ed-name">
                    <TeamName sport={f.sport} team={f} /> <span className="muted">· {sportById(f.sport)?.name}</span>
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

        <section className="tc-section">
          <h4>Conferences ({conferences.length})</h4>
          {conferences.length > 0 && (
            <ul className="ed-list">
              {conferences.map((c) => (
                <li key={`${c.sport}:${c.id}`}>
                  <span className="ed-name">
                    {c.label} <span className="muted">· {sportById(c.sport)?.name}</span>
                  </span>
                  <button className="btn danger" onClick={() => toggleConf(c.sport, c)} aria-label={`Remove ${c.label}`}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="seg small ed-sports">
            {SPORTS.map((s) => (
              <button
                key={s.id}
                className={s.id === confSport ? 'on' : ''}
                onClick={() => {
                  setConfSport(s.id)
                  setConfPick('')
                }}
              >
                {s.short}
              </button>
            ))}
          </div>
          <div className="ed-add-conf">
            <select aria-label="Conference" value={confPick} onChange={(e) => setConfPick(e.target.value)}>
              <option value="">Pick a conference…</option>
              {conferencesOf(sportById(confSport)).map((l) => (
                <option key={l.id} value={l.id} disabled={isConfFav(confSport, l.id)}>
                  {l.label}
                  {isConfFav(confSport, l.id) ? ' (following)' : ''}
                </option>
              ))}
            </select>
            <button
              className="btn primary"
              disabled={!confPick}
              onClick={() => {
                const l = conferencesOf(sportById(confSport)).find((x) => x.id === confPick)
                if (l && !isConfFav(confSport, l.id)) toggleConf(confSport, l)
                setConfPick('')
              }}
            >
              + Add
            </button>
          </div>
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
