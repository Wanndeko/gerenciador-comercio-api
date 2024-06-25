import Sequelize, { Model } from 'sequelize'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        date_of_birth: Sequelize.DATE,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        cpf: Sequelize.STRING,
        address: Sequelize.STRING,
        admin: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    )
  }
}

export default User
