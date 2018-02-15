import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import {ListItem, List} from "../../components/List"
import PageHeader from "../../components/PageHeader";
import API from "../../utils/API";
import randomize from "../../utils/randomize"

const button = {marginBottom:16}

class WordScramble extends Component {
  
  state = {
    unseen:[],
    seen:[],
    current: { word:"", definition:""},
    side:0,
    flipped:0,

    tags: [],
    words: [],
    date: "",
    description: "",
    title: "",
    _id: this.props.match.params.id

  };

  componentDidMount() {
    this.loadWordBank(this.state._id)
    .then(() => {
      this.resetGame();
    })
  }

  loadWordBank(id) {
    return API.getWordBank(id)
      .then(res =>{
        this.setState(res.data)
        console.log(JSON.stringify(res.data, null ,2));
      })
      .catch(err => console.log(err));
  }

  resetGame = (event) => {

    let nextState = {...this.state}
    const words = nextState.words

    nextState.unseen = randomize.shuffle(words)
    nextState.current = nextState.unseen.pop()
    nextState.seen = []
    nextState.side = 0
    nextState.flipped = 0

    this.setState(nextState)
  }

  next = (event) => {
    const state = this.state
    let current = state.current
    let seen = [...state.seen]
    let unseen = [...state.unseen]
    
    seen.push(current)
    
    if (unseen.length) {
      current = unseen.pop()
    }
    
    const nextState = { 
      ...state,
      current: current,
      unseen: unseen,
      seen: seen,
      side: 0,
      flipped: 0
    }
    // console.log(nextState)
    this.setState(nextState)
  }

  flip = (event) => {
    let nextState = {...this.state}
    let side = nextState.side
    nextState.side = side ? 0 : 1
    nextState.flipped = 1
    this.setState(nextState)
  }

  renderDescription() {
    if (this.state.description) {
      return (
        <span style={{fontSize: 16}}>
          Description: {this.state.description}
        </span>
      )
    }
  }


  scrambleFunction(word) {
    	let newScramble = word.split('');
      
    var j, x, i;
    for (i = newScramble.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = newScramble[i];
        newScramble[i] = newScramble[j];
        newScramble[j] = x;
    }


      return newScramble.join("");
    
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <PageHeader>
              <h1>
                Word Scramble
              </h1>
              <h2>Word Bank: {this.state.title}</h2>
              <h4>Tags:&nbsp;&nbsp;<small>{this.state.tags}</small></h4>
              <h4>Date created:&nbsp;&nbsp;<small>{this.state.date}</small></h4>
              {this.state.description &&
                <h3>Description:&nbsp;&nbsp;<small>{this.state.description}</small></h3>
              }
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col size="sm-10">
            
            <div style={{marginBottom: 16}}>
              <span className="text-success">
                Seen:<span className="badge">{this.state.seen.length | ""}</span>
              </span>
              <span className="text-info"  style={{marginLeft:12}}>
                Unseen:<span className="badge">{this.state.unseen.length | ""}</span>
              </span>
            </div>
            
            <div 
              className="panel panel-default flashcard" 
              style={{
                paddingTop: 100,
                paddingBottom: 100,
                height: 300,
                textAlign:"center"
              }}
            >
              { !this.state.side ?
                
                <h2>{this.scrambleFunction(this.state.current.word)}</h2> :
                <h3>{this.state.current.word}</h3>
              }
            </div>

          </Col>
          <Col size="sm-2">
            

            <div style={{padding: 8}}>

              <button 
                className="btn btn-info"
                style={button}
                onClick={this.flip}>Unscramble
              </button>
              <button 
                className="btn btn-success"
                style={button}
                disabled={!this.state.flipped || this.state.unseen.length === 0}
                onClick={this.next}>Next
              </button>
              <button 
                className="btn btn-danger"
                style={button}
                onClick={this.resetGame}>Restart
              </button>

            </div>
          </Col>
        </Row>
        <Row>
          <Col size="sm-3">
            <Link to={"/banks/" + this.state._id}>← Back to Word Bank</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default WordScramble;
