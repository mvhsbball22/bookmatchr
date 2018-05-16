

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      // check whether the book already exists in the database before adding one
      async function(context) {
        const isbn10 = context.data.isbn10;
        const bookExists = await context.app.service('book').find({
          query: {isbn10: isbn10}
        });
        
        if (bookExists.total !== 0) {
          bookExists.data[0].exists = true;
          context.result = bookExists;      
        }
      }
    ],
    update: [],
    patch: [
      function(context){
        console.log('In pre-patch hook, context is: ' + JSON.stringify(context));
      }
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function(context) {
        if (context.result.data && context.result.data[0] && context.result.data[0].exists === true) {
          return context;
        }
        else if (context.result) {
          //console.log('in the else if statement, context.result is: ' + JSON.stringify(context.result));
          context.result.exists = false;
          //console.log('in the else if statement, after setting result.context, context.result is: ' + JSON.stringify(context.result));
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
