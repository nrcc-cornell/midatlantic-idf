import React from "react";

import "../styles/Header.scss";

import CustomModal from "./CustomModal";

const Header = () => {
  return (
    <header className="header">
      <a href="https://www.midatlanticrisa.org/">
        <div className="marisa-logo"><img src={process.env.PUBLIC_URL + "/logos/logo-marisa.svg"} alt="Organization logo for MARISA, a Mid-Atlantic RISA team" /></div>
      </a>

      <div className="header-center">
        <div id="site-title">Projected Intensity-Duration-Frequency (IDF) Curve Data Tool for the Chesapeake Bay Watershed and Virginia</div>
        <nav className="nav">
          <CustomModal />
        </nav>
      </div>

      <a href="https://www.chesapeakebay.net/">
        <div className="cbp-logo"><img src={process.env.PUBLIC_URL + "/logos/CBPlogo.svg"} alt="Organization logo for Chesapeake Bay Program" /></div>
      </a>
    </header>
  );
};

export default Header;