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


  renderScramble() {
    if (this.state.current.word) {
    	//let newScramble = {this.state.current.word.split('').sort()};
      return (
        <span style={{fontSize: 16}}>
          {/* Scramble: {newScramble}*/}
			Split: {this.state.current.word.split('')}
        </span>
      )
    }
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
              <h2 className="text-info">
                Word Bank: <small>{this.state.title}</small>
              </h2>
              <h3>
                Tag: <small>{this.state.tags.join(", ")}</small>
              </h3>
              {this.renderDescription()}
              <span style={{fontSize: 16}}>
              <p></p>
                Date created: {this.state.date}
              </span>              

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
                
                <h2>{this.state.current.word.split('').sort()}</h2> :
                <p>{this.state.current.word}</p>
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
