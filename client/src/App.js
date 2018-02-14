import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
//import Books from "./pages/Books";
import { Banks, Create } from "./pages/WordBanks"
import Detail from "./pages/Detail";
<<<<<<< HEAD
import { FlashCards, Trivia, Hangman, WordScramble } from "./pages/Games"
=======
import { FlashCards, Trivia, WordScramble } from "./pages/Games" 
>>>>>>> 8370bba36cd18f7b15c87932f5931c739cc243d0
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import styles from './app.css';

const App = () =>
  <Router>
    <div>
      <Nav>
        <li><Link to='/create'>Create</Link></li>
        <li><Link to='/banks'>Banks</Link></li>
      </Nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/create" component={Create} />
        <Route exact path="/banks" component={Banks} />
        <Route exact path="/banks/:id" component={Detail} />
        <Route exact path="/games/flashcards/:id" component={FlashCards}/>
        <Route exact path="/games/hangman/:id" component={Hangman}/>
        <Route exact path="/games/wordscramble/:id" component={WordScramble}/>
        <Route exact path="/games/trivia/:id" component={Trivia}/>
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
