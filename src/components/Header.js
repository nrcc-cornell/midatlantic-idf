import React from 'react';
import '../styles/Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="org-logo"></div>
      <div className="site-info">
        <div className="site-org">Organization Name</div>
        <div className="site-description">a service of the Some-team-or-another</div>
      </div>
      <nav className="nav">
        <div className="link1">Link 1</div>
        <div className="link2">Link 2</div>
        <div className="link3">Link 3</div>
      </nav>
    </header>
  );
};

export default Header;