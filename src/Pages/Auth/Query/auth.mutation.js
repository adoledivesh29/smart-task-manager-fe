import axios from '../../../axios'

export async function doLogin ({ sEmail, sPassword }) {
  return await axios.post('/auth/login', {
    sEmail,
    sPassword
  })
}

export async function doRegister ({ sUserName, sEmail, sPassword }) {
  return await axios.post('/auth/register', {
    sUserName,
    sEmail,
    sPassword
  })
}

export async function checkToken (token) {
  return await axios.post('/auth/token', { sVerifyToken: token })
}

export async function doResetPassword ({ sNewPassword, token }) {
  return await axios.post('/auth/password/reset', {
    sPassword: sNewPassword,
  }, {
    headers: {
      'verification': token
    }
  })
}
