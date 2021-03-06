import React from "react";
import Auth from "../../utils/Auth"
import {Link} from "react-router-dom"

const Nav = (props) =>
  <nav className = "navbar navbar-inverse navbar-top">
    <div className = "container-fluid">
      <div className = "navbar-header">
        <button 
          type = "button" 
          className="collapsed navbar-toggle"
          data-toggle="collapse"
          data-target="#nav-collapsed">
          <span className = "sr-only">Toggle navigation</span>
          <span className = "icon-bar" /> <span className="icon-bar" />
          <span className = "icon-bar" />
        </button>
        <a href = "/" id = 'navbar-brand' className = "navbar-brand">
          lq
        </a>
      </div>
      <div className="collapse navbar-collapse" id="nav-collapsed">
        <ul className="nav navbar-nav navbar-right">
          {Auth.isAuthenticated() ?
            <li><Link to='/logout'>Logout</Link></li> :
            <li><Link to='/login'>Login</Link></li>
          }
          {props.children}
        </ul>
      </div>
    </div>
  </nav>;

export default Nav;
