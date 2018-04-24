const assert = require('assert');
const app = require('../../src/app');

describe('\'book\' service', () => {
  it('registered the service', () => {
    const service = app.service('book');

    assert.ok(service, 'Registered the service');
  });
});
