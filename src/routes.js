import { Router } from 'express'

import User from './app/models/User'
import { v4 } from 'uuid'

const routes = Router()

// const { author } = require('../package.json')

routes.get('/', async (request, response) => {
  const user = await User.create({
    id: v4(),
    name: 'wanderley-test',
    date_of_birth: 25062024,
    email: 'jajaj@email.com',
    password_hash: 'aksjdaksjdak1231',
    cpf: '251.333.459-69',
    address: 'rua da loucura'
  })
  return response.status(201).json(user)
})

export default routes
