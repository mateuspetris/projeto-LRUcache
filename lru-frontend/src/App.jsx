import { useState, useEffect } from 'react'
import { getState } from './service/cacheApi'
import ControlPanel from './components/ControlPanel'
import CacheVisualizer from './components/CacheVisualizer'
import HistoryLog from './components/HistoryLog'

function App() {
  const [cacheState, setCacheState] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    getState().then(res => setCacheState(res.data))
  }, [])

  const handleStateChange = (newState) => {
    setCacheState(newState)

    const entry = {
      operation: newState.lastOperation,
      detail: newState.lastEvicted
          ? `evictado: ${newState.lastEvicted}`
          : `tamanho: ${newState.size}/${newState.capacity}`,
      type: newState.lastOperation === 'GET HIT' ? 'hit'
          : newState.lastOperation === 'GET MISS' ? 'miss'
              : newState.lastEvicted ? 'eviction'
                  : 'default',
      time: new Date().toLocaleTimeString()
    }

    setHistory(prev => [...prev, entry])
  }

  return (
      <div className="app">
        <h1>LRU Cache — visualizador</h1>
        <div className="layout">
          <div className="left">
            <ControlPanel onStateChange={handleStateChange} />
            <CacheVisualizer state={cacheState} />
          </div>
          <div className="right">
            <HistoryLog history={history} />
          </div>
        </div>
      </div>
  )
}

export default App