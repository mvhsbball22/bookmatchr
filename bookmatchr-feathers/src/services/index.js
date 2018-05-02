const bookmatchrDev = require('./bookmatchr-dev/bookmatchr-dev.service.js');
const book = require('./book/book.service.js');
const amazonBookSearch = require('./amazon-book-search/amazon-book-search.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(bookmatchrDev);
  app.configure(book);
  app.configure(amazonBookSearch);
};
