// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const book = sequelizeClient.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    isbn10: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isbn13: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publishedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    doorwaysScore: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    }    
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  book.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return book;
};
