const AsyncHandler = require("express-async-handler");
const Users = require("../model/usuario");
const db = require("../config/config");

const findAllUsers = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaUsuarios = await models.usuario.findAll();

  res.status(200).json({
    description: "Successsfully fetched users data!",
    data: listaUsuarios,
  });
});

const createUsers = AsyncHandler(async (req, res) => {
  if (!req.body.nombreusuario) {
    res.status(400).json({
      description: "Bad request username must be filled!",
    });
  }
  if (!req.body.nombre) {
    res.status(400).json({
      description: "Bad request password must be filled!",
    });
  }
  if (!req.body.correoelectronico) {
    res.status(400).json({
      description: "Bad request email must be filled!",
    });
  }
  if (!req.body.contraseña) {
    res.status(400).json({
      description: "Bad request email must be filled!",
    });
  }
  if (!req.body.perfil) {
    res.status(400).json({
      description: "Bad request email must be filled!",
    });
  }
  var initModels = require("../model/init-models");
  var models = initModels(db);
  const users_map = {
    nombreusuario: req.body.nombreusuario,
    nombre: req.body.nombre,
    correoelectronico: req.body.correoelectronico,
    contraseña: req.body.contraseña,
    perfil: req.body.perfil,
  };
  listaUsuarios = await models.usuario.create(users_map);
  res.status(200).json({
    description: "Successfully saved user data!",
  });
});

const findtUsersById = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaUsuarios = await models.usuario.findByPk(req.params.id);
  // console.log("user: ", user)
  res.status(200).json({
    description: `Successfully fetch by id: ${req.params.id} user data!`,
    data: listaUsuarios,
  });
});

const findUsersByName = AsyncHandler(async (req, res) => {
  try {
    if (!req.body.nombreusuario) {
      return res.status(400).json({
        description: "Bad request username must be filled!",
      });
    }
    if (!req.body.contraseña) {
      return res.status(400).json({
        description: "Bad request password must be filled!",
      });
    }

    var initModels = require("../model/init-models");
    var models = initModels(db);

    // Buscar un usuario por nombre de usuario y contraseña
    const usuario = await models.usuario.findOne({
      where: {
        nombreusuario: req.body.nombreusuario,
        contraseña: req.body.contraseña,
      },
    });

    // Verificar si se encontró un usuario
    if (usuario) {
      return res.status(200).json({
        logged: "True",
      });
    } else {
      return res.status(404).json({
        description: "User not found!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      description: "Error al buscar usuario por nombreusuario y contraseña",
    });
  }
});

const updateUsers = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaUsuarios = await models.usuario.update(req.body, {
    where: { id: req.params.id },
  });

  res.status(200).json({
    description: `Successfully updated user data!`,
  });
});

const removeUsers = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaUsuarios = await models.usuario.destroy({
    where: { id: req.params.id },
  });
  res.status(200).json({
    description: `Successfully deleted user data!`,
  });
});

module.exports = {
  createUsers,
  findAllUsers,
  findtUsersById,
  updateUsers,
  removeUsers,
  findUsersByName,
};
