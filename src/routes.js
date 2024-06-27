import { Router } from 'express'

import UserController from './app/controllers/UserController'

const routes = Router()

const { author } = require('../package.json')

routes.get('/', async (request, response) => {
  response.status(200).json({ author })
})

routes.post('/users', UserController.store)

export default routes
