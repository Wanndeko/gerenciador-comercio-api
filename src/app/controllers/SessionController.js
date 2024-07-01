import * as Yup from 'yup'
import User from '../models/User'

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })
    const { email, password } = request.body

    const isValid = await schema.isValid(request.body)

    const validationInfos = () => {
      response
        .status(401)
        .json({ error: 'make a sure your email or password are correct' })
    }

    if (!isValid) {
      return validationInfos()
    }

    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return validationInfos()
    }

    const isSamePassword = await user.checkPassword(password)

    if (!isSamePassword) {
      return validationInfos()
    }

    return response
      .status(201)
      .json({ id: user.id, name: user.name, email, admin: user.admin })
  }
}

export default new SessionController()
