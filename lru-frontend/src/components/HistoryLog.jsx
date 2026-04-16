function HistoryLog({ history }) {
    if (!history || history.length === 0) {
        return (
            <div className="history-empty">
                <p>nenhuma operação realizada ainda</p>
            </div>
        )
    }

    return (
        <div className="history">
            <div className="history-header">
                <span>histórico de operações</span>
                <span className="count">{history.length} operações</span>
            </div>

            <div className="history-list">
                {[...history].reverse().map((entry, index) => (
                    <div key={index} className={`history-item ${entry.type}`}>
                        <span className="history-operation">{entry.operation}</span>
                        <span className="history-detail">{entry.detail}</span>
                        <span className="history-time">{entry.time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HistoryLog