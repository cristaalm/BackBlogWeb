const AsyncHandler = require("express-async-handler");
const Users = require("../model/usuario");
const db = require("../config/config");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const moment = require("moment-timezone");
const findAllUsers = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  // var models = initModels(db);
  // listaUsuarios = await models.usuario.findAll();
  const rawQuery = `
    SELECT id, nombreusuario, nombre, correoelectronico,contraseña, perfil,(select count(*) from entrada where upper(usuario)=upper(nombreusuario)) as entradas
    FROM usuario 
  `;
  // listaUsuarios = await models.usuario.findAll();
  listaUsuarios = await db.query(rawQuery, {
    type: db.QueryTypes.SELECT,
  });

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

const findByUser = AsyncHandler(async (req, res) => {
  try {
    if (!req.body.nombreusuario) {
      return res.status(400).json({
        description: "Bad request username must be filled!",
      });
    }

    var initModels = require("../model/init-models");
    var models = initModels(db);

    // Buscar un usuario por nombre de usuario y contraseña
    const usuario = await models.usuario.findOne({
      where: {
        nombreusuario: req.body.nombreusuario,
      },
    });

    // Verificar si se encontró un usuario
    if (usuario) {
      console.log(usuario);
      return res.status(200).json({
        nombre: usuario.nombre,
        correo: usuario.correoelectronico,
        rol: usuario.perfil,
        tour: usuario.tour,
      });
    } else {
      return res.status(200).json({
        description: "Usuario incorrecta",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      description: "Error al buscar usuario por nombreusuario",
    });
  }
});

const changeTour = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  await models.usuario.update(
    { tour: true },
    { where: { nombreusuario: req.body.nombreusuario } }
  );

  res.status(200).json({
    description: `Successfully updated tour to true!`,
  });
});

const findUsersByName = AsyncHandler(async (req, res) => {
  try {
    const nombreusuario = req.body.nombreusuario.trim();
    const contraseña = req.body.contraseña.trim();

    if (!nombreusuario) {
      return res.status(400).json({
        description: "Bad request username must be filled!",
      });
    }
    if (!contraseña) {
      return res.status(400).json({
        description: "Bad request password must be filled!",
      });
    }

    var initModels = require("../model/init-models");
    var models = initModels(db);

    // Buscar un usuario por nombre de usuario y contraseña
    const usuario = await models.usuario.findOne({
      where: {
        nombreusuario: nombreusuario,
        contraseña: contraseña,
      },
    });

    // Verificar si se encontró un usuario
    if (usuario) {
      return res.status(200).json({
        logged: true,
        description: "Usuario logueado correctamente",
        // rol: res.,
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
    const key = "your_secret_key_for_encryption";
    const userId = req.params.id;
    console.log(userId);
    const userIdDecrypted = decrypt(userId.toString(), key);
    // Buscar un usuario por ID
    const usuario = await models.usuario.findByPk(userIdDecrypted);

    // Verificar si se encontró un usuario
    if (!usuario) {
      return res.status(400).json({
        description: "User not found",
      });
    }
    let dateString = usuario.fechatoken;
    console.log(dateString);
    if (!dateString || dateString === null) {
      return res.status(400).json({
        description: "token is invalid or used",
      });
    }
    let fechaToken = moment(dateString, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    let date = moment.tz("America/Mexico_City");
    if (date.isAfter(fechaToken)) {
      return res.status(400).json({
        description: "Token expired",
      });
    }
    // Actualizar la contraseña del usuario
    await usuario.update({ contraseña: req.body.contraseña, fechatoken: null });

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

const findMail = async (req, res) => {
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
      // Establecer la fecha de expiración del token en 10 minutos
      let date = moment.tz("America/Mexico_City");
      // fecheHora.setMinutes(fecheHora.getMinutes() + 10);
      date.add(10, "minutes");
      console.log(date);
      // Actualizar la fecha de expiración del token en la base de datos
      await usuario.update({ fechatoken: date.toString() }); // Guardar la fecha como string ISO

      // Encriptar el ID del usuario
      const key = "your_secret_key_for_encryption"; // Define tu clave secreta aquí
      const encryptedId = encrypt(usuario.id.toString(), key);

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
        <a href="http://localhost:5173/restart-psswd/${encryptedId}">Reset password</a>
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
        mail: req.body.correoelectronico,
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
};

// AES encryption function
function encrypt(text, key) {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}
// AES decryption function
function decrypt(encryptedText, key) {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
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
  findByUser,
  changeTour,
};
