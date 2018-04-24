// Initializes the `book` service on path `/book`
const createService = require('feathers-sequelize');
const createModel = require('../../models/book.model');
const hooks = require('./book.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'book',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/book', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('book');

  service.hooks(hooks);
};
