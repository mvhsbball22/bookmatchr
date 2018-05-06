const assert = require('assert');
const app = require('../../src/app');

describe('\'amazon-book-details\' service', () => {
  it('registered the service', () => {
    const service = app.service('amazon-book-details');

    assert.ok(service, 'Registered the service');
  });
});
