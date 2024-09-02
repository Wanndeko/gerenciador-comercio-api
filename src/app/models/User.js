import Sequelize, { Model } from 'sequelize'

import bcrypt from 'bcrypt'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        date_of_birth: Sequelize.DATE,
        email: Sequelize.STRING,
        tell: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        cpf: Sequelize.STRING,
        address: Sequelize.STRING,
        admin: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    )

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10)
      }
    })

    return this
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password_hash)
  }
}

export default User
