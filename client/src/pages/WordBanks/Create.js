import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Spinner from "../../components/Spinner"
import API from "../../utils/API";
import { browserHistory } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class WordBanks extends Component {
  state = {
    title: "",
    tags: "",
    description: "",
    word:"",
    definition:"",
    words: [],
    spinning: false
  };


  loadWordBank = () => {
    const loc = window.location.href.split('/')
    const path = loc.indexOf('create')
    const bank = loc[path + 1]
    if (bank) {
      API.getWordBank(bank)
        .then(bank => {
          bank.data.tags = bank.data.tags.join(" ")
          this.setState(bank.data)
          console.log(this.state)
        })
        .catch(err => console.log(err))
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  lookUpWord = () => {
    this.setState({spinning: true})
    API.dictionaryLookup(this.state.word)
      .then(res => {
        if (typeof res.data === 'string') {
          this.setState({
            definition: res.data,
            spinning: false
          })
        }
      })
      .catch(err => console.log(err))
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log('here')
    if (this.state.title && this.state.tags && (this.state.words.length > 0)) {
      API.saveWordBank({
        title: this.state.title,
        tags: this.state.tags.split(),
        words: this.state.words.map(word => word._id),
        description: this.state.description
      })
      .then(res => {
        this.props.history.push('/create/' + res.data._id)
        this.loadWordBank()
      })
      .catch(err => console.log(err));
    }
  };

  handleWordFormSubmit = event => {
    event.preventDefault();
    if (this.state.word && this.state.definition) {
      const {word, definition} = this.state
      this.setState({word: "", definition: ""})
      API.saveWord({
        word: this.state.word,
        definition: this.state.definition
      })
      .then(res => {
        this.state.words.push(res.data)
        this.setState({
          words: this.state.words,
        })
      })
      .catch(err => console.log(err));
    }
  };

  componentDidMount() {
    this.loadWordBank()
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Jumbotron>
            <h1>Create a Word Bank!</h1>
          </Jumbotron>
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
          </Col>
          <Col size="md-8">
            <h3>Add Words!</h3>
            <List>
              {this.state.words.map(word => (
                <ListItem key={word._id}>
                  <strong>{word.word}: </strong>
                  <span>{word.definition}</span>
                </ListItem>
                )
              )}
            </List>
            <br />
            {this.state.spinning ? <Spinner/> : ""}
            <form>
              <div class="input-group" style={{marginBottom: 16}}>
                <Input
                  value={this.state.word}
                  onChange={this.handleInputChange}
                  name="word"
                  placeholder="Word (required)"
                />
                <span class="input-group-btn">
                  <button 
                    class="btn btn-default" 
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WordBanks;
