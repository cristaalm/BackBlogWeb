const Express = require("express");

const routes = Express.Router();
const {
  findAllEntradas,
  createEntradas,
  findEntradasById,
  updateEntradas,
  removeEntradas,
  changeStatus
} = require("../controllers/entradas-controller");

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Entradas:
 *        type: object
 *        properties:
 *          titulo:
 *            type: string
 *            description: ingresar titulo
 *            example: titulo
 *          descripcion:
 *            type: string
 *            description: ingresar titulo
 *            example: titulo
 *          contenido:
 *            type: string
 *            description: enter your contenido
 *            example: contenido
 *          idcategoria:
 *            type: integer
 *            description: enter your idcategoria
 *            example: 1
 *          imgdestacada:
 *            type: string
 *            description: enter your imgdestacada
 *            example: imgdestacada
 *          fechapublicacion:
 *            type: date
 *            description: enter your fechapublicacion
 *            example: 2024-03-12
 *          usuario:
 *            type: string
 *            description: enter your usuario
 *            example: usuario
 *          estatus:
 *            type: string
 *            description: enter your estatus
 *            example: estatus
 */

/**
 * @swagger
 * /api/entradas:
 *  get:
 *    tags:
 *      - Entradas
 *    summary: Retrieve a list of entradas
 *    description: Retrieve a list of task froma entradas table
 *    responses:
 *      200:
 *        description: A list of entradas.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                description:
 *                  type: string
 *                  example: Successfully fetched all data!
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Entradas'
 *
 */
routes.get("/", findAllEntradas);

/**
 * @swagger
 * /api/entradas/{id}:
 *    get:
 *      tags:
 *        - Entradas
 *      summary: Retrieve entradas data by id
 *      description: Retrieve entradas by id from entradas table
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: user id
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        200:
 *          description: single entrada data.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully fetched entradas data by id!
 *                  data:
 *                    type: object
 *                    properties:
 *                      titulo:
 *                        type: string
 *                        description: ingresar titulo
 *                        example: titulo
 *                      contenido:
 *                        type: string
 *                        description: enter your contenido
 *                        example: contenido
 *                      idcategoria:
 *                        type: integer
 *                        description: enter your idcategoria
 *                        example: 1
 *                      imgdestacada:
 *                        type: string
 *                        description: enter your imgdestacada
 *                        example: imgdestacada
 *                      fechapublicacion:
 *                        type: date
 *                        description: enter your fechapublicacion
 *                        example: 2024-03-12
 *                      usuario:
 *                        type: string
 *                        description: enter your usuario
 *                        example: usuario
 *                      estatus:
 *                        type: string
 *                        description: enter your estatus
 *                        example: estatus
 *
 */
routes.get("/:id", findEntradasById);

/**
 * @swagger
 * /api/entradas/status/{id}:
 *    post:
 *      tags:
 *        - Entradas
 *      summary: Update entrada status by ID
 *      description: Update entrada status to "Publicado" by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of the entrada to update
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        200:
 *          description: Success message
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully updated entrada status to "Publicado"!
 */
routes.post("/status/:id", changeStatus);

/**
 * @swagger
 * /api/entradas/:
 *    post:
 *      tags:
 *        - Entradas
 *      description: Create entradas API
 *      summary: Create entradas data
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                titulo:
 *                  type: string
 *                  description: ingresar titulo
 *                  example: titulo
 *                contenido:
 *                  type: string
 *                  description: enter your contenido
 *                  example: contenido
 *                idcategoria:
 *                  type: integer
 *                  description: enter your idcategoria
 *                  example: 1
 *                imgdestacada:
 *                  type: string
 *                  description: enter your imgdestacada
 *                  example: imgdestacada
 *                fechapublicacion:
 *                  type: date
 *                  description: enter your fechapublicacion
 *                  example: 2024-03-12
 *                usuario:
 *                  type: string
 *                  description: enter your usuario
 *                  example: usuario
 *                estatus:
 *                  type: string
 *                  description: enter your estatus
 *                  example: estatus
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
routes.post("/", createEntradas);
/**
 * @swagger
 * /api/entradas/{id}:
 *    patch:
 *      tags:
 *        - Entradas
 *      summary: Update entradas data
 *      description: update entradas data API
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Entradas id
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                titulo:
 *                  type: string
 *                  description: ingresar titulo
 *                  example: titulo
 *                contenido:
 *                  type: string
 *                  description: enter your contenido
 *                  example: contenido
 *                idcategoria:
 *                  type: integer
 *                  description: enter your idcategoria
 *                  example: 1
 *                imgdestacada:
 *                  type: string
 *                  description: enter your imgdestacada
 *                  example: imgdestacada
 *                fechapublicacion:
 *                  type: date
 *                  description: enter your fechapublicacion
 *                  example: 2024-03-12
 *                usuario:
 *                  type: string
 *                  description: enter your usuario
 *                  example: usuario
 *                estatus:
 *                  type: string
 *                  description: enter your estatus
 *                  example: estatus
 *      responses:
 *        200:
 *          description: Successfully updated data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully updated data!
 *
 *
 */
routes.patch("/:id", updateEntradas);
/**
 * @swagger
 * /api/entradas/{id}:
 *    delete:
 *      tags:
 *        - Entradas
 *      summary: Remove Entradas data by id
 *      description: Remove entradas API
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Entradas id
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        200:
 *          description: Successfully deleted data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully updated data!
 *
 *
 */
routes.delete("/:id", removeEntradas);

module.exports = routes;
