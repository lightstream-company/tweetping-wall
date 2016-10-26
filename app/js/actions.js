'use strict';

export const events = {
  resize: 'RESIZE',
  setStream: 'SET_STREAM',
  setLogo: 'SET_LOGO',
};

export function resize(columns) {
  return {
    type: events.resize,
    columns
  };
}

export function setStream(stream) {
  return {
    type: events.setStream,
    stream
  }
}

export function setLogo(logo) {
  return {
    type: events.setLogo,
    logo
  }
}
