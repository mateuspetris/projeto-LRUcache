function cacheVisualizer({ state }) {
    if (!state) {
        return (
            <div className="visualizer-empty">
                <p>cache vazio - faça uma operação para começar</p>
            </div>
        )
    }

    const { items, size, capacity, lastEvicted, lastOperation } = state

    return (
        <div className="visualizer">
            <div className="visualizer-header">
                <span>tamanho: {size}/{capacity}</span>
                <span className={`operation ${lastOperation?.toLowerCase().replace(' ', '-')}`}>
          {lastOperation}
        </span>
                {lastEvicted && (
                    <span className="evicted">evictado: {lastEvicted}</span>
                )}
            </div>

            <div className="visualizer-list">
                {items.length === 0 ? (
                    <p className="empty">cache vazio</p>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={item.key}
                            className={`cache-item ${index === 0 ? 'most-recent' : ''} ${index === items.length - 1 ? 'least-recent' : ''}`}
                        >
                            <span className="position">#{index + 1}</span>
                            <span className="key">{item.key}</span>
                            <span className="separator">→</span>
                            <span className="value">{item.value}</span>
                            {index === 0 && <span className="tag">topo</span>}
                            {index === items.length - 1 && items.length > 1 && (
                                <span className="tag danger">fundo</span>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CacheVisualizer