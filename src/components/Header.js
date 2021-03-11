import React, { useState, useEffect } from 'react';
import '../styles/Header.scss';
import { Link } from "react-router-dom";

const Header = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    let currPath = window.location.pathname;
    let initLink = document.querySelector(`a[href='${currPath}']`);
    initLink.classList.toggle('active');
    setPage(initLink);
  }, []);

  const handleClick = (event) => {
    event.target.classList.toggle('active');
    page.classList.toggle('active');
    setPage(event.target);
  };

  return (
    <header className="header">
      <div className="org-logo"></div>
      <div className="site-info">
        <div className="site-org">Organization Name</div>
        <div className="site-description">a service of the Some-team-or-another</div>
      </div>
      <nav className="nav">
        <div className="link"><Link onClick={(event)=>handleClick(event)} to="/">Home</Link></div>
        <div className="link"><Link onClick={(event)=>handleClick(event)} to="/ScopeFull">Chesapeake Bay Watershed</Link></div>
        <div className="link"><Link onClick={(event)=>handleClick(event)} to="/ScopeVA">Virginia Only</Link></div>
      </nav>
    </header>
  );
};

export default Header;