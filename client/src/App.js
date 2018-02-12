import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Books from "./pages/Books";
import { Banks, Create } from "./pages/WordBanks"
import Detail from "./pages/Detail";
import { FlashCards, Trivia } from "./pages/Games"
import NoMatch from "./pages/NoMatch";
import Login from "./pages/LoginSignup"
import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      <Nav>
        <li><Link to='/create'>Create</Link></li>
      </Nav>
      <Switch>
        <Route exact path="/" component={Banks} />
        <Route path="/create" component={Create} />
        <Route exact path="/banks" component={Banks} />
        <Route exact path="/banks/:id" component={Detail} />
        <Route exact path="/games/flashcards/:id" component={FlashCards}/>
        <Route exact path="/games/trivia/:id" component={Trivia}/>
        <Route exact path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
