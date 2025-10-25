import React, { useEffect, useRef } from 'react'
import { mountConstellation } from './lib/constellation.js'

function Logo() {
  return (
    <img className="logo" src="/logo.svg" alt="co-frame logo" width="88" height="88" />
  )
}

export default function App() {
  const canvasRef = useRef(null)
  useEffect(() => {
    if (!canvasRef.current) return
    const dispose = mountConstellation(canvasRef.current, {
      particleCount: 90,
      lineDistance: 120,
      speed: 0.25
    })
    return () => dispose?.()
  }, [])

  return (
    <div className="page">
      <canvas ref={canvasRef} className="bg-constellation" aria-hidden="true" />

      <header className="hero glass">
        <Logo />
        <h1 className="title">co-frame</h1>
        <p className="tag">Context Framework • Template • Project</p>
        <p className="desc">LLM‑ready design + dev governance for consistent apps.</p>
        <div className="cta">
          <a className="btn btn-lg mellange" href="https://chatter-painter-59e.notion.site/Co-Frame-2916391f0f4580889e55f1082b90bc63?pvs=74" target="_blank" rel="noreferrer" aria-label="Co-Frame Notion">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z" fill="currentColor" opacity="0.12"/><path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h6v2H7z" fill="currentColor"/></svg>
            </span>
            Co‑Frame
          </a>
          <a className="btn btn-lg" href="https://github.com/Mr-Ahuja/Agent-Context" target="_blank" rel="noreferrer" aria-label="Repository on GitHub">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.87 1.25 1.87 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.3 1.23a11.46 11.46 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.85.12 3.15.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z"/></svg>
            </span>
            Repository
          </a>
          <a className="btn btn-lg" href="../../README.md" target="_blank" rel="noreferrer" aria-label="How to use">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 4h9a3 3 0 0 1 3 3v13l-3-2-3 2-3-2-3 2V7a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v12.06l1.6-1.06a2 2 0 0 1 2.2 0L12 19.12l3.2-2.12a2 2 0 0 1 2.2 0l.6.4V7a1 1 0 0 0-1-1H6z"/></svg>
            </span>
            How to use
          </a>
        </div>
      </header>

      <main className="content">
        <section className="panel card">
          <h2>Why CoFrame?</h2>
          <ul>
            <li>Rulebook clarity (Semantics) without prescribing tools.</li>
            <li>Menus of allowed choices (Templates) mapped to behaviors.</li>
            <li>Concrete, reviewable decisions (Implementations) with commands and params.</li>
          </ul>
        </section>
      </main>

      <footer className="site-footer">CURLs by The Chosen One - <a href="https://preetam.thechosenone.in/" target="_blank" rel="noopener">Preetam Ahuja</a></footer>
    </div>
  )
}
