import React from 'react';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logos">
        <div className="org-logo"></div>
        <div className="big-red">C</div>
      </div>
      <div className="footer-text">
        <p>This project was carried out by researchers at <a href="https://www.cmu.edu/">Carnegie Mellon University (CMU)</a>, the <a href="https://www.nrcc.cornell.edu/">Northeast Regional Climate Center (NRCC)</a> at Cornell University and the <a href="https://www.rand.org/">RAND Corporation (RAND)</a>. The project team members from RAND and NRCC are also a part of the <a href="https://www.midatlanticrisa.org/">Mid-Atlantic Regional Integrated Sciences and Assessments (MARISA) Program</a>.</p>
        <p>The project was funded by the <a href="https://cbtrust.org/">Chesapeake Bay Trust</a> and in partnership with the U.S. Environmental Protection Agency under the <a href="https://www.chesapeakebay.net/">Chesapeake Bay Program</a>’s Goal Implementation Team. NRCC and CMU also received funding from the <a href="http://vtrc.virginiadot.org/">Virginia Transportation Research Council (VTRC)</a> and the <a href="https://www.floodingresiliency.org/">Commonwealth Center for Recurrent Flooding Resiliency (CCRFR)</a> to extend the study boundaries to include the full state of Virginia.</p>
      </div>
    </footer>
  );
};

export default Footer;