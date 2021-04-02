import React, { useState, useEffect } from 'react';
import '../styles/Header.scss';
import CustomModal from './CustomModal';
// import { Link } from "react-router-dom";


const Header = () => {
  // const [page, setPage] = useState(null);

  // useEffect(() => {
  //   let currPathArr = window.location.pathname.split('/');

  //   if (currPathArr.includes('map')) {
  //     var currPath = '/map';
  //   } else if (currPathArr.includes('usage')) {
  //     var currPath = '/usage';
  //   } else {
  //     var currPath = '/';
  //   }

  //   let initLink = document.querySelector(`a[href='${currPath}']`);
  //   initLink.classList.toggle('active');
  //   setPage(initLink);
  // }, []);

  // const handleClick = (event) => {
  //   event.target.classList.toggle('active');
  //   page.classList.toggle('active');
  //   setPage(event.target);
  // };

  return (
    <header className="header">
      <div className="org-logo"><img src={process.env.PUBLIC_URL + '/logo-marisa.svg'} alt="Organization logo for MARISA, a Mid-Atlantic RISA team." /></div>
      {/* <div className="site-info">
        <h1 className="site-org">Organization Name</h1>
        <div className="site-description">a service of the Some-team-or-another</div>
      </div> */}
      <div id="site-title">Name of the Tool</div>
      <nav className="nav">
        <CustomModal />
        {/* <div className="link"><Link onClick={(event)=>handleClick(event)} to="/">Home</Link></div>
        <div className="link"><Link onClick={(event)=>handleClick(event)} to="/map">Map</Link></div>
        <div className="link"><Link onClick={(event)=>handleClick(event)} to="/usage">How to Use</Link></div> */}
      </nav>
    </header>
  );
};

export default Header;