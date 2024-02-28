var DataTypes = require("sequelize").DataTypes;
var _categoria = require("./categoria");
var _comentario = require("./comentario");
var _entrada = require("./entrada");
var _users = require("./users");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var categoria = _categoria(sequelize, DataTypes);
  var comentario = _comentario(sequelize, DataTypes);
  var entrada = _entrada(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);


  return {
    categoria,
    comentario,
    entrada,
    users,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
