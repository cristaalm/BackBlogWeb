const Express = require("express");

const routes = Express.Router();
const {
  createUsers,
  findAllUsers,
  findUsersById,
  updateUsers,
  removeUser,
} = require("../controllers/usersController");

/**
 * @swagger
 * components:
 *    schemas:
 *      Users:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            description: Enter your username
 *            example: andi17x
 *          name:
 *            type: string
 *            description: Enter your name
 *            example: admin123
 *          email:
 *            type: string
 *            description: Enter your email
 *            example: andyyy@gmail.com
 *          profile:
 *            type: string
 *            description: Enter your profile
 *            example: admin
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the users table
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Successfully fetched all data
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Users'
 */

routes.get("/", findAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve user data by id
 *     description: Retrieve a user by their id from the users table
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successfully fetched user data by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 */

routes.get("/:id", findUsersById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: Create users API
 *     summary: Create user data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       '200':
 *         description: Successfully created data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Successfully created data
 */

routes.post("/", createUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user data
 *     description: Update user data API
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User's id
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       '200':
 *         description: Successfully updated data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Successfully updated data
 */

routes.patch("/:id", updateUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Remove user data
 *     description: Remove user data API
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User's id
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successfully removed user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Successfully removed user data
 */

routes.delete("/:id", removeUser);

module.exports = routes;
