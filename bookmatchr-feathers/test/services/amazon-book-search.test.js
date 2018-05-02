const assert = require('assert');
const app = require('../../src/app');

describe('\'amazonBookSearch\' service', () => {
  it('registered the service', () => {
    const service = app.service('amazon-book-search');

    assert.ok(service, 'Registered the service');
  });
});
