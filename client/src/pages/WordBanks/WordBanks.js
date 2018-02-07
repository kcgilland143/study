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
    this.loadWordBanks();
  }

  loadWordBanks = () => {
    API.getWordBanks()
      .then(res =>
        this.setState({ banks: res.data, title: "", tags: ""})
      )
      .catch(err => console.log(err));
  };

  deleteBank = id => {
    API.deleteWordBank(id)
      .then(res => this.loadWordBanks())
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
      .then(res => this.loadWordBanks())
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
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
                    </Link>
                    <br/>
                    <small>
                      {bank.tags}
                    </small>
                    <div className="clearfix">
                      <Link to={"/create/" + bank._id}>
                        <button 
                          className="btn btn-info pull-right" 
                          style={{marginRight:1+'em'}}>
                          <span className="glyphicon glyphicon-pencil" />
                        </button>
                      </Link>
                      <button 
                        className="btn btn-primary pull-right" 
                        onClick={() => this.deleteBank(bank._id)}
                        style={{marginRight:1+'em'}}>
                          <span className="glyphicon glyphicon-trash" />
                      </button>
                    </div>
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
