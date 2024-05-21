const Express = require("express");

const routes = Express.Router();
const {
  findAllEntradas,
  createEntradas,
  findEntradasByCategoryId,
  updateEntradas,
  removeEntradas,
  changeStatus,
  review,
  pendienteEstado,
  findByPublish,
  findByDelete,
  findEntradasById,
  findEntradas,
  changePapelera,
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
 *            description: Title of the entrada
 *            example: "Titulo de la entrada"
 *          descripcion:
 *            type: string
 *            description: Description of the entrada
 *            example: "Descripción de la entrada"
 *          contenido:
 *            type: string
 *            description: Content of the entrada
 *            example: "Contenido de la entrada"
 *          idcategoria:
 *            type: integer
 *            description: ID of the category of the entrada
 *            example: 1
 *          imgdestacada:
 *            type: string
 *            description: URL of the featured image of the entrada
 *            example: "http://example.com/image.jpg"
 *          fechapublicacion:
 *            type: string
 *            format: date
 *            description: Date of publication of the entrada
 *            example: "2024-03-12"
 *          usuario:
 *            type: string
 *            description: User who published the entrada
 *            example: "John Doe"
 *          estatus:
 *            type: string
 *            description: Status of the entrada
 *            example: "Publicado"
 *          motivorechazo:
 *            type: string
 *            description: Reason for rejection (if any)
 *            example: "Contenido inapropiado"
 *          fecharechazo:
 *            type: string
 *            format: date
 *            description: Date of rejection (if any)
 *            example: "2024-03-12"
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
 * /api/entradas/text:
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
 *
 */
routes.get("/text", findEntradas);

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
 *                    motivorechazo:
 *                      type: string
 *                      description: Reason for rejection (if any)
 *                      example: "Contenido inapropiado"
 *                    fecharechazo:
 *                      type: string
 *                      format: date
 *                      description: Date of rejection (if any)
 *                      example: 2024-03-12
 *        404:
 *          description: No entries found with status 'Publicado'
 *        500:
 *          description: Error searching for published entries
 */

routes.post("/publish", findByPublish);

/**
 * @swagger
 * /api/entradas/bycategory/{idCategoria}:
 *  get:
 *    tags:
 *      - Entradas
 *    summary: Retrieve entradas by category ID
 *    description: Retrieve entradas filtered by the specified category ID
 *    parameters:
 *      - in: path
 *        name: idCategoria
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the category to filter entradas by
 *    responses:
 *      200:
 *        description: A list of entradas filtered by category ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                description:
 *                  type: string
 *                  example: Successfully fetched entradas data by category ID!
 *                data:
 *                  type: array
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
 */

routes.get("/bycategory/:idCategoria", findEntradasByCategoryId);

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

module.exports = routes;
