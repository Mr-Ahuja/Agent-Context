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
          <a className="btn primary" href="../../coframe/semantics.base.json" target="_blank" rel="noreferrer">Semantics</a>
          <a className="btn secondary" href="../../templates/spa.the-choosen-one.cft.json" target="_blank" rel="noreferrer">Template</a>
          <a className="btn ghost" href="../../implementations/the-choosen-one.cfi.json" target="_blank" rel="noreferrer">Implementation</a>
        </div>
      </header>

      <main className="content">
        <section className="panel glass">
          <h2>Why CoFrame?</h2>
          <ul>
            <li>Rulebook clarity (Semantics) without prescribing tools.</li>
            <li>Menus of allowed choices (Templates) mapped to behaviors.</li>
            <li>Concrete, reviewable decisions (Implementations) with commands and params.</li>
          </ul>
        </section>
      </main>

      <footer className="foot">
        <div className="foot-inner">
          <div className="foot-brand">
            <img className="foot-logo" src="/logo.svg" alt="co-frame" width="28" height="28" />
            <span>co-frame</span>
          </div>
          <nav className="foot-nav">
            <a href="../../coframe/semantics.base.json" target="_blank" rel="noreferrer">Semantics</a>
            <a href="../../templates/spa.the-choosen-one.cft.json" target="_blank" rel="noreferrer">Template</a>
            <a href="../../implementations/the-choosen-one.cfi.json" target="_blank" rel="noreferrer">Implementation</a>
          </nav>
          <div className="foot-copy">
            © {new Date().getFullYear()} co-frame • All rights reserved
          </div>
        </div>
      </footer>
    </div>
  )
}
