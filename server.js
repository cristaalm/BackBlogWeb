const express = require("express");
const cors = require("cors");
const db = require("./config/config");
const colors = require("colors");
const { errorHandler } = require("./middleware/error-handler");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { QueryTypes } = require("sequelize");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple router
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// database sync
db.sync()
  .then(() => {
    console.log("Generate Table".green);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`.yellow);
    });
  })
  .then(async () => {
    var initModels = require("./model/init-models");
    var models = initModels(db);
    listaUsuarios = await models.usuario.findAll();
    listaUsuarios.forEach((usuario) => {
      console.log(usuario.dataValues);
      console.log("La categoría es: " + usuario.dataValues.username);
    });
    listaCategorias = await models.categoria.findAll();
    listaCategorias.forEach((categoria) => {
      console.log(categoria.dataValues);
      console.log("La categoría es: " + categoria.dataValues.nombre);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// rout
app.use("/api/users", require("./routes/users-routes"));
app.use("/api/categories", require("./routes/categories-routes"));

// global error handler
app.use(errorHandler);

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;
