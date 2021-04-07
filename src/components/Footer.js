import React from "react";

import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div id="footer-content">
        <div className="footer-logos-left">
          
          <a id="footer-left-cmu" href="https://www.cmu.edu/">
            <div id="cmu-cont"><img id="cmu" src={process.env.PUBLIC_URL + "/logos/cmu.svg"} alt="Organization logo for Carnegie Mellon University" /></div>
          </a>
          <a id="footer-left-rand" href="https://www.rand.org/">
            <div id="rand-cont"><img id="rand" src={process.env.PUBLIC_URL + "/logos/rand.svg"} alt="Organization logo for the RAND Corporation" /></div>
          </a>
          <a id="footer-left-epa" href="https://www.epa.gov/">
            <div id="epa-cont"><img id="epa" src={process.env.PUBLIC_URL + "/logos/epa.png"} alt="United States Environmental Protection Agency logo" /></div>
          </a>
        </div>
        <div className="footer-text">
          <p>This project was carried out by researchers at <a href="https://www.cmu.edu/">Carnegie Mellon University (CMU)</a>, the <a href="https://www.nrcc.cornell.edu/">Northeast Regional Climate Center (NRCC)</a> at Cornell University and the <a href="https://www.rand.org/">RAND Corporation (RAND)</a>. The project team members from RAND and NRCC are also a part of the <a href="https://www.midatlanticrisa.org/">Mid-Atlantic Regional Integrated Sciences and Assessments (MARISA) Program</a>.</p>
          <p>The project was funded by the <a href="https://cbtrust.org/">Chesapeake Bay Trust</a> and in partnership with the U.S. Environmental Protection Agency under the <a href="https://www.chesapeakebay.net/">Chesapeake Bay Program</a>’s Goal Implementation Team. NRCC and CMU also received funding from the <a href="http://vtrc.virginiadot.org/">Virginia Transportation Research Council (VTRC)</a> and the <a href="https://www.floodingresiliency.org/">Commonwealth Center for Recurrent Flooding Resiliency (CCRFR)</a> to extend the study boundaries to include the full state of Virginia.</p>
        </div>
        <div className="footer-logos-right">
          <a id="footer-right-cbt" href="https://cbtrust.org/">
            <div id="cbt-cont"><img id="cbt" src={process.env.PUBLIC_URL + "/logos/cbt.png"} alt="Organization logo for the Chesapeake Bay Trust" /></div>
          </a>
          <a id="footer-right-vtrc" href="http://vtrc.virginiadot.org/">
            <div id="vtrc-cont"><img id="vtrc" src={process.env.PUBLIC_URL + "/logos/vtrc.png"} alt="Organization logo for the Virginia Transportation Research Council" /></div>
          </a>
          <a id="footer-right-ccrfr" href="https://www.floodingresiliency.org/">
            <div id="ccrfr-cont"><img id="ccrfr" src={process.env.PUBLIC_URL + "/logos/ccrfr.png"} alt="Organization logo for the Commonwealth Center for Recurrent Flooding Resiliency" /></div>
          </a>
          <a id="footer-right-nrcc" href="https://www.nrcc.cornell.edu/">
            <div id="nrcc-cont"><img id="nrcc" src={process.env.PUBLIC_URL + "/logos/nrcc.svg"} alt="Organization logo for the Northeast Regional Climate Center" /></div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;