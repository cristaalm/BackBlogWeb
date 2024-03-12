const Express = require("express");

const routes = Express.Router();
const {
  findAllCategories
} = require("../controllers/categories-controller");

  /**
   *  @swagger
   *  components:
   *    schemas:
   *      Users:
   *        type: object
   *        properties:
   *          username:
   *            type: string
   *            description: enter your username
   *            example: andi17x
   *          password:
   *            type: string
   *            description: enter your password
   *            example: adminpassword12
   *          email:
   *            type: string
   *            description: enter your email
   *            example: andi@gmail.com
   */

  /**
   * @swagger
   * /api/users:
   *  get:
   *    tags:
   *      - Users
   *    summary: Retrieve a list of users
   *    description: Retrieve a list of task froma users table
   *    responses:
   *      200:
   *        description: A list of users.
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
   *                    $ref: '#/components/schemas/Users'
   * 
   */
  routes.get("/", findAllCategories);


module.exports = routes;
