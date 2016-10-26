'use strict';

import uniq from 'lodash/uniq';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {parse} from 'url';
import {extname} from 'path';

const networks = {
  twitter: 'Twitter',
  instagram: 'Instagram',
  facebook: 'Facebook'
};

const Header = (props) => {
  const stream = props.stream;
  const usedNetworks = formatUsedNetworks(stream);
  const keywords = formatKeywords(stream);
  const text = `Check out ${usedNetworks} activity${keywords ? ` on keywords like ${keywords}` : ''}`;
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
        <p className="navbar-text">{text}</p>
      </div>
    </nav>
  </header>;
};

function formatUsedNetworks(stream) {
  return uniq(Object.keys(stream.keywords)
    .concat(Object.keys(stream.boundingBoxes)))
    .map(network => networks[network])
    .join(', ')
    .replace(/, ([^,]*)$/g, ' and $1');
}

function formatKeywords(stream) {
  return Object.keys(stream.keywords)
    .filter(key => stream.keywords[key] && stream.keywords[key].length)
    .map(key => `"${stream.keywords[key][0]}"`)
    .join(' or ');
}

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
