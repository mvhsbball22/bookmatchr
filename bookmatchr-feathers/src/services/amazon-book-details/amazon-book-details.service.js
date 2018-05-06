// Initializes the `amazon-book-details` service on path `/amazon-book-details`
const createService = require('./amazon-book-details.class.js');
const hooks = require('./amazon-book-details.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'amazon-book-details',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/amazon-book-details', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('amazon-book-details');

  service.hooks(hooks);
};
