import User from '../models/User'
import { v4 } from 'uuid'

import * as yup from 'yup'

class UserController {
  async store(request, response) {
    const schema = yup.object({
      name: yup.string().required(),
      date_of_birth: yup.date().required(),
      email: yup.string().email().required(),
      password_hash: yup.string().required().min(6),
      cpf: yup.string().required().min(10),
      address: yup.string().required().min(5),
      admin: yup.boolean()
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, date_of_birth, email, password_hash, cpf, address, admin } =
      request.body

    const emailExists = await User.findOne({
      where: {
        email
      }
    })

    const cpfExists = await User.findOne({
      where: {
        cpf
      }
    })

    if (emailExists || cpfExists) {
      return response.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create({
      id: v4(),
      name,
      date_of_birth,
      email,
      password_hash,
      cpf,
      address,
      admin
    })
    return response.status(201).json({ id: user.id, name, email, admin })
  }
}

export default new UserController()
