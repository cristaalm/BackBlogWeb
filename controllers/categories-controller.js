const AsyncHandler = require("express-async-handler");
const Categories = require("../model/categoria");
const db = require("../config/config");

const findAllCategories = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaCategorias = await models.categoria.findAll();

  res.status(200).json({
    description: "Successsfully fetched categories data!",
    data: listaCategorias,
  });
});
const createCategories = AsyncHandler(async (req, res) => {
  if (!req.body.nombre) {
    res.status(400).json({
      description: "Bad request nombre must be filled!",
    });
  }
  if (!req.body.descripcion) {
    res.status(400).json({
      description: "Bad request descripcion must be filled!",
    });
  }
  if (!req.body.imgdestacada) {
    res.status(400).json({
      description: "Bad request imgdestacada must be filled!",
    });
  }
  if (!req.body.color) {
    res.status(400).json({
      description: "Bad request color must be filled!",
    });
  }
  var initModels = require("../model/init-models");
  var models = initModels(db);
  const categories_map = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imgdestacada: req.body.imgdestacada,
    color: req.body.color,
  };
  listaCategorias = await models.categoria.create(categories_map);
  res.status(200).json({
    description: "Successfully saved user data!",
  });
});

const findCategoriesById = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaCategorias = await models.categoria.findByPk(req.params.id);
  // console.log("user: ", user)
  res.status(200).json({
    description: `Successfully fetch by id: ${req.params.id} user data!`,
    data: listaCategorias,
  });
});

const updateCategories = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaCategorias = await models.categoria.update(req.body, {
    where: { id: req.params.id },
  });

  res.status(200).json({
    description: `Successfully updated user data!`,
  });
});

const removeCategories = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaCategorias = await models.categoria.destroy({
    where: { id: req.params.id },
  });
  res.status(200).json({
    description: `Successfully deleted user data!`,
  });
});
module.exports = {
  findAllCategories,
  createCategories,
  findCategoriesById,
  updateCategories,
  removeCategories,
};
