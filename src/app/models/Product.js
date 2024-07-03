import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,
        expiration_date: Sequelize.DATE,
        category: Sequelize.DATE
      },
      {
        sequelize
      }
    )
  }
}

export default Product
