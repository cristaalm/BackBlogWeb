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

app.use(cors(corsOptions));

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
    listaCategorias = await models.categoria.findAll();
    listaCategorias.forEach((categoria) => {
      console.log(categoria.dataValues);
      console.log("La categoría es: " + categoria.dataValues.nombre);
    });

    // const categorias = await db.query("select * from categoria", {
    //   type: QueryTypes.SELECT,
    // });
    // console.log(categorias);

    // db.query("select * from categoria", (err, res) => {
    //   if (!err) {
    //     console.log(res.rows);
    //   } else {
    //     console.log(err.message);
    //   }
    // });
  })
  .catch((err) => {
    console.error(err);
  });

// rout
app.use("/api/users", require("./routes/users-routes"));

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
