import axios from '../../../axios'

export async function getProfile () {
    return await axios.get('/profile')
}

export async function updateProfile ({ sUserName }) {
    return await axios.put('/profile/update', { sUserName })
}

export async function logoutProfile () {
    return await axios.post('/profile/logout')
}
