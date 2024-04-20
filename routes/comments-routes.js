const Express = require("express");

const routes = Express.Router();
const {
  findAllComments,
  createComment,
  findByPost
} = require("../controllers/comments-controller");

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Comentarios:
 *        type: object
 *        properties:
 *          nombre:
 *            type: string
 *            description: enter your nombre
 *            example: nombre
 *          valoracion:
 *            type: 	integer
 *            description: enter your valoracion
 *            example: 5
 *          descripcion:
 *            type: string
 *            description: enter your descripcion
 *            example: descripcion
 *          identrada:
 *            type: integer
 *            description: enter your identrada
 *            example: #
 *          fechacreacion:
 *            type: date
 *            description: enter your fechacreacion
 *            example: 2024-03-12
 */

/**
 * @swagger
 * /api/comments:
 *  get:
 *    tags:
 *      - Comentarios
 *    summary: Retrieve a list of comments
 *    description: Retrieve a list of task froma comments table
 *    responses:
 *      200:
 *        description: A list of comments.
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
 *                    $ref: '#/components/schemas/Comentarios'
 *
 */
routes.get("/", findAllComments);

/**
 * @swagger
 * /api/comments/:
 *    post:
 *      tags:
 *        - Comentarios
 *      description: Create comment API
 *      summary: Create comment data
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                  description: enter your nombre
 *                  example: nombre
 *                valoracion:
 *                  type: integer
 *                  description: enter your valoracion
 *                  example: 5
 *                descripcion:
 *                  type: string
 *                  description: enter your descripcion
 *                  example: descripcion
 *                identrada:
 *                  type: integer
 *                  description: enter your identrada
 *                  example: 1
 *                fechacreacion:
 *                  type: date
 *                  description: enter your fechacreacion
 *                  example: 2024-03-12
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
routes.post("/", createComment);

/**
 * @swagger
 * /api/comments/{identrada}:
 *    get:
 *      tags:
 *        - Comentarios
 *      summary: Retrieve comments data by idEntrada
 *      description: Retrieve comments by idEntrada from comments table
 *      parameters:
 *        - name: identrada
 *          in: path
 *          required: true
 *          description: idEntrada id
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        200:
 *          description: Comments data retrieved successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully fetched comments data by id!
 *                  data:
 *                    type: object
 *                    properties:
 *                      nombre:
 *                        type: string
 *                        description: Commenter's name
 *                        example: John Doe
 *                      valoracion:
 *                        type: integer
 *                        description: Commenter's rating
 *                        example: 5
 *                      descripcion:
 *                        type: string
 *                        description: Comment description
 *                        example: This is a great post!
 *                      fechacreacion:
 *                        type: date
 *                        description: enter your fechacreacion
 *                        example: 2024-03-12
 *
 */
routes.get("/:identrada", findByPost);

module.exports = routes;
