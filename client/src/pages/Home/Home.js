import React from "react";
import Jumbotron from "../../components/Jumbotron";
import PageHeader from "../../components/PageHeader";
import {Link} from "react-router-dom";
import { Col, Row} from "../../components/Grid";

const Home = () =>
  <div>
    <Jumbotron>
      <h1>LetzQuiz</h1>
    </Jumbotron>
    <Row>
      <Col size = 'sm-5 xs-6' offset = 'sm-1'>
        <Link to = '/create' className = 'home-links-item'>
          <div className = 'home-links-item'>
            <h3>Create</h3>
            <p>make a new word bank</p>
          </div>
        </Link>
      </Col>
      <Col size= 'sm-5 xs-6'>
        <Link to = '/banks' className = 'home-links-item'>
          <div className = 'home-links-item'>
            <h3>Banks</h3>
            <p>view the word banks</p>
          </div>
        </Link>
      </Col>
    </Row>
    <Row>
      <div className = 'home-description'>
        <PageHeader>
          <h1>Letz Quiz is an app that ....</h1>
        </PageHeader>
        <p>Something here that talks about what this thing does</p>
    </div>
    </Row>
  </div>;

export default Home;
