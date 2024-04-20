const Express = require("express");

const routes = Express.Router();
const {
  findAllEntradas,
  createEntradas,
  findEntradasById,
  updateEntradas,
  removeEntradas,
  changeStatus,
  review,
  findByPublish
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
 * /api/entradas/review/{id}:
 *    post:
 *      tags:
 *        - Entradas
 *      summary: Update entrada status by ID
 *      description: Update entrada status to "Revisión" by ID
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
 *                    example: Successfully updated entrada status to "Revisión"!
 */
routes.post("/review/:id", review);


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

/**
 * @swagger
 * /api/entradas/publish:
 *    post:
 *      tags:
 *        - Entradas
 *      summary: Retrieve published entradas
 *      description: Retrieve entradas with status 'Publicado' from the database
 *      responses:
 *        200:
 *          description: Entradas retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    titulo:
 *                      type: string
 *                      description: Title of the entrada
 *                      example: "Titulo de la entrada"
 *                    descripcion:
 *                      type: string
 *                      description: Description of the entrada
 *                      example: "Descripción de la entrada"
 *                    contenido:
 *                      type: string
 *                      description: Content of the entrada
 *                      example: "Contenido de la entrada"
 *                    idcategoria:
 *                      type: integer
 *                      description: ID of the category of the entrada
 *                      example: 1
 *                    imgdestacada:
 *                      type: string
 *                      description: URL of the featured image of the entrada
 *                      example: http://example.com/image.jpg
 *                    fechapublicacion:
 *                      type: string
 *                      format: date
 *                      description: Date of publication of the entrada
 *                      example: 2024-04-19
 *                    usuario:
 *                      type: string
 *                      description: User who published the entrada
 *                      example: John Doe
 *                    estatus:
 *                      type: string
 *                      description: Status of the entrada
 *                      example: Publicado
 *        404:
 *          description: No entries found with status 'Publicado'
 *        500:
 *          description: Error searching for published entries
 */
routes.post("/publish", findByPublish);

module.exports = routes;
