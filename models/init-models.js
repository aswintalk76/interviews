var DataTypes = require("sequelize").DataTypes;
var _course = require("./course");

function initModels(sequelize) {
  var course = _course(sequelize, DataTypes);


  return {
    course,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
