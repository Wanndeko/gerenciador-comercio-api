import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

const routes = Router()

const { author } = require('../package.json')

routes.get('/', async (request, response) => {
  response.status(200).json({ author })
})

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

export default routes
