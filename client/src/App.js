import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import { Banks, Create } from "./pages/WordBanks"
import Detail from "./pages/Detail";
import { FlashCards, Trivia, WordScramble } from "./pages/Games"
import NoMatch from "./pages/NoMatch";
import Login from "./pages/LoginSignup"
import Nav from "./components/Nav";
import './app.css';
import Auth from "./utils/Auth"
import styles from './app.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LogoutRoute = ({component: Component, ...rest }) => {
  Auth.removeToken();
  return <Redirect to="/" state={{isAuthenticated: Auth.isAuthenticated()}}/>
}


const App = () =>
  <Router>
    <div>
      <Nav>
        <li><Link to='/create'>Create</Link></li>
        <li><Link to='/banks'>Banks</Link></li>
      </Nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/create" component={Create} />
        <Route exact path="/banks" component={Banks} />
        <Route exact path="/banks/:id" component={Detail} />
        <Route exact path="/games/flashcards/:id" component={FlashCards}/>
        <Route exact path="/games/trivia/:id" component={Trivia}/>
        <Route exact path="/games/wordscramble/:id" component={WordScramble}/>
        <Route exact path="/login" component={Login} />
        <LogoutRoute />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
