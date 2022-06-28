'use strict';

const eventPool = require('../eventPool');

// Write unit tests for each event handler function (not event triggers themselves).
//Use spies to help testing your logger methods (assert that console.log was called right).

jest.mock('../eventPool', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('Events tests', () => {
  test('emits a PICKUP event', () => {

  });
});
