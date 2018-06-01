import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { DropdownButton, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

import BrandLogo from './BrandLogo';

const Header = (menuItem) => { 
  const menus = _.map(menuItem, menues => _.map(menues, (menu, i) => {
    const subMenu = _.map(menu.submenu, (submenu, k) => {
      const link = _.toLower(_.join(_.split(submenu, ' '), '-'));
      return (<li key={k}><NavLink activeClassName="selected" to={link}>{submenu}</NavLink></li>);
    })
    return (
      <li className="nav-item" key={i}>
        <DropdownButton bsStyle="link" title={menu.title} id={`menuItem-${i}`} className="nav-link">
          {subMenu}
        </DropdownButton>
      </li>
    )
  }));
  return (
  <header>
    <nav className="navbar navbar-toggleable-md navbar-default justify-content-between">
      <Link to="/" className="navbar-brand"><BrandLogo size="header" /></Link>
      <div className="navbar-logo-title">Syntel's Backend-as-a-Service</div>
    </nav>
    <nav className="navbar navbar-toggleable-md navbar-primary justify-content-between">  
        <div className="navbar-main">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><NavLink exact to="/" className="nav-link" activeClassName="selected">Home</NavLink></li>
            {menus}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
