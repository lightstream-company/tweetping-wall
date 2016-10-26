'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {parse} from 'url';
import {extname} from 'path';

const Header = (props) => {
  const stream = props.stream;
  const logo = isAnImage(props.logo) ? props.logo : 'img/lightping.png';

  return <header className="main-header">
    <nav className="navbar navbar-custom" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            <img src={logo} className="navbar-logo" />
            <span className="text-logo">{stream.name}</span>
          </a>
        </div>
      </div>
    </nav>
  </header>;
};

function isAnImage(logo) {
  if (!logo) {
    return false;
  }
  const path = parse(logo);
  const matchImageExtension = /.(png|jpeg|jpg|gif)/g.test(extname(path.pathname).toLowerCase());
  if (!matchImageExtension) {
    console.log('Your logo url is not supported (png, jpeg, gif)');
  }
  return matchImageExtension;
}

Header.propTypes = {
  logo: PropTypes.string,
  stream: PropTypes.object
};

export default connect(({logo, stream}) => {
  return {
    stream,
    logo
  };
})(Header);
