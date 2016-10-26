'use strict';

import createConnection from 'tweetping-connect';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import wallReducer from 'redux-ping/lib/reducers/wall';
import { aggregate, setSize, fetchHistory } from 'redux-ping/lib/actions/wall';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Header from './Header.jsx';
import Wall from './Wall.jsx';
import LastTweet from './LastTweet.jsx';
import {parse as parseQuery} from 'querystring';
import {viewportReducer, streamReducer, logoReducer} from './reducers';
import {resize, setStream} from './actions';

const params = parseQuery(document.location.search.replace('?', ''));
const columns = parseInt(params.columns, 10) || 3;
const lines = parseInt(params.lines, 10) || 3;

const streamId = window.location.hash.replace(/#/g, '');
const hostname = window.location.hostname;
const options = {
  hostname
};

const {connect, info} = createConnection(streamId, options);

const reducers = {
  wall: wallReducer,
  viewport: viewportReducer,
  stream: streamReducer,
  logo: logoReducer
};

const store = createStore(combineReducers(reducers), undefined, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(setSize(columns * lines));
store.dispatch(resize(columns));

setTimeout(() => {
  info()
    .then(stream => {
      store.dispatch(setStream(stream));
    })
    .catch(error => console.log('error while fetching stream', streamId, error));
  store.dispatch(fetchHistory(streamId, options));
});

connect('wall', (post) => {
  store.dispatch(aggregate(post));
}, `wss://${hostname}/`);

ReactDOM.render(<Provider store={store}>
  <div>
    <Header />
    <div id="content">
      <LastTweet />
      <Wall />
    </div>
  </div>
</Provider>, document.getElementById('container'));
