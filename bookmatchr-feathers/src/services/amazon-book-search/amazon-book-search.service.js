// Initializes the `amazonBookSearch` service on path `/amazon-book-search`
const createService = require('./amazon-book-search.class.js');
const hooks = require('./amazon-book-search.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'amazon-book-search',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/amazon-book-search', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('amazon-book-search');

  service.hooks(hooks);
};
