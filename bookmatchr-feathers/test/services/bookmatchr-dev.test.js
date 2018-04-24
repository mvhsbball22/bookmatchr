const assert = require('assert');
const app = require('../../src/app');

describe('\'bookmatchr-dev\' service', () => {
  it('registered the service', () => {
    const service = app.service('bookmatchr-dev');

    assert.ok(service, 'Registered the service');
  });
});
