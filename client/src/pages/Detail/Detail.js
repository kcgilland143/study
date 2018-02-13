import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import PageHeader from "../../components/PageHeader";
import {ListItem, List} from "../../components/List"
import API from "../../utils/API";

class Detail extends Component {
  state = {
    words: [],
    tags: [],
    _id: this.props.match.params.id
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getWordBank(this.state._id)
      .then(res =>{
       this.setState(res.data)
        console.log(res.data);
     })
      .catch(err => console.log(err));
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
                Word Bank: {this.state.title}
              </h1>
              <h2>
                Tags: <small>{this.state.tags.join(", ")}</small>
              </h2>
              {this.renderDescription()}
              <h3>
                Date created: {this.state.date}
              </h3>
            </PageHeader>
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <span>Play a Game: </span>
            <Link to={"/games/flashcards/" + this.state._id}>
              <button className="btn btn-primary">Flash Cards</button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col size="md-10 md-offset-1">
            <article style={{marginBottom:16}}>
              <h3>
                Words in bank:
              </h3>

              <List>
                  {this.state.words.map(word => {return (
                    <ListItem key={word._id}>
                      <h4>{word.word}</h4>
                      <p>{word.definition}</p>
                    </ListItem>
                    )}
                  )}
              </List>

            </article>
          </Col>
        </Row>

        <Row>
          <Col size="md-3">
            <Link to="/">← Back to Word Banks</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
