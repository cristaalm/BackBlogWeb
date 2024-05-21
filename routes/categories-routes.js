const Express = require("express");

const routes = Express.Router();
const {
  findAllCategories,
  createCategories,
  findCategoriesById,
  updateCategories,
  removeCategories,
  findCategories
} = require("../controllers/categories-controller");

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Categories:
 *        type: object
 *        properties:
 *          nombre:
 *            type: string
 *            description: ingresar nombre
 *            example: name
 *          descripcion:
 *            type: string
 *            description: enter your descripcion
 *            example: descripcion
 *          imgdestacada:
 *            type: string
 *            description: enter your img
 *            example: image
 *          color:
 *            type: string
 *            description: enter your color
 *            example: color
 */

/**
 * @swagger
 * /api/categories:
 *  get:
 *    tags:
 *      - Categories
 *    summary: Retrieve a list of categories
 *    description: Retrieve a list of task froma categories table
 *    responses:
 *      200:
 *        description: A list of categories.
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
 *                    $ref: '#/components/schemas/Categories'
 *
 */
routes.get("/", findAllCategories);

/**
 * @swagger
 * /api/categories/text:
 *  get:
 *    tags:
 *      - Categories
 *    summary: Retrieve a list of categories
 *    description: Retrieve a list of task froma categories table
 *    responses:
 *      200:
 *        description: A list of categories.
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
 *                    $ref: '#/components/schemas/Categories'
 *
 */
routes.get("/text", findCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *    get:
 *      tags:
 *        - Categories
 *      summary: Retrieve categories data by id
 *      description: Retrieve categories by id from categories table
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
 *          description: single category data.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully fetched categories data by id!
 *                  data:
 *                    type: object
 *                    properties:
 *                      nombre:
 *                          type: string
 *                          description: ingresar nombre
 *                          example: name
 *                      descripcion:
 *                          type: string
 *                          description: enter your descripcion
 *                          example: descripcion
 *                      imgdestacada:
 *                          type: string
 *                          description: enter your img
 *                          example: image
 *                      color:
 *                          type: string
 *                          description: enter your color
 *                          example: color
 *
 */
routes.get("/:id", findCategoriesById);

module.exports = routes;
