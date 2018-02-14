import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import PageHeader from "../../components/PageHeader";
import Spinner from "../../components/Spinner"
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Auth from "../../utils/Auth"

class WordBanks extends Component {
  state = {
    title: "",
    tags: "",
    description: "",
    words: [],
    
    word:"",
    definition:"",
    wordId: "",

    spinning: false,
    saving: false,
  }

  loadWordBank = () => {
    const loc = window.location.href.split('/')
    const path = loc.indexOf('create')
    const bankId = loc[path + 1]
    if (bankId) {
      API.getWordBank(bankId)
        .then(bank => {
          bank.data.tags = bank.data.tags.join(" ")
          this.setState(bank.data)
          console.log(this.state)
        })
        .catch(err => console.log(err))
    }
  }

  lookUpWord = () => {
    this.setState({spinning: true})
    let nextState = {
      spinning: false
    }
    API.dictionaryLookup(this.state.word)
      .then(res => {
        if (typeof res.data === 'string') {
          nextState.definition = res.data
        }
        this.setState(nextState)
      })
      .catch(err => {
        console.log(err)
        this.setState(nextState)
      })
  }

  submitBank = () => {
    this.setState({saving: true})
    if (this.state.title && this.state.tags && (this.state.words.length > 0)) {
      API.saveWordBank({
        id: this.state._id,
        title: this.state.title,
        tags: this.state.tags.split(),
        words: this.state.words.map(word => word._id),
        description: this.state.description
      })
      .then(res => {
        console.log(res)
        if (!this.state._id) {
          this.props.history.push('/create/' + res.data._id)
        }
        this.setState({saving:false})
        this.loadWordBank()
      })
      .catch(err => this.setState({saving:false, err}));
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  addWord = () => {
    const {wordId, word, definition} = this.state
    this.setState({wordId: "", word: "", definition: ""})
    return API.saveWord({
      id: wordId,
      word: word,
      definition: definition
    })
    .then(res => {
      const words = [...this.state.words, res.data]
      this.setState({
        words: words,
      }, () => {
        if (this.state._id) { this.submitBank() }
      })
    })
    .catch(err => console.log(err));
  }

  editWord = (id) => {
    let word = this.state.words.find((word) => word._id === id)
    let words = this.state.words.filter((word) => word._id !== id)
    this.setState({
      words: words,
      word: word.word,
      wordId: id,
      definition: word.definition
    })
  }

  deleteWordFromBank = (id) => {
    let words = this.state.words.filter((word) => word._id !== id)
    this.setState({words: words}, () => {
      if (this.state._id) { this.submitBank() }
    })
  }


  handleFormSubmit = event => {
    event.preventDefault();
    this.submitBank()
  };

  handleWordFormSubmit = event => {
    event.preventDefault();
    if (this.state.word && this.state.definition) {
      this.addWord()
    }
  };

  componentDidMount() {
    this.loadWordBank()
    this.setState({user:Auth.getToken()})
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <PageHeader>
            <h1>Create a Word Bank!</h1>
          </PageHeader>
          <Col size="md-4">
            <form className="clearfix">
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Collection Title (required)"
              />
              <Input
                value={this.state.tags}
                onChange={this.handleInputChange}
                name="tags"
                placeholder="Tags (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                rows = "3"
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.tags && (this.state.words.length > 0))}
                onClick={this.handleFormSubmit}
              >
                Submit Bank
              </FormBtn>
            </form>
            {this.state.saving ? <Spinner/> : ""}
          </Col>
          <Col size="md-8">
            <h3>Add Words!</h3>
            <form>
              <div className="input-group" style={{marginBottom: 16}}>
                <Input
                  value={this.state.word}
                  onChange={this.handleInputChange}
                  name="word"
                  placeholder="Word (required)"
                />
                <span className="input-group-btn">
                  <button 
                    className="btn btn-default" 
                    type="button"
                    onClick={this.lookUpWord}>
                    Search
                  </button>
                </span>
              </div>
              <Input
                value={this.state.definition}
                onChange={this.handleInputChange}
                name="definition"
                placeholder="Definition (required)"
              />
              <FormBtn
                disabled={!(this.state.word && this.state.definition)}
                onClick={this.handleWordFormSubmit}
              >
              Add Word
              </FormBtn>
            </form>
            <List>
              {this.state.words.map(word => (
                <ListItem key={word._id} className="clearfix">
                  <strong>{word.word}: </strong>
                  <span>{word.definition}</span>
                  <button 
                    className="btn btn-info pull-right" 
                    style={{marginRight:1+'em', marginTop: 0.5+"em", marginBottom: 0.5+"em"}}
                    onClick={() => this.editWord(word._id)}
                    disabled={this.state.wordId}>
                    <span className="glyphicon glyphicon-pencil" />
                  </button>
                  <button 
                    className="btn btn-primary pull-right" 
                    onClick={() => this.deleteWordFromBank(word._id)}
                    style={{marginRight:1+'em', marginTop: 0.5+"em", marginBottom: 0.5+"em"}}>
                      <span className="glyphicon glyphicon-trash" />
                  </button>
                </ListItem>
                )
              )}
            </List>
            <br />
            {this.state.spinning ? <Spinner/> : ""}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WordBanks;
