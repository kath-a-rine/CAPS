'use strict';

// Write unit tests for each event handler function (not event triggers themselves).
//Use spies to help testing your logger methods (assert that console.log was called right).

jest.mock('socket.io-client', () => { //'socket.io-client
  return {
    io:jest.fn(() => {
      return {
        on: jest.fn(),
        emit: jest.fn(),
      };
    },
    ),
  };
});

describe('Events tests', () => {
  test('emits a PICKUP event', () => {

  });
});
