// server/index.js
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const db = require("./config/config");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const corseOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corseOptions));

//Parse request of content-type -  application/json
app.use(express.json());
//Parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Simple router
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.use(bodyParser.json({ limit: '20mb' }));
//Set port,listen for request
const PORT = process.env.PORT || 8080;

//Database sync
db.sync()
  .then(() => {
    console.log("Generate table".green);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`.yellow);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

//Route
// app.use("/api/users", require("./routes/users-routes"));

//Global error handler
app.use(errorHandler);

//Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "AquaVision API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
