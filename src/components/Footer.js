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
        <p>Blurb about the funding for the project and partnerships with the logos to the left.</p>
        <p>Any kind of legal disclaimers or copyright information that needs to be addressed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar efficitur dolor sit amet tristique. Pellentesque convallis risus ante, ut fermentum ipsum tempor non. Aliquam vehicula erat urna, ut pulvinar quam fermentum nec. Curabitur viverra ipsum ipsum, id pharetra sapien molestie a. Cras efficitur ut magna sed tincidunt. Nunc id bibendum dolor, in ullamcorper libero. Donec lobortis erat ex, ac sodales orci commodo at. Sed sit amet leo ac erat pharetra cursus vitae a felis. Quisque semper nibh ac eleifend tincidunt. Vestibulum vel metus ipsum. </p>
        <p>&#169; XXXX-XXXX Cornell University</p>
      </div>
    </footer>
  );
};

export default Footer;