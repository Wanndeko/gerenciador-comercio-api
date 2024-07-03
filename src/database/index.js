import Sequelize from 'sequelize'

import User from '../app/models/User'

import configDatase from '../config/database'
import Product from '../app/models/Product'

const models = [User, Product]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatase)
    models.map((model) => model.init(this.connection))
  }
}

export default new Database()
