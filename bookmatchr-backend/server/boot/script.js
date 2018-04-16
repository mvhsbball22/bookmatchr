/**
module.exports = function(app) {
  var db = app.dataSources.mongoBooks;

  // Instance JSON document
  var user = {
    "_id": {
      "$oid": "5ad27706386e5279430fbb7b"
    },
    "gender": "male",
    "name": {
      "title": "mr",
      "first": "elias",
      "last": "pollari"
    },
    "location": {
      "street": "6740 korkeavuorenkatu",
      "city": "oripää",
      "state": "southern savonia",
      "postcode": 76289
    },
    "email": "elias.pollari@example.com",
    "login": {
      "username": "bigkoala587",
      "password": "koolaid",
      "salt": "6HCCMpEb",
      "md5": "dab95e2f0345488b084899562506baee",
      "sha1": "e72aa9cd4242a58caf2012b1257be2c63cca8bc9",
      "sha256": "ce49f10635ae8095f3bf112403ac7c55a5a37a82b4d1e6b9576c6fa6030109ed"
    },
    "dob": "1957-08-16 05:47:36",
    "registered": "2014-12-31 17:19:36",
    "phone": "05-882-948",
    "cell": "044-191-00-30",
    "id": {
      "name": "HETU",
      "value": "1257-649A"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/21.jpg",
      "medium": "https://randomuser.me/api/portraits/med/men/21.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/21.jpg"
    },
    "nat": "FI"
  };

  // Create a model from the user instance
  var User = db.buildModelFromInstance('User', user, {idInjection: true});

  // Use the model for create, retrieve, update, and delete
  var obj = new User(user);

  console.log(obj.toObject());

  User.create(user, function (err, u1) {
    console.log('Created: ', u1.toObject());
    User.findById(u1.id, function (err, u2) {
      console.log('Found: ', u2.toObject());
    });
  });
};
**/