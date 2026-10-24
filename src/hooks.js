import { useCallback, useEffect, useRef, useState } from 'react'

// ---------- routing: #/<sport>/<view>?k=v ----------

function parseHash() {
  const [path, query = ''] = window.location.hash.replace(/^#\/?/, '').split('?')
  const [sport = '', view = ''] = path.split('/')
  return { sport, view, params: Object.fromEntries(new URLSearchParams(query)) }
}

export function buildHash(sport, view, params = {}) {
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v != null && v !== ''))
  const q = new URLSearchParams(clean).toString()
  return `#/${[sport, view].filter(Boolean).join('/')}${q ? `?${q}` : ''}`
}

export function useRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

// ---------- data loading with optional live polling ----------

export function useData(load, deps, { pollMs = 30_000, shouldPoll } = {}) {
  const [state, setState] = useState({ data: null, error: null, loading: true, updated: null })
  const loadRef = useRef(load)
  loadRef.current = load

  const run = useCallback(async (fresh) => {
    try {
      const data = await loadRef.current({ fresh })
      setState({ data, error: null, loading: false, updated: new Date() })
    } catch (error) {
      setState((s) => ({ ...s, error, loading: false }))
    }
  }, [])

  useEffect(() => {
    setState({ data: null, error: null, loading: true, updated: null })
    run(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  const polling = !!(state.data && shouldPoll?.(state.data))
  useEffect(() => {
    if (!polling) return
    const id = setInterval(() => {
      if (!document.hidden) run(true)
    }, pollMs)
    return () => clearInterval(id)
  }, [polling, pollMs, run])

  const retry = () => {
    setState((s) => ({ ...s, error: null, loading: !s.data }))
    run(true)
  }

  return { ...state, polling, refresh: retry }
}

// ---------- favorite teams, kept in this browser ----------

const FAV_KEY = 'd1dd:favorites'

function readFavs() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) ?? {}
  } catch {
    return {}
  }
}

const listeners = new Set()
let favs = readFavs()

export function useFavorites() {
  const [, force] = useState(0)
  useEffect(() => {
    const fn = () => force((n) => n + 1)
    listeners.add(fn)
    return () => listeners.delete(fn)
  }, [])

  const save = (next) => {
    favs = next
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(next))
    } catch {
      // storage blocked; favorites last for this visit only
    }
    listeners.forEach((fn) => fn())
  }

  const toggle = useCallback((sport, team) => {
    const key = `${sport}:${team.id}`
    const next = { ...favs }
    if (next[key]) delete next[key]
    else next[key] = { sport, id: team.id, name: team.name, logo: team.logo }
    save(next)
  }, [])

  // Conferences share the store under a 'conf:' prefix.
  const toggleConf = useCallback((sport, league) => {
    const key = `conf:${sport}:${league.id}`
    const next = { ...favs }
    if (next[key]) delete next[key]
    else next[key] = { kind: 'conf', sport, id: league.id, label: league.label }
    save(next)
  }, [])

  const isFav = useCallback((sport, id) => !!favs[`${sport}:${id}`], [])
  const isConfFav = useCallback((sport, id) => !!favs[`conf:${sport}:${id}`], [])
  const all = Object.values(favs)
  return {
    favorites: favs,
    list: all.filter((f) => f.kind !== 'conf'),
    conferences: all.filter((f) => f.kind === 'conf'),
    isFav,
    toggle,
    isConfFav,
    toggleConf,
  }
}
