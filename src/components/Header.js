import React from 'react';
import '../styles/Header.scss';
import CustomModal from './CustomModal';


const Header = () => {
  return (
    // <header className="header">
    //   <div className="org-logo"><img src={process.env.PUBLIC_URL + '/logo-marisa.svg'} alt="Organization logo for MARISA, a Mid-Atlantic RISA team." /></div>

    //   <div id="site-title">Projected Intensity-Duration-Frequency (IDF) Curve Data Tool for the Chesapeake Bay Watershed and Virginia</div>
    //   <nav className="nav">
    //     <CustomModal />
    //   </nav>
    // </header>
    <header className="header">
      <div className="org-logo"><img src={process.env.PUBLIC_URL + '/logo-marisa.svg'} alt="Organization logo for MARISA, a Mid-Atlantic RISA team." /></div>

      <div class="header-right">
        <div id="site-title">Projected Intensity-Duration-Frequency (IDF) Curve Data Tool for the Chesapeake Bay Watershed and Virginia</div>
        <nav className="nav">
          <CustomModal />
        </nav>
      </div>
    </header>
  );
};

export default Header;