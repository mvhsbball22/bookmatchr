/* eslint-disable no-unused-vars */

const {OperationHelper} = require('apac');
var ENVIRONMENT = require('../../ENVIRONMENT');

const opHelper = new OperationHelper({
  awsId:     ENVIRONMENT.AWS_ID,
  awsSecret: ENVIRONMENT.AWS_SECRET,
  assocId:   ENVIRONMENT.ASSOCIATE_TAG
});

let returnBook = [];

class Service {
  constructor (options) {
    this.options = options || {};
    this.book = [];
  }

  async find (params) {
    console.log(params);
    this.book = opHelper.execute('ItemSearch', {
      'SearchIndex': 'Books',
      'Keywords': params.query.search,
      'ItemPage': params.query.page,
      'ResponseGroup': 'ItemAttributes,EditorialReview,Images'
    });

    return this.book;
  }

  async get (id, params) {
    
    this.book = opHelper.execute('ItemSearch', {
      'SearchIndex': 'Books',
      'Keywords': 'harry potter',
      'ResponseGroup': 'ItemAttributes'
    });

    /*
    opHelper.execute('ItemSearch', {
      'SearchIndex': 'Books',
      'Keywords': 'harry potter',
      'ResponseGroup': 'ItemAttributes,Offers'
    }).then((response) => {
      returnBook = JSON.stringify(response.result);
      return({
        returnBook: `${returnBook}`
      });//console.log(returnBook);
      //console.log("Results object: ", JSON.stringify(response.result));
      //console.log("Raw response body: ", response.responseBody);
    }).catch((err) => {
      console.error("Something went wrong! ", err);
    });
    */

    return this.book, id, params;
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return await Promise.all(data.map(current => this.create(current)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
