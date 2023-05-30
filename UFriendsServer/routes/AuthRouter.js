import express from 'express';

const app = express();
const routerAuth = express.Router();
import bodyParser from "body-parser";
import AuthControllers from "../controllers/AuthControllers.js";

app.use(bodyParser.urlencoded({extended: true}));

/**
 * @swagger
 * components:
 *    schemas:
 *      UserAuth:
 *        type: object
 *        required:
 *            - email
 *        properties:
 *            email:
 *              type: string
 *              description: The user's email
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication API
 */

/**
 * @swagger
 * /auth:
 *  post:
 *    summary: Get a user by email and password
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserLogin'
 *    responses:
 *        200:
 *           description: The user was successfully rendered
 *           content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      first_name:
 *                          type: string
 *                          description: The user's first name
 *                      last_name:
 *                          type: string
 *                          description: The user's last name
 *                      email:
 *                          type: string
 *                          description: The user's email
 *                      phone:
 *                          type: string
 *                          description: The user's phone
 *                      password:
 *                          type: string
 *                          description: The user's password
 *                      roles:
 *                          type: string
 *                          description: The user's roles
 *                      gender:
 *                          type: string
 *                          description: The user's gender
 *        401:
 *           description: Password or email is incorrect
 *        404:
 *           description: User not found
 */

routerAuth.post('/', AuthControllers.authenticateUser);

export default routerAuth;