import { useState } from 'react'
import type { ArtistContext } from './types'
import { ChatPanel } from './components/ChatPanel'
import { ArtistPanel } from './components/ArtistPanel'
import logo from './assets/logo.png'

export default function App() {
  const [artistContext, setArtistContext] = useState<ArtistContext | null>(null)

  return (
    <div id="app-shell">
      <nav id="nav-bar">
        <div className="nav-logo">
          <img src={logo} alt="SoundMetrics Studio" className="nav-logo-img" />
          <span className="nav-tagline">AI-powered music analytics</span>
        </div>
      </nav>
      <div id="app-grid">
        <ArtistPanel onArtistContext={setArtistContext} />
        <ChatPanel artistContext={artistContext} onClearContext={() => setArtistContext(null)} />
      </div>
    </div>
  )
}
