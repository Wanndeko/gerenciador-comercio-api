import { Router } from 'express'

const routes = Router()

const { author } = require('../package.json')

routes.get('/', (request, response) => {
  return response.status(200).json({ author })
})

export default routes
