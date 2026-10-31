import { SPORTS, sportById } from './api.js'
import { buildHash, useRoute } from './hooks.js'
import Home from './components/Home.jsx'
import Scoreboard from './components/Scoreboard.jsx'
import Rankings from './components/Rankings.jsx'
import Standings from './components/Standings.jsx'
import TeamCard from './components/TeamCard.jsx'
import GameDetail from './components/GameDetail.jsx'
import Leaders from './components/Leaders.jsx'
import NationalStats from './components/NationalStats.jsx'
import MyTeamsEditor from './components/MyTeamsEditor.jsx'
import CloseGameAlerts from './components/CloseGameAlerts.jsx'

const VIEWS = [
  { id: 'scores', label: 'Scores' },
  { id: 'rankings', label: 'Rankings', over: 'National' },
  { id: 'standings', label: 'Standings', over: 'Conference' },
  { id: 'leaders', label: 'Leaders', over: 'League' },
  { id: 'stats', label: 'Stats', over: 'National' },
]

export default function App() {
  const route = useRoute()
  const sport = sportById(route.sport)
  const view = VIEWS.some((v) => v.id === route.view) ? route.view : 'scores'

  return (
    <div className="app">
      <header className="top">
        <a href="#/" className="brand">
          <span className="brand-mark">D1</span>
          <span className="brand-name">Deep Dive</span>
        </a>
        <nav className="sports" aria-label="Sports">
          <a href="#/" className={!sport ? 'on' : ''}>
            Home
          </a>
          {SPORTS.map((s) => (
            <a key={s.id} href={buildHash(s.id, view)} className={sport?.id === s.id ? 'on' : ''}>
              <span className="icon">{s.icon}</span>
              <span className="full">{s.name}</span>
              <span className="abbr">{s.short}</span>
            </a>
          ))}
        </nav>
      </header>

      <CloseGameAlerts />

      <main>
        {!sport ? (
          <Home />
        ) : (
          <>
            <div className="page-head">
              <h1>
                {sport.icon} {sport.name}
              </h1>
              <nav className="tabs" aria-label="Views">
                {VIEWS.map((v) => (
                  <a key={v.id} href={buildHash(sport.id, v.id, { g: route.params.g })} className={v.id === view ? 'on' : ''}>
                    {v.over ? (
                      <span className="two-line">
                        <small>{v.over}</small>
                        {v.label}
                      </span>
                    ) : (
                      v.label
                    )}
                  </a>
                ))}
              </nav>
            </div>
            {view === 'scores' && <Scoreboard key={sport.id} sport={sport} params={route.params} />}
            {view === 'rankings' && <Rankings key={sport.id} sport={sport} params={route.params} />}
            {view === 'standings' && <Standings key={sport.id} sport={sport} params={route.params} />}
            {view === 'leaders' && <Leaders key={sport.id} sport={sport} params={route.params} />}
            {view === 'stats' && <NationalStats key={sport.id} sport={sport} params={route.params} />}
          </>
        )}
      </main>

      <GameDetail />
      <TeamCard />
      <MyTeamsEditor />

      <footer className="foot">
        Data from ESPN's public scoreboard feeds. Followed teams are saved in this browser.
      </footer>
    </div>
  )
}
