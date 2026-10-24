import { useEffect, useState } from 'react'

// Which team card is open, shared app-wide so any team name can open it.
let current = null
const listeners = new Set()

export function openTeam(sport, team) {
  if (!team?.id) return
  current = { sport, id: String(team.id), name: team.name ?? team.fullName, logo: team.logo }
  listeners.forEach((fn) => fn(current))
}

export function closeTeam() {
  current = null
  listeners.forEach((fn) => fn(current))
}

export function useOpenTeam() {
  const [team, setTeam] = useState(current)
  useEffect(() => {
    listeners.add(setTeam)
    return () => listeners.delete(setTeam)
  }, [])
  return team
}
