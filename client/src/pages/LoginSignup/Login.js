import React, { Component } from 'react'
import { Col, Row, Container } from "../../components/Grid"
import Auth from '../../utils/Auth'

const btnStyle = {margin: 1 + 'em'}
const inpStyle = {...btnStyle, marginTop: 0.5 + 'em'}

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
    console.log('here', this.props)
    const redirectTo = "/"
    try {
      const redirectTo = this.props.location.state.from.pathname
    } catch(err) {}
    this.setState({
      isAuthenticated: Auth.isAuthenticated(),
      user: Auth.getToken(),
      from: redirectTo
    })
  }

  handleFormInput = (event) => {
    const {name, value} = event.target
    this.setState({[name]:value})
  }

  Login = (event) => {
    if (event) {
      event.preventDefault()
    }
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
        }, () => {
          if (this.state.isAuthenticated) { 
            this.props.history.push(this.state.from)
          } else { this.props.history.push('/')}
        })
      })
      .catch(err => console.log(err))
  }

signUp = (event) => {
  event.preventDefault()
  const {username, password} = this.state
  Auth.signUp({username, password})
    .then((res) => {
      console.log(res.data)
      if (res.data !== 'idk bro') { this.Login() }
    })
}

  render (props) {
    return (
      <Container>
        <Row>
          <Col size="md-6" offset="md-3">
            <form>
              <label for="username">Username: </label>
              <br />
              <input 
                type="text" 
                name="username"
                onChange={this.handleFormInput} 
                value={this.state.username}
                style={inpStyle}/>
              <br />
              <label for="Password">Password: </label>
              <br/>
              <input 
                type="password" 
                name="password"
                onChange={this.handleFormInput} 
                value={this.state.password}
                style={inpStyle}/>
              <br />
              <button 
                className="btn btn-primary" 
                onClick={this.Login}
                style={btnStyle}>Login</button>
              <button 
                className="btn btn-info" 
                onClick={this.signUp}
                style={btnStyle}>Signup</button>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Login