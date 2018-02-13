import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";

const Home = () =>
    <div>
        <Jumbotron>
          <h1>LetzQuiz</h1>
        </Jumbotron>
        <div className="row">
          <div className="col-md-6">
            <h3>Create</h3>
            <p>make a new word bank</p>
          </div>
          <div className="col-md-6">
            <h3>Banks</h3>
            <p>view the word banks</p>
          </div>
        </div>
      </div>;

export default Home;
