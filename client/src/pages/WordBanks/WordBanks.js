import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import PageHeader from "../../components/PageHeader";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Auth from "../../utils/Auth"

class WordBanks extends Component {
  state = {
    banks: [],
    filtered: [],
    title: "",
    tags: "",
    description: "",
    author: "",

    search: "",
    isAuthenticated: false,
    user: {_id:"", username:""}
  };

  componentDidMount() {
    this.loadWordBanks();
    this.addUserToState();
  }

  loadWordBanks = () => {
    API.getWordBanks()
      .then(res =>
        this.setState({ banks: res.data, title: "", tags: ""})
      )
      .catch(err => console.log(err));
  };

  filteredItems = () => {
    let {banks, search} = this.state
    banks = banks.filter((bank) => {
      if (!search) { return true}
      if (bank.tags.some((tag) => tag.includes(search))) {
        return true
      }
      if (bank.title.toLowerCase().includes(search)) {
        return true
      }
      return false
    })
    return banks
  }

  deleteBank = id => {
    API.deleteWordBank(id)
      .then(res => this.loadWordBanks())
      .catch(err => console.log(err));
  };

  addUserToState = () => {
    this.setState({user: Auth.getToken()})
  }

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
          <Col size="sm-6 md-4" offset="sm-6 md-8">
            <input 
              className="form-control"
              type="text"
              value={this.state.search}
              onChange={this.handleInputChange}
              name="search"
              placeholder="Search Word Banks"
            />
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <PageHeader>
              <h1>Available Banks</h1>
            </PageHeader>
            {this.state.banks.length ? (
              <List>
                {this.filteredItems().map(bank => (
                  <ListItem key={bank._id}>
                    <Link to={"/banks/" + bank._id}>
                      <strong>
                        {bank.title}
                      </strong>
                    </Link>
                    <br/>
                    {Auth.isAuthenticated() && this.state.user.username === bank.author &&
                      <div>
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
                    }
                    <small>
                      {bank.tags.join(", ")}
                    </small>
                    <p>
                      by: {bank.author}
                    </p>
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
