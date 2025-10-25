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
          <a className="btn btn-lg primary" href="../../templates/spa.the-choosen-one.cft.json" target="_blank" rel="noreferrer">Use the Template</a>
          <a className="btn btn-lg outline" href="../../implementations/the-choosen-one.cfi.json" target="_blank" rel="noreferrer">View Implementation</a>
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

      <footer className="site-footer">CURLs by The Chosen One - <a href="https://preetam.thechosenone.in/" target="_blank" rel="noopener">Preetam Ahuja</a></footer>
    </div>
  )
}
