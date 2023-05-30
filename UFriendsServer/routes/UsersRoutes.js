import express from 'express';

const app = express();
const routerUsers = express.Router();
import bodyParser from 'body-parser';
import UsersController from '../controllers/UsersController.js';

app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *            - first_name
 *            - last_name
 *            - email
 *            - phone
 *            - password
 *            - roles
 *            - gender
 *        properties:
 *            first_name:
 *              type: string
 *              description: The user's first name
 *            last_name:
 *              type: string
 *              description: The user's last name
 *            email:
 *              type: string
 *              description: The user's email
 *            phone:
 *              type: string
 *              description: The user's phone
 *            password:
 *              type: string
 *              description: The user's password
 *            roles:
 *              type: string
 *              description: The user's roles
 *            gender:
 *              type: string
 *              description: The user's gender
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      UserLogin:
 *        type: object
 *        required:
 *            - email
 *            - password
 *        properties:
 *            email:
 *              type: string
 *              description: The user's email
 *            password:
 *              type: string
 *              description: The user's password
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Returns the list of all the users
 *    tags: [Users]
 *    responses:
 *        200:
 *           description: The list of the users
 *           content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/User'
 */

routerUsers.get('/', UsersController.getAll);

routerUsers.get('/mentors', UsersController.getMentor);

/**
 * @swagger
 * /users/search/{name}:
 *  get:
 *    summary: Search users by name
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: The user name
 *    responses:
 *        200:
 *           description: The list of the users
 *           content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/User'
 */

routerUsers.get('/search/:name', UsersController.search);

/**
 * @swagger
 * /users/create:
 *  post:
 *    summary: Returns the list of all the users
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *        200:
 *           description: The list of the users
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 *        500:
 *           description: Some server error
 */

routerUsers.post('/create', UsersController.createUser);

/**
 * @swagger
 * /users/update/{id}:
 *  patch:
 *    summary: Update a user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *        200:
 *           description: The user was successfully updated
 *        400:
 *           description: The user was not found
 *        500:
 *           description: Some server error
 */

routerUsers.patch('/update/:id', UsersController.updateUser);

/**
 * @swagger
 * /users/update/{id}:
 *  delete:
 *    summary: Delete user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *        200:
 *           description: The user was successfully deleted
 *        400:
 *           description: The user was not found
 *        500:
 *           description: Some server error
 */

routerUsers.delete('/update/:id', UsersController.removeUser);

export default routerUsers;
