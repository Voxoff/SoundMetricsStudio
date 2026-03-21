import { useRef, type KeyboardEvent } from 'react'
import { marked } from 'marked'
import type { ArtistContext } from '../types'
import { useArtistSearch } from '../hooks/useArtistSearch'
import { useAnalysisStream } from '../hooks/useAnalysisStream'
import { ArtistItem } from './ArtistItem'

interface Props {
  onArtistContext: (ctx: ArtistContext) => void
}

export function ArtistPanel({ onArtistContext }: Props) {
  const searchRef = useRef<HTMLInputElement>(null)
  const { results, isLoading, error, search, clear } = useArtistSearch()
  const { analysisText, status, isAnalyzing, analyze } = useAnalysisStream(onArtistContext)

  function doSearch() {
    search(searchRef.current?.value ?? '')
  }

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') doSearch()
  }

  const hasAnalysis = analysisText.length > 0
  const hasResults = results.length > 0

  return (
    <div className="panel" id="artist-panel">
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-title-icon">🎤</span>
          Artist Intelligence
        </div>
        <p className="panel-subtitle">Search Chartmetric · click an artist for a strategic AI analysis</p>
      </div>

      <div id="search-row">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            ref={searchRef}
            type="text"
            id="search-input"
            placeholder="Search artists…"
            onKeyDown={handleSearchKey}
          />
        </div>
        <button className="btn" onClick={doSearch} disabled={isLoading}>
          {isLoading ? 'Searching…' : 'Search'}
        </button>
      </div>

      <div id="artist-results">
        {error && <span className="error-text">Search failed: {error}</span>}
        {!isLoading && hasResults && (
          <div className="results-label">{results.length} result{results.length !== 1 ? 's' : ''}</div>
        )}
        {!isLoading && results.map(a => (
          <ArtistItem key={a.cm_id} artist={a} onClick={(artist) => { clear(); analyze(artist) }} />
        ))}
        {!isLoading && !error && !hasResults && searchRef.current?.value && (
          <span className="dim-text">No results found.</span>
        )}
      </div>

      <div id="status-bar">
        {status && (
          <>
            {isAnalyzing && <div className="spinner" />}
            <span>{status}</span>
          </>
        )}
      </div>

      <div id="analysis-area">
        {!hasAnalysis && (
          <div id="analysis-placeholder">
            <div className="placeholder-icon">🎼</div>
            <div className="placeholder-title">No artist loaded</div>
            <div className="placeholder-sub">
              Search for an artist above and click their card to generate a deep strategic analysis.
            </div>
          </div>
        )}
        {hasAnalysis && (
          <div
            id="analysis-content"
            dangerouslySetInnerHTML={{ __html: marked.parse(analysisText) as string }}
          />
        )}
      </div>
    </div>
  )
}
