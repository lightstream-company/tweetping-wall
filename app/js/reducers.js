'use strict';

import { events } from './actions';

export function viewportReducer(state = {}, {type, columns}) {
  switch (type) {
    case events.resize: {
      return {columns};
    }
    default: {
      return state;
    }
  }
}

export function streamReducer(state = {name: 'Lightping', keywords: {}, boundingBoxes: {}}, {type, stream}) {
  switch (type) {
    case events.setStream: {
      return Object.assign({}, state, stream);
    }
    default: {
      return state;
    }
  }
}

export function logoReducer(state = 'img/lightping.png', {type, logo}) {
  switch (type) {
    case events.setLogo: {
      return logo || state;
    }
    default: {
      return state;
    }
  }
}
