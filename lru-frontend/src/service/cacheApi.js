import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getItem = (key) =>
    api.get(`/cache/${key}`)

export const putItem = (key, value) =>
    api.put(`/cache/${key}`, null, { params: { value } })

export const deleteItem = (key) =>
    api.delete(`/cache/${key}`)

export const getState = () =>
    api.get('/cache/state')

export const clearCache = () =>
    api.delete('/cache')