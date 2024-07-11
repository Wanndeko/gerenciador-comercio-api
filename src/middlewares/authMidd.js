import jwt from 'jsonwebtoken'
import auth from '../config/auth'

function authMiddlewares(request, response, next) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ error: 'token is not provide' })
  }

  const token = authToken.split(' ').at(1)

  try {
    jwt.verify(token, auth.secret, (err, decoded) => {
      if (err) {
        throw new Error()
      }

      request.userId = decoded.id
    })
  } catch (error) {
    return response.status(401).json({ error: 'token is invalid' })
  }
  return next()
}

export default authMiddlewares
