import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import {ListItem, unwrappedList as List} from "../../components/List"
import PageHeader from "../../components/PageHeader";
import API from "../../utils/API";
import randomize from "../../utils/randomize"

class Trivia extends Component {
  
  state = {
    playing: false,

    unseen:[],
    seen:[],
    current: { word:"", definition:""},

    options: [],

    currentCorrect: 0,
    selected: -1,
    answer:-1,


    answered:0,
    correct:0,
    incorrect:0,

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

    nextState.answer = -1
    nextState.answered = 0
    nextState.correct = 0
    nextState.incorrect = 0
    nextState.options = []

    this.setState(nextState, () => this.next())
  }

  startGame = () => {
    this.resetGame()
    this.setState({playing: true})
  }

  next = (event) => {
    const state = this.state
    let current = state.current
    let seen = [...state.seen]
    let unseen = [...state.unseen]
    
    
    if (unseen.length) {
      seen.push(current)
      current = unseen.pop()

      let {options, answer} = this.getOptions(current)
      
      const nextState = { 
        ...state,
        current: current,
        unseen: unseen,
        seen: seen,
        options: options,
        answer: answer,
        selected: -1,
        currentCorrect: 0
      }
      // console.log(nextState)
      this.setState(nextState, () => console.log(this.state))
    } else this.setState({playing: false})
  }

  getOptions = (current) => {
    const {words} = this.state
    const possibleOptions = words.filter(word => word.word !== current.word)
    const length = possibleOptions.length
    let options = []


    options = randomize.uniqueRandomIndexes(length, 3).map(i => possibleOptions[i])
    options.push(current)

    randomize.shuffle(options)

    const answer = options.findIndex(word => word.word === current.word)

    return {options, answer}
  }

  select = (optIndex) => {
    if (this.state.selected !== -1) return;
    let nextState = {...this.state}
    nextState.selected = optIndex
    nextState.answered++
    this.setState(nextState, () => this.checkAnswer())
  }

  checkAnswer = () => {
    let nextState = {...this.state}
    const {selected, answer} = this.state
    if (selected === answer) { 
      nextState.currentCorrect = 1
      nextState.correct++ 
    } else {
      nextState.currentCorrect = -1
      nextState.incorrect++
    }
    this.setState(nextState, () => setTimeout(this.next, 2000))
  }

  selectSuccessFail(index) {
    const {selected, currentCorrect} = this.state
    const lgi = "list-group-item-"
    console.log(index, selected)
    if (index === selected) {
      switch (currentCorrect) {
        case 1: return lgi + "success"
        case -1: return lgi + "danger"
        default: return lgi + "info"
      }
    } else return ""
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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <PageHeader>
              <h1>
                Flash Cards
              </h1>
              <h2 className="text-info">
                Word Bank: <small>{this.state.title}</small>
              </h2>
              <h3>
                Tag: <small>{this.state.tags.join(", ")}</small>
              </h3>
              {this.renderDescription()}
              <span style={{fontSize: 16}}>
                Date created: {this.state.date}
              </span>              

            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col size="sm-10">
            
            <div style={{marginBottom: 16}}>
              <span className="text-info">
                Answered:<span className="badge">{this.state.answered}</span>
              </span>
              <span className="text-info"  style={{marginLeft:12}}>
                Correct:<span className="badge">{this.state.correct}</span>
              </span>
              <span className="text-info"  style={{marginLeft:12}}>
                incorrect:<span className="badge">{this.state.incorrect}</span>
              </span>
            </div>

              <div 
                className="panel panel-default trivia-container" 
                style={{
                  paddingTop: 16,
                  paddingBottom: 16,
                  textAlign:"center"
                }}
              >
              {this.state.playing ? [
                  <h3>{this.state.current.definition}</h3>,
                  <div className="trivia-options" style={{minHeight:200, maxHeight:400}}>
                    <List>
                    {this.state.options.map((opt, i) => 
                      <div key={i}
                        onClick={() => this.select(i)}>
                        <ListItem className={this.selectSuccessFail(i)}>
                          {opt.word}
                        </ListItem> 
                      </div>
                    )}
                    </List>
                  </div>
              ]:
                <button 
                  className="btn btn-primary"
                  onClick={this.startGame}>Start</button>
              }
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

export default Trivia;
