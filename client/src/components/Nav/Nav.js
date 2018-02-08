import React from "react";

const Nav = (props) =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
          Study.io
        </a>
      </div>
      <ul className="nav navbar-nav navbar-right">
        {props.children}
      </ul>
    </div>
  </nav>;

export default Nav;
