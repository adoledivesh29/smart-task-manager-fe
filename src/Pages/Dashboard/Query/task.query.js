import axios from '../../../axios'

export async function getTasks () {
    return await axios.get('/tasks')
}

export async function getTasksMetadata () {
    return await axios.get('/tasks/metadata')
}

export async function createTask (data) {
    return await axios.post('/tasks', data)
}

export async function toggleTask (id) {
    return await axios.post(`/tasks/${ id }/toggle`)
}

export async function deleteTask (id) {
    return await axios.delete(`/tasks/${ id }`)
}
