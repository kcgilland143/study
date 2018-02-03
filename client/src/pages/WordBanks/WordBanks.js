import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class WordBanks extends Component {
  state = {
    banks: [],
    title: "",
    tags: "",
    description: "",
    words: []
  };

  componentDidMount() {
    this.loadBanks();
  }

  loadBanks = () => {
    API.getWordBanks()
      .then(res =>
        this.setState({ banks: res.data, title: "", tags: ""})
      )
      .catch(err => console.log(err));
  };

  deleteBank = id => {
    API.deleteBank(id)
      .then(res => this.loadBanks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.tags) {
      API.saveWordBank({
        title: this.state.title,
        tags: this.state.tags,
        description: this.state.description
      })
      .then(res => this.loadBanks())
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Banks would you like to play with?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
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
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.tags)}
                onClick={this.handleFormSubmit}
              >
                Submit Bank
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Available Banks</h1>
            </Jumbotron>
            {this.state.banks.length ? (
              <List>
                {this.state.banks.map(bank => (
                  <ListItem key={bank._id}>
                    <Link to={"/books/" + bank._id}>
                      <strong>
                        {bank.title}
                      </strong>
                      <br/>
                      <small>
                        {bank.tags}
                      </small>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBank(bank._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WordBanks;
