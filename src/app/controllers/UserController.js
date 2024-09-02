import User from '../models/User'
import { v4 } from 'uuid'

import * as Yup from 'yup'

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      date_of_birth: Yup.date().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      tell: Yup.string().min(7),
      cpf: Yup.string().required().min(10),
      address: Yup.string().required().min(5),
      admin: Yup.boolean()
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, date_of_birth, email, password, tell, cpf, address, admin } =
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

    const tellExists = await User.findOne({
      where: {
        tell
      }
    })

    if (emailExists || cpfExists || tellExists) {
      return response.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create({
      id: v4(),
      name,
      date_of_birth,
      email,
      password,
      tell,
      cpf,
      address,
      admin
    })
    return response.status(201).json({ id: user.id, name, email, admin })
  }
}

export default new UserController()
