import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,
        expiration_date: Sequelize.DATE
      },
      {
        sequelize
      }
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    })
  }
}

export default Product
