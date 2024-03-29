const AsyncHandler = require("express-async-handler");
const Entradas = require("../model/entrada");
const db = require("../config/config");

const findAllEntradas = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaEntradas = await models.entrada.findAll();

  res.status(200).json({
    description: "Successsfully fetched entradas data!",
    data: listaEntradas,
  });
});
const createEntradas = AsyncHandler(async (req, res) => {
  if (!req.body.titulo) {
    res.status(400).json({
      description: "Bad request titulo must be filled!",
    });
  }
  if (!req.body.contenido) {
    res.status(400).json({
      description: "Bad request contenido must be filled!",
    });
  }
  if (!req.body.idcategoria) {
    res.status(400).json({
      description: "Bad request idcategoria must be filled!",
    });
  }
  if (!req.body.imgdestacada) {
    res.status(400).json({
      description: "Bad request imgdestacada must be filled!",
    });
  }
  if (!req.body.imgdestacada) {
    res.status(400).json({
      description: "Bad request imgdestacada must be filled!",
    });
  }
  if (!req.body.fechapublicacion) {
    res.status(400).json({
      description: "Bad request fechapublicacion must be filled!",
    });
  }
  if (!req.body.usuario) {
    res.status(400).json({
      description: "Bad request usuario must be filled!",
    });
  }
  if (!req.body.estatus) {
    res.status(400).json({
      description: "Bad request estatus must be filled!",
    });
  }
  var initModels = require("../model/init-models");
  var models = initModels(db);
  const entradas_map = {
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    idcategoria: req.body.idcategoria,
    imgdestacada: req.body.imgdestacada,
    fechapublicacion: req.body.fechapublicacion,
    usuario: req.body.usuario,
    estatus: req.body.estatus,
  };
  listaEntradas = await models.entrada.create(entradas_map);
  res.status(200).json({
    description: "Successfully saved user data!",
  });
});

const findEntradasById = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaEntradas = await models.entrada.findByPk(req.params.id);
  // console.log("user: ", user)
  res.status(200).json({
    description: `Successfully fetch by id: ${req.params.id} user data!`,
    data: listaEntradas,
  });
});

const updateEntradas = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaEntradas = await models.entrada.update(req.body, {
    where: { id: req.params.id },
  });

  res.status(200).json({
    description: `Successfully updated user data!`,
  });
});

const removeEntradas = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaEntradas = await models.entrada.destroy({
    where: { id: req.params.id },
  });
  res.status(200).json({
    description: `Successfully deleted user data!`,
  });
});
module.exports = {
  findAllEntradas,
  createEntradas,
  findEntradasById,
  updateEntradas,
  removeEntradas,
};
