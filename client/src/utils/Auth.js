import axios from "axios";
import decode from "jwt-decode"

const Auth = {
  signUp(data) {
    return axios.post('/auth/signup', data)
  },
  login(data) {
    return axios.post('/auth/login', data)
  },
  getToken() {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['authorization'] = token
      return decode(token)
    } else {
      axios.defaults.headers.common['authorization'] = ""
      return ""
    }
  },
  setToken(token) {
    return localStorage.setItem('token', token)
  },
  removeToken() {
    return localStorage.removeItem('token')
  },
  isAuthenticated() {
    return Boolean(this.getToken())
  }
}

export default Auth