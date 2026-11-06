import { useEffect, useState } from 'react'
import { conferenceOf, fetchConferenceMap, sportById } from '../api.js'

// Conference maps, shared by every tag on the page once loaded.
const loaded = new Map()

export function useConferenceMap(sportId) {
  const [map, setMap] = useState(() => loaded.get(sportId) ?? null)
  useEffect(() => {
    if (loaded.has(sportId)) return setMap(loaded.get(sportId))
    const sport = sportById(sportId)
    if (!sport) return
    let live = true
    fetchConferenceMap(sport)
      .then((m) => {
        if (m.byId.size) loaded.set(sportId, m)
        if (live) setMap(m)
      })
      .catch(() => {})
    return () => {
      live = false
    }
  }, [sportId])
  return map
}

// A small "SEC" / "Big 12" tag beside a team name in lists.
export default function ConfTag({ sport, team, className = '' }) {
  const id = typeof sport === 'string' ? sport : sport?.id
  const map = useConferenceMap(id)
  const conf = conferenceOf(map, team)
  if (!conf) return null
  return (
    <span className={`conf-tag ${className}`} title={`${conf} conference`}>
      {conf}
    </span>
  )
}
