import React, { Component } from 'react'
import { Col, Row, Container } from "../../components/Grid"
import Auth from '../../utils/Auth'

class Login extends Component {
  constructor() {
    super()
    const initialState = {
      isAuthenticated: false,
      token: "",
      username: "",
      password: ""
    }
    this.state = initialState
  }

  componentDidMount() {
    this.setState({
      isAuthenticated: Auth.isAuthenticated(),
      user: Auth.getToken()
    })
  }

  handleFormInput = (event) => {
    const {name, value} = event.target
    this.setState({[name]:value})
  }

  Login = (event) => {
    event.preventDefault()
    const {username, password} = this.state
    Auth.login({username, password})
      .then((res) => {
        console.log(res.data)
        const {err, token} = res.data
        if (!err) {
          Auth.setToken(res.data.token)
        } else {
          Auth.removeToken()
        }
        this.setState({
          ...res.data, 
          isAuthenticated:Auth.isAuthenticated(),
          user: Auth.getToken()
        })
      })
  }

  render (props) {
    return (
      <Container>
        <Row>
          <Col size="md-6" offset="md-3">
          <form>
            <input 
              type="text" 
              name="username"
              onChange={this.handleFormInput} 
              value={this.state.username}/>
            <input 
              type="password" 
              name="password"
              onChange={this.handleFormInput} 
              value={this.state.password}/>
            <button className="btn btn-primary" onClick={this.Login}>Login</button>
          </form>
            {Object.keys(this.state).map(key => {
                return <div key={key}>{key}:{JSON.stringify(this.state[key])}</div>
              })
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Login