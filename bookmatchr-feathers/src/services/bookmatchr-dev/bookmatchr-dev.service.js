// Initializes the `bookmatchr-dev` service on path `/bookmatchr-dev`
const createService = require('feathers-sequelize');
const createModel = require('../../models/bookmatchr-dev.model');
const hooks = require('./bookmatchr-dev.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'bookmatchr-dev',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bookmatchr-dev', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bookmatchr-dev');

  service.hooks(hooks);
};
