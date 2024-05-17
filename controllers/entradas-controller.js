const AsyncHandler = require("express-async-handler");
const Entradas = require("../model/entrada");
const db = require("../config/config");
const moment = require("moment-timezone");
const nodemailer = require("nodemailer");

const findAllEntradas = AsyncHandler(async (req, res) => {
  const rawQuery = `
  SELECT id, titulo, contenido, idcategoria,imgdestacada, fechapublicacion,usuario,estatus,descripcion,(select perfil from usuario where upper(nombreusuario)=upper(usuario)) as perfil,
  (select nombre from usuario where upper(nombreusuario)=upper(usuario)) as nombre
  FROM entrada 
`;
  // listaUsuarios = await models.usuario.findAll();
  listaEntradas = await db.query(rawQuery, {
    type: db.QueryTypes.SELECT,
  });

  res.status(200).json({
    description: "Successsfully fetched entradas data!",
    data: listaEntradas,
  });
});

const findEntradas = AsyncHandler(async (req, res) => {
  const rawQuery = `
  SELECT id, titulo, idcategoria,usuario, estatus,(select perfil from usuario where upper(nombreusuario)=upper(usuario)) as perfil,
  (select nombre from categoria where id=idcategoria) as nombrecategoria,
  (select nombre from usuario where upper(nombreusuario)=upper(usuario)) as nombre
  FROM entrada 
`;
  // listaUsuarios = await models.usuario.findAll();
  listaEntradas = await db.query(rawQuery, {
    type: db.QueryTypes.SELECT,
  });

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
  if (!req.body.descripcion) {
    res.status(400).json({
      description: "Bad request contenido must be filled!",
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
  if (!req.body.usuario) {
    res.status(400).json({
      description: "Bad request usuario must be filled!",
    });
  }
  var initModels = require("../model/init-models");
  var models = initModels(db);
  const entradas_map = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    contenido: req.body.contenido,
    idcategoria: req.body.idcategoria,
    imgdestacada: req.body.imgdestacada,
    fechapublicacion: moment.tz("America/Mexico_City"),
    usuario: req.body.usuario,
    estatus: "Pendiente",
  };
  listaEntradas = await models.entrada.create(entradas_map);
  res.status(200).json({
    description: "Successfully saved user data!",
  });
});

const findEntradasByCategoryId = AsyncHandler(async (req, res) => {
  try {
    const rawQuery = `
    SELECT id, titulo, contenido, idcategoria, imgdestacada, fechapublicacion, usuario, estatus, descripcion,
    (SELECT nombre FROM usuario WHERE upper(nombreusuario) = upper(usuario)) AS nombre,
    (SELECT color FROM categoria WHERE id = idcategoria) AS color,
    (SELECT descripcion FROM categoria WHERE id = idcategoria) AS descripcionCategoria,
    (SELECT nombre FROM categoria WHERE id = idcategoria) AS nombreCategoria
  FROM entrada
  WHERE estatus = 'Publicado' AND idcategoria=:idCategory
    `;
    const listaEntradas = await db.query(rawQuery, {
      type: db.QueryTypes.SELECT,
      replacements: { idCategory: req.params.idCategoria },
    });

    if (listaEntradas.length > 0) {
      return res.status(200).json(listaEntradas);
    } else {
      return res.status(404).json({
        description: "No entries found with status idCategory.",
      });
    }
  } catch (error) {
    console.error("Error searching for published entries:", error);
    return res.status(500).json({
      description: "Error 500",
    });
  }
});

const findEntradasById = AsyncHandler(async (req, res) => {
  const models = require("../model/init-models")(db);
  const rawQuery = `
    SELECT id, titulo, contenido, idcategoria, imgdestacada, fechapublicacion, usuario, estatus, descripcion,
      (SELECT nombre FROM usuario WHERE upper(nombreusuario) = upper(usuario)) AS nombre
    FROM entrada
    WHERE id = :id
  `;
  const listaEntradas = await db.query(rawQuery, {
    type: db.QueryTypes.SELECT,
    replacements: { id: req.params.id },
  });

  if (listaEntradas.length === 0) {
    return res.status(404).json({
      description: `Entry with id ${req.params.id} not found.`,
    });
  }

  res.status(200).json({
    description: `Successfully fetch by id: ${req.params.id} entry data!`,
    data: listaEntradas[0],
  });
});

const findByPublish = AsyncHandler(async (req, res) => {
  try {
    const rawQuery = `
    SELECT id, titulo, contenido, idcategoria, imgdestacada, fechapublicacion, usuario, estatus, descripcion,
    (SELECT nombre FROM usuario WHERE upper(nombreusuario) = upper(usuario)) AS nombre,
    (SELECT color FROM categoria WHERE id = idcategoria) AS color,
    (SELECT descripcion FROM categoria WHERE id = idcategoria) AS descripcionCategoria,
    (SELECT nombre FROM categoria WHERE id = idcategoria) AS nombreCategoria  FROM entrada  
  WHERE estatus = 'Publicado'
    `;
    const listaEntradas = await db.query(rawQuery, {
      type: db.QueryTypes.SELECT,
    });

    if (listaEntradas.length > 0) {
      return res.status(200).json(listaEntradas);
    } else {
      return res.status(404).json({
        description: "No entries found with status 'Publicado'.",
      });
    }
  } catch (error) {
    console.error("Error searching for published entries:", error);
    return res.status(500).json({
      description: "Error searching for published entries.",
    });
  }
});

const findByDelete = AsyncHandler(async (req, res) => {
  const rawQuery = `
  SELECT id, titulo, idcategoria,usuario, motivorechazo, estatus,(select perfil from usuario where upper(nombreusuario)=upper(usuario)) as perfil,
  (select nombre from usuario where upper(nombreusuario)=upper(usuario)) as nombre,
  (select nombre from categoria where id=idcategoria) as categoria
  FROM entrada
  WHERE estatus = 'Eliminado'
`;
  // listaUsuarios = await models.usuario.findAll();
  listaEntradas = await db.query(rawQuery, {
    type: db.QueryTypes.SELECT,
  });

  res.status(200).json({
    description: "Successsfully fetched entradas data!",
    data: listaEntradas,
  });
});

const changeStatus = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);
  await models.entrada.update(
    { estatus: "Publicado" },
    { where: { id: req.params.id } }
  );

  res.status(200).json({
    description: `Successfully updated entrada status to Publicado!`,
  });
});

const changePapelera = AsyncHandler(async (req, res) => {
  const { id, motivorechazo } = req.body;

  var initModels = require("../model/init-models");
  var models = initModels(db);

  await models.entrada.update(
    {
      estatus: "Eliminado",
      motivorechazo: motivorechazo,
      fecharechazo: moment.tz("America/Mexico_City"),
    },
    { where: { id: id } }
  );

  res.status(200).json({
    description: `Successfully updated entrada status to Eliminado!`,
  });
});


const review = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);

  const rawQuery = `
    SELECT id, titulo, contenido, idcategoria, imgdestacada, fechapublicacion, usuario, estatus, descripcion,
      (SELECT nombre FROM usuario WHERE upper(nombreusuario) = upper(usuario)) AS nombre,
      (SELECT correoelectronico FROM usuario WHERE upper(nombreusuario) = upper(usuario)) AS correoelectronico
    FROM entrada
    WHERE id = :id
  `;
  const listaEntradas = await db.query(rawQuery, {
    type: db.QueryTypes.SELECT,
    replacements: { id: req.params.id },
  });

  if (listaEntradas.length === 0) {
    return res.status(404).json({ error: "Article not found" });
  }

  const correo = listaEntradas[0].correoelectronico; // Select the first entry from the result
  console.log(correo);
  await models.entrada.update(
    { estatus: "Revisión" },
    { where: { id: req.params.id } }
  ); // Update the status of the article

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
    from: correo, // Use correoelectronico as the from address
    to: "aquavisionotification@gmail.com",
    subject: "Review Blog Post",
    html: `
      <h3>Hi!</h3>
      <p>
        I'm <strong>${listaEntradas[0].nombre}</strong>. I have finished my article, please review it so you can publish it. I am eager to share it, it's cool: <strong><i>${listaEntradas[0].titulo}</i></strong>
      </p>
      <p><i>The Umizoomis Company Team </i></p>
      <p><i>Editor Profile </i></p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
  res.status(200).json({
    description: `Successfully updated entrada status to Revisión!`,
  });
});

const pendienteEstado = AsyncHandler(async (req, res) => {
  var initModels = require("../model/init-models");
  var models = initModels(db);

  const rawQuery = `
    SELECT id, titulo, contenido, idcategoria, imgdestacada, fechapublicacion, usuario, estatus, descripcion,
      (SELECT nombre FROM usuario WHERE upper(nombreusuario) = upper(usuario)) AS nombre,
      (SELECT correoelectronico FROM usuario WHERE upper(nombreusuario) = upper(usuario)) AS correoelectronico
    FROM entrada
    WHERE id = :id
  `;
  const listaEntradas = await db.query(rawQuery, {
    type: db.QueryTypes.SELECT,
    replacements: { id: req.params.id },
  });

  if (listaEntradas.length === 0) {
    return res.status(404).json({ error: "Article not found" });
  }

  const correo = listaEntradas[0].correoelectronico; // Select the first entry from the result
  console.log(correo);
  await models.entrada.update(
    { estatus: "Pendiente" },
    { where: { id: req.params.id } }
  ); // Update the status of the article

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
    from: correo, // Use correoelectronico as the from address
    to: "aquavisionotification@gmail.com",
    subject: "Pendiente Blog Post",
    html: `
      <h3>Hi!</h3>
      <p>
        I'm <strong>${listaEntradas[0].nombre}</strong>. I have finished my article, please review it so you can publish it. I am eager to share it, it's cool: <strong><i>${listaEntradas[0].titulo}</i></strong>
      </p>
      <p><i>The Umizoomis Company Team </i></p>
      <p><i>Editor Profile </i></p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
  res.status(200).json({
    description: `Successfully updated entrada status to Pendiente!`,
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
  findEntradasByCategoryId,
  updateEntradas,
  removeEntradas,
  changeStatus,
  review,
  findEntradasById,
  findByPublish,
  findEntradas,
  changePapelera,
  findByDelete,
  pendienteEstado
};
