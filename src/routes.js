import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'
import authMiddlewares from './middlewares/authMidd'

const routes = Router()

const { author } = require('../package.json')

routes.get('/', async (request, response) => {
  response.status(200).json({ author })
})

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddlewares)
routes.get('/product', ProductController.index)
routes.post('/product', ProductController.store)
routes.put('/product/:id', ProductController.update)
routes.delete('/product', ProductController.delete)

routes.get('/categories', CategoryController.index)
routes.post('/categories', CategoryController.store)

export default routes
