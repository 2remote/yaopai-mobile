var React = require('react');
import { Router, Route, Link } from 'react-router';

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
        <span className="footerMobile">
          <div>
            <img 
              src="imgs/indexPage/footer-mobile.png"
              srcSet="imgs/indexPage/footer-mobile@2X.png 2x" />
          </div>
          <div>
            15638160405
          </div>
        </span>
        <span className="footerEmail">
          <div>
            <img 
              src="imgs/indexPage/footer-email.png"
              srcSet="imgs/indexPage/footer-email@2X.png 2x" />
          </div>
          <div>
            saili@yaopai.club
          </div>
        </span>
        <span className="footerAddr">
          <div>
            <img 
              src="imgs/indexPage/footer-addr.png"
              srcSet="imgs/indexPage/footer-addr@2X.png 2x" />
          </div>
          <div>
            东风路丰庆路半岛老房子A02
          </div>
        </span>
      </div>
    );
  }
});

module.exports = Footer;