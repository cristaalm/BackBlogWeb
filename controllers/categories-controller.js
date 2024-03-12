
const AsyncHandler = require("express-async-handler");
const Categories = require("../model/categoria");
const db = require("../config/config");

const findAllCategories = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaCategorias = await models.categoria.findAll();

  res.status(200).json({
    description: "Successsfully fetched users data!",
    data: listaCategorias,
  });
});

module.exports = {
  findAllCategories
};
