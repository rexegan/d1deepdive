import { useState } from 'react'

// A school's history (from src/data/schoolHistory.js), one section at a time.
export default function History({ history }) {
  const [section, setSection] = useState(history.sections[0].id)
  const s = history.sections.find((x) => x.id === section) ?? history.sections[0]

  return (
    <div className="history">
      <section className="tc-section">
        <h3 className="hist-school">{history.school}</h3>
        <p className="muted">{history.location}</p>
        <div className="tc-stats">
          {history.facts.map(([label, value]) => (
            <div key={label} className="tc-big">
              <span className="label">{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="hist-sections" role="tablist" aria-label="History sections">
        {history.sections.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === s.id} className={x.id === s.id ? 'on' : ''} onClick={() => setSection(x.id)}>
            {x.title}
          </button>
        ))}
      </div>

      <section className="tc-section hist-body" role="tabpanel">
        <h4>{s.title}</h4>
        {s.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {s.timeline && (
          <>
            <h5 className="tc-sub">Timeline</h5>
            <ol className="hist-timeline">
              {s.timeline.map(([year, text]) => (
                <li key={year + text}>
                  <span className="hist-year">{year}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </>
        )}

        {s.names && (
          <div className="hist-memorial">
            <h5 className="tc-sub">{s.names.title}</h5>
            <ul>
              {s.names.list.map(([name, note]) => (
                <li key={name}>
                  <strong>{name}</strong>
                  {note && <span className="muted"> · {note}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <p className="muted tiny hist-sources">
        Sources:{' '}
        {history.sources.map(([label, url], i) => (
          <span key={url}>
            {i > 0 && ' · '}
            <a href={url} target="_blank" rel="noreferrer">
              {label}
            </a>
          </span>
        ))}
      </p>
    </div>
  )
}
