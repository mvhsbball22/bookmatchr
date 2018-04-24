const bookmatchrDev = require('./bookmatchr-dev/bookmatchr-dev.service.js');
const book = require('./book/book.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(bookmatchrDev);
  app.configure(book);
};
