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

      <section className="hero">
        <div className="card">
          <img className="logo" src="/logo.svg" alt="Co-Frame logo" />
          <h1 className="title">Co-Frame</h1>
          <p className="lead"><strong>Context Framework • Template • Project</strong></p>
          <p className="sublead">LLM‑ready design + dev governance for consistent apps.</p>
          <div className="cta">
            <a className="btn mellange" href="https://preetamahuja.notion.site/CoFrame-Agent-Context-A-Repository-Local-Governance-Framework-Research-Overview-682a733ead8d4363873d236cc9fe510a" target="_blank" rel="noopener" aria-label="Co-Frame">
              <span className="material-icons" aria-hidden="true">category</span>
              <span>Co‑Frame</span>
            </a>
            <a className="btn" href="https://github.com/Mr-Ahuja/Agent-Context" target="_blank" rel="noopener" aria-label="Repository">
              <span className="material-icons-outlined" aria-hidden="true">code</span>
              <span>Repository</span>
            </a>
            <a className="btn" href="../../README.md" target="_blank" rel="noopener" aria-label="How to use">
              <span className="material-icons-outlined" aria-hidden="true">description</span>
              <span>How to use</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">Co-Frame by The Chosen One <a href="https://preetam.thechosenone.in/" target="_blank" rel="noopener">Preetam Ahuja</a></footer>
    </div>
  )
}
