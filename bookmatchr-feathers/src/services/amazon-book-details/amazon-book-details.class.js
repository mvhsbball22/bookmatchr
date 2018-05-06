/* eslint-disable no-unused-vars */
const {OperationHelper} = require('apac');
var ENVIRONMENT = require('../../ENVIRONMENT');

const opHelper = new OperationHelper({
    awsId:     ENVIRONMENT.AWS_ID,
    awsSecret: ENVIRONMENT.AWS_SECRET,
    assocId:   ENVIRONMENT.ASSOCIATE_TAG
  })

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    console.log(params);
    this.book = opHelper.execute('ItemLookup', {
      'IdType': 'ASIN',
      'ItemId': id,
      'ResponseGroup': 'ItemAttributes,EditorialReview,Images'
    })

    return this.book
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
