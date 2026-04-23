import { useState } from "react"
import { getItem, putItem, deleteItem, clearCache, getState} from "../service/cacheApi.js"

function ControlPanel({onStateChange}) {
    const [key, setKey] = useState('')
    const [value, setValue] = useState ('')

    const handleGet = async () => {
        if (!key) return
        const res = await getItem(key)
        const state = await getState()

        const stateWithOperation = {
            ...state.data,
            lastOperation: res.data.lastOperation
        }

        onStateChange(stateWithOperation)
    }

    const handlePut = async () => {
        if (!key || !value) return
        const res = await putItem(key, value)
        onStateChange(res.data)
        setValue('')
    }

    const handleDelete = async () => {
        if (!key) return
        const res = await deleteItem(key)
        if (res.data.lastOperation === 'DELETE') {
            onStateChange(res.data)
        }
    }

    const handleClear = async () => {
        const res = await clearCache()
        onStateChange(res.data)
        setKey('')
        setValue('')
    }

    return (
        <div className="control-panel">
            <input
                type="text"
                placeholder="key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />
            <input
                type="text"
                placeholder="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className="buttons">
                <button onClick={handleGet} disabled={!key}>GET</button>
                <button onClick={handlePut} disabled={!key || !value}>PUT</button>
                <button onClick={handleDelete} disabled={!key}>DELETE</button>
                <button onClick={handleClear}>CLEAR</button>
            </div>
        </div>
    )
}
export default ControlPanel