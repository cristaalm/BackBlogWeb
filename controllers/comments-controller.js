const AsyncHandler = require("express-async-handler");
const Users = require("../model/comentario");
const db = require("../config/config");
// const nodemailer = require("nodemailer");

const findAllComments = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaComentarios = await models.comentario.findAll();

  res.status(200).json({
    description: "Successsfully fetched categories data!",
    data: listaComentarios,
  });
});

const createComment = AsyncHandler(async (req, res) => {
  if (!req.body.nombre) {
    res.status(400).json({
      description: "Bad request nombre must be filled!",
    });
  }
  if (!req.body.valoracion) {
    res.status(400).json({
      description: "Bad request valoracion must be filled!",
    });
  }
  if (!req.body.descripcion) {
    res.status(400).json({
      description: "Bad request email must be filled!",
    });
  }

  var initModels = require("../model/init-models");
  var models = initModels(db);
  const comments_map = {
    nombre: req.body.nombre,
    valoracion: req.body.valoracion,
    descripcion: req.body.descripcion,
    identrada: req.body.identrada,
  };
  listaComentarios = await models.comentario.create(comments_map);
  res.status(200).json({
    description: "Successfully saved user data!",
  });
});

const findByPost = AsyncHandler(async (req, res) => {
  try {
    if (!req.params.identrada) {
      return res.status(400).json({
        description: "Bad request, identrada must be provided in the URL.",
      });
    }

    var initModels = require("../model/init-models");
    var models = initModels(db);

    const comentarios = await models.comentario.findAll({
      where: {
        identrada: req.params.identrada,
      },
    });

    // Verificar si se encontraron comentarios
    if (comentarios.length > 0) {
      const comentariosData = comentarios.map((comentario) => ({
        nombre: comentario.nombre,
        valoracion: comentario.valoracion,
        descripcion: comentario.descripcion,
        identrada: comentario.identrada,
      }));
      return res.status(200).json(comentariosData);
    } else {
      return res.status(404).json({
        description: "No comments found for the provided idEntrada.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      description: "Error retrieving comments by idEntrada.",
    });
  }
});

module.exports = {
  findAllComments,
  createComment,
  findByPost,
};
