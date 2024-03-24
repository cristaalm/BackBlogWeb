const AsyncHandler = require("express-async-handler");
const Users = require("../model/usuario");
const db = require("../config/config");
const nodemailer = require("nodemailer");

const findAllUsers = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  listaUsuarios = await models.usuario.findAll();

  res.status(200).json({
    description: "Successsfully fetched users data!",
    data: listaUsuarios,
  });
});

// const findAllCategories = AsyncHandler(async (req, res) => {
//   var initModels = require("../model/init-models");
//   var models = initModels(db);
//   listaCategorias = await models.categoria.findAll();

//   res.status(200).json({
//     description: "Successsfully fetched users data!",
//     data: listaCategorias,
//   });
// });

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
        logged: true,
        description: "Usuario logueado correctamente",
      });
    } else {
      return res.status(200).json({
        logged: false,
        description: "Usuario o contraseña incorrecta",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      description: "Error al buscar usuario por nombreusuario y contraseña",
    });
  }
});

const restartPwd = AsyncHandler(async (req, res) => {
  try {
    var initModels = require("../model/init-models");
    var models = initModels(db);

    const userId = req.params.id;

    // Buscar un usuario por ID
    const usuario = await models.usuario.findByPk(userId);

    // Verificar si se encontró un usuario
    if (!usuario) {
      return res.status(400).json({
        description: "User not found",
      });
    }

    // Actualizar la contraseña del usuario
    await usuario.update({ contraseña: req.body.contraseña });

    return res.status(200).json({
      description: "Successfully restarted user's password",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      description: "Error restarting user's password",
    });
  }
});

const findMail = (async (req, res) => {
  try {
    if (!req.body.correoelectronico) {
      return res.status(400).json({
        description: "Bad request email must be filled!",
      });
    }

    var initModels = require("../model/init-models");
    var models = initModels(db);

    // Buscar un usuario por correo electronico
    const usuario = await models.usuario.findOne({
      where: {
        correoelectronico: req.body.correoelectronico,
      },
    });

    // Verificar si se encontró un usuario
    if (usuario) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "aquavisionotification@gmail.com",
          pass: "lsve btbq rhcl wpvs",
        },
      });

      const info = await transporter.sendMail({
        from: "aquavisionotification@gmail.com",
        to: req.body.correoelectronico,
        subject: "Reset password",
        html: `
        <h3>Hi there!</h3>
        <p>
          No problem, you can reset your AquaVision password by clicking the
          following link:
        </p>
        <a href="http://localhost:5173/restart-psswd/${usuario.id}">Reset password</a>
        <p>Your username is: ${usuario.nombreusuario}</p>
        <p>
          If you did not request a password reset, you can delete this email and
          continue reading.
        </p>
        <p>Greetings.</p>
        <p><i>The Umizoomis Company Team </i></p>
      `,
      });

      console.log("Message sent: %s", info.messageId);

      return res.status(200).json({
        logged: true,
        description: "Email sent successfully",
        mail:req.body.correoelectronico
      });
    } else {
      return res.status(200).json({
        logged: false,
        description: "Correo electrónico no encontrado",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      description: "Error al buscar correo electrónico",
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
  findMail,
  restartPwd,
};
