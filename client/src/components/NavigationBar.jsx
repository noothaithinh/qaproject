import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class NavigationBar extends Component {
render() {
  return (
    <div className="header row">
      <div className="col-lg-6">
        <div className="row">
          <div className="col-lg-2 col-md-4">
            <div className="logo">
              <Link to="/">ATV</Link>
            </div>
          </div>

          <div className="col-lg-10 col-md-8 search">
            <input type="text" name="search" className="" placeholder="Search..."/>
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <ul className="nav">

          <li>
            <NavLink exact activeclass="active" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink activeclass="active" to="/login">Login</NavLink>
          </li>
          <li><a href="#">Tags</a></li>
          <li><a href="#">User</a></li>
          <li><a href="#">Home</a></li>
          <li className="split"><span></span></li>
          <li className="inbox"><a href="#"><i className="fa fa-bell" aria-hidden="true"><span className="noti-number">10</span></i> Inbox</a></li>
        </ul>
      </div>
    </div>
  );
}
}

export default NavigationBar;
