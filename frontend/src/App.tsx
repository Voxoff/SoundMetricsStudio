import { useState } from 'react'
import type { ArtistContext } from './types'
import { ChatPanel } from './components/ChatPanel'
import { ArtistPanel } from './components/ArtistPanel'

export default function App() {
  const [artistContext, setArtistContext] = useState<ArtistContext | null>(null)

  return (
    <div id="app-shell">
      <nav id="nav-bar">
        <div className="nav-logo">
          <div className="nav-logo-icon">🎵</div>
          <span className="nav-wordmark">SoundMetrics</span>
          <span className="nav-tagline">AI-powered music analytics</span>
        </div>
      </nav>
      <div id="app-grid">
        <ChatPanel artistContext={artistContext} onClearContext={() => setArtistContext(null)} />
        <ArtistPanel onArtistContext={setArtistContext} />
      </div>
    </div>
  )
}
